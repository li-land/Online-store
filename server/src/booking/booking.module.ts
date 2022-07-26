import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenModule } from 'src/token/token.module';
import { User } from 'src/user/user.model';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingInfo } from './models/booking-info.model';
import { Booking } from './models/booking.model';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [
    SequelizeModule.forFeature([User, Booking, BookingInfo]),
    TokenModule,
  ],
  exports: [BookingService],
})
export class BasketModule {}
