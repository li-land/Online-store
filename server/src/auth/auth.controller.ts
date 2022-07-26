import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

export interface AuthResponse {
  accessToken: string;
}

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, description: 'Возвращается токен пользователя' })
  @ApiResponse({
    status: 400,
    description: 'Пользователь с такой почтой уже существует',
  })
  @Post('registration')
  async registration(
    @Res({ passthrough: true }) response: Response,
    @Body() userDto: CreateUserDto,
  ): Promise<AuthResponse> {
    const tokens = await this.authService.registration(userDto);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      maxAge: 9e5,
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 25e8,
    });
    return { accessToken: tokens.accessToken };
  }

  @ApiOperation({ summary: 'Вход в кабинет' })
  @ApiResponse({ status: 200, description: 'Возвращается токен пользователя' })
  @ApiResponse({
    status: 400,
    description: 'Пользователь с такой почтой уже существует',
  })
  @ApiResponse({
    status: 404,
    description: 'Такой почты не существует',
  })
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() userDto: LoginUserDto,
  ): Promise<AuthResponse> {
    const tokens = await this.authService.login(userDto);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      maxAge: 9e5,
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 25e8,
    });
    return { accessToken: tokens.accessToken };
  }

  @ApiOperation({ summary: 'Выход из кабинета' })
  @ApiResponse({ status: 200, description: 'Удаление токена из cookies' })
  @Get('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { refreshToken } = request.cookies;
    await this.authService.logout(refreshToken);
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
  }

  @ApiOperation({ summary: 'Проверка авторизации' })
  @ApiResponse({ status: 200, description: 'Пользователь авторизован' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @Get('check-auth')
  async checkAuth(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = request.cookies;
    const tokens = await this.authService.checkAuth(accessToken, refreshToken);
    response.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      maxAge: 9e5,
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 25e8,
    });
    return { accessToken: tokens.accessToken };
  }
}
