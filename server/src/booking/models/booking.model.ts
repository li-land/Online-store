import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { BookingInfo } from './booking-info.model';
import { User } from '../../user/user.model';
import { ApiProperty } from '@nestjs/swagger';

interface BookingCreationAttrs {
  address: string;
  status: 'В обработке' | 'Отправлен';
  userId: number;
}

@Table({ tableName: 'bookings', updatedAt: false })
export class Booking extends Model<Booking, BookingCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Номер заказа' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({
    example: 'г.Москва, ул. Кремлевская, д.1, кв.2',
    description: 'Адрес заказа пользователя',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  address: string;

  @ApiProperty({ example: 'В обработке', description: 'Статус заказа' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => BookingInfo)
  Bookinginfos: BookingInfo[];
}
