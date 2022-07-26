import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Текст отзыва...',
    description: 'Отзыв пользователя',
  })
  readonly name: string;

  @ApiProperty({
    example: 1000,
    description: 'Цена товара',
  })
  readonly price: number;

  @ApiProperty({
    example: '{title:"Название характаристики", description:"Описание"}',
    description: 'Характеристики товара',
  })
  readonly info: string;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор каталога',
  })
  readonly catalogId: number;
}
