import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Текст отзыва...',
    description: 'Отзыв пользователя',
  })
  @IsNotEmpty({ message: 'Нет наименования товара' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;

  @ApiProperty({
    example: 1000,
    description: 'Цена товара',
  })
  @IsNotEmpty({ message: 'Нет цены товара' })
  readonly price: number;

  @ApiProperty({
    example: '{title:"Название характаристики", description:"Описание"}',
    description: 'Характеристики товара',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly info: string;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор каталога',
  })
  @IsNotEmpty({ message: 'Нет идентификатора каталога' })
  readonly catalogId: number;
}
