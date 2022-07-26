import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';
import { Booking } from './booking.model';

interface BookingInfoCreationAttrs {
  amount: number;
  basketId: number;
  productId: number;
}

@Table({ tableName: 'booking-infos', createdAt: false, updatedAt: false })
export class BookingInfo extends Model<BookingInfo, BookingInfoCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  amount: number;

  @ForeignKey(() => Booking)
  @Column({ type: DataType.INTEGER })
  bookingId: number;

  @BelongsTo(() => Booking)
  booking: Booking;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product, { onDelete: 'CASCADE' })
  product: Product;
}
