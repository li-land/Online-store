// import { ApiProperty } from '@nestjs/swagger';

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор пользователя',
  })
  @IsNotEmpty({ message: 'Нет идентифкатора пользователя' })
  @IsNumber({}, { message: 'Должно быть число' })
  readonly userId: number;

  @ApiProperty({
    example: 'г.Москва, ул. Кремлевская, д.1, кв.2',
    description: 'Адрес заказа пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly address: string;

  @ApiProperty({
    example: '[{"productId": 1, "amount": 2}]',
    description: 'Заказанные товары пользователя',
  })
  @IsArray({ message: 'Должен быть массив' })
  readonly bookingsProducts: [{ productId: number; amount: number }];
}
