import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { AuthResponse } from 'src/auth/auth.controller';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './token.model';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private jwtService: JwtService,
  ) {}

  generateTokens(payload: CreateTokenDto): Tokens {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string): CreateTokenDto {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token: string): CreateTokenDto {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch (e) {
      return null;
    }
  }
  async saveToken(userId: number, refreshToken: string): Promise<void> {
    const tokenData = await this.tokenRepository.findOne({
      where: { userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
      return;
    }
    await this.tokenRepository.create({
      userId,
      refreshToken,
    });
  }

  async getToken(refreshToken: string): Promise<Token> {
    return await this.tokenRepository.findOne({ where: { refreshToken } });
  }
  async removeToken(refreshToken: string): Promise<void> {
    await this.tokenRepository.destroy({ where: { refreshToken } });
  }
}
