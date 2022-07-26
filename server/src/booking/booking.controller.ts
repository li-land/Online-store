import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/role/role-auth.decorators';
import { RolesGuard } from 'src/role/role.guard';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './models/booking.model';

@ApiTags('Заказы')
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @ApiOperation({ summary: 'Получение всех заказов пользователя' })
  @ApiResponse({
    status: 200,
    type: [Booking],
    description: 'Возвращаются данные заказов',
  })
  @ApiResponse({
    status: 400,
    description: 'Не задан id пользователя',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  @Get(':id')
  @Roles('USER')
  @UseGuards(RolesGuard)
  async getAll(@Param('id') userId: string): Promise<Booking[]> {
    return await this.bookingService.getAllBookings(+userId);
  }

  @ApiOperation({ summary: 'Добавление заказа' })
  @ApiResponse({
    status: 200,
    description: 'Заказ создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Нет товаров для оформления заказа',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  @Post()
  @Roles('USER')
  @UseGuards(RolesGuard)
  async create(@Body() bookingDto: CreateBookingDto): Promise<string> {
    return await this.bookingService.createBooking(bookingDto);
  }

  @ApiOperation({ summary: 'Отмена заказа' })
  @ApiResponse({
    status: 200,
    description: 'Заказ отменен',
  })
  @ApiResponse({
    status: 400,
    description: 'Не задан номер заказа',
  })
  @ApiResponse({
    status: 404,
    description: 'Нет запрашиваемого заказа',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  @Delete(':id')
  @Roles('USER')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string): Promise<string> {
    return await this.bookingService.removeBooking(+id);
  }
}
