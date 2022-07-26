import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';

interface CatalogCreationAttrs {
  name: string;
}

@Table({ tableName: 'catalogs', createdAt: false, updatedAt: false })
export class Catalog extends Model<Catalog, CatalogCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Идентификатор каталога' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @ApiProperty({ example: 'Подносы', description: 'Название каталога' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => Product, { onDelete: 'CASCADE' })
  products: Product[];
}
