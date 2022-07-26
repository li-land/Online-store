import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from './product.model';

export interface ProductInfoCreationAttrs {
  title: string;
  description: number;
  productId: number;
}

@Table({ tableName: 'products-info', createdAt: false, updatedAt: false })
export class ProductInfo extends Model<ProductInfo, ProductInfoCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @BelongsTo(() => Product)
  product: Product;
}
