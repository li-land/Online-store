import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';
import { Role } from '../role/models/role.model';
import { UserRole } from 'src/role/models/user-role.model';
import { RoleModule } from 'src/role/role.module';
import { Token } from 'src/token/token.model';
import { Review } from 'src/review/models/review.model';
import { Booking } from 'src/booking/models/booking.model';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Review, Booking, Role, UserRole, Token]),
    RoleModule,
    TokenModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
