import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/user.model';

interface ReviewCreationAttrs {
  rate: number;
  review: string;
  userId: number;
  productId: number;
}

@Table({ tableName: 'reviews', updatedAt: false })
export class Review extends Model<Review, ReviewCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Идентификатор отзыва' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({
    example: 'Текст отзыва...',
    description: 'Отзыв пользователя',
  })
  @Column({ type: DataType.TEXT })
  review: string;

  @ApiProperty({
    example: 5,
    description: 'Оценка пользователя',
  })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  rate: number;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор пользователя',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор товара',
  })
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
