import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/product/models/product.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingInfo } from './models/booking-info.model';
import { Booking } from './models/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private bookingRepository: typeof Booking,
    @InjectModel(BookingInfo)
    private bookingInfoRepository: typeof BookingInfo,
  ) {}

  async getAllBookings(userId: number): Promise<Booking[]> {
    if (!userId) {
      throw new HttpException(
        'Не задан id пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.bookingRepository.findAll({
      where: { userId },
      include: [
        {
          model: BookingInfo,
          include: [{ model: Product }],
        },
      ],
    });
  }

  async createBooking(bookingDto: CreateBookingDto): Promise<string> {
    if (!bookingDto.bookingsProducts.length) {
      throw new HttpException(
        'Нет товаров для оформления заказа',
        HttpStatus.BAD_REQUEST,
      );
    }
    const booking = await this.bookingRepository.create({
      ...bookingDto,
      status: 'В обработке',
    });

    bookingDto.bookingsProducts.forEach(async (product) => {
      const bookingProduct = {
        bookingId: booking.id,
        productId: product.productId,
        amount: product.amount,
      };
      await this.bookingInfoRepository.create({ ...bookingProduct });
    });

    return `Заказ ${booking.id} создан`;
  }

  async removeBooking(id: number): Promise<string> {
    if (!id) {
      throw new HttpException('Не задан номер заказа', HttpStatus.BAD_REQUEST);
    }
    const booking = await this.bookingRepository.findByPk(id);
    if (!booking) {
      throw new HttpException('Такого заказа нет', HttpStatus.NOT_FOUND);
    }
    await this.bookingRepository.destroy({ where: { id } });
    return `Заказ ${id} отменен`;
  }
}
