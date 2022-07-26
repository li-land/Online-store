import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from './token.model';
import { User } from 'src/user/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    JwtModule.register({
      signOptions: { expiresIn: '15m' },
    }),
    SequelizeModule.forFeature([Token, User]),
  ],
  providers: [TokenService],
  exports: [TokenService, JwtModule],
})
export class TokenModule {}
