import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Tokens, TokenService } from 'src/token/token.service';
import { CreateTokenDto } from 'src/token/dto/create-token.dto';
import { AuthResponse } from './auth.controller';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async registration(userDto: CreateUserDto): Promise<Tokens> {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с такой почтой уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const tokens = this.tokenService.generateTokens({
      ...new CreateTokenDto(user),
    });
    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return { ...tokens };
  }

  async login(userDto: { email: string; password: string }): Promise<Tokens> {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new HttpException(
        'Такой почты не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new HttpException('Неправильный пароль', HttpStatus.BAD_REQUEST);
    }

    const tokens = this.tokenService.generateTokens({
      ...new CreateTokenDto(user),
    });
    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return tokens;
  }
  async checkAuth(accessToken: string, refreshToken: string): Promise<Tokens> {
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException();
    }
    const accessTokensUserData =
      this.tokenService.validateAccessToken(accessToken);
    if (accessTokensUserData) {
      return { accessToken, refreshToken };
    }
    const refreshTokensUserData =
      this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = this.tokenService.getToken(refreshToken);

    if (!refreshTokensUserData || !tokenFromDB) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getUserByEmail(
      refreshTokensUserData.email,
    );
    const tokens = this.tokenService.generateTokens({
      ...new CreateTokenDto(user),
    });
    await this.tokenService.saveToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(refreshToken: string): Promise<void> {
    await this.tokenService.removeToken(refreshToken);
  }
}
