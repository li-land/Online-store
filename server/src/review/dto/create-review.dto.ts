import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Текст отзыва...',
    description: 'Отзыв пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly review: string;

  @ApiProperty({
    example: '5',
    description: 'Оценка товара от пользователя',
  })
  @IsNotEmpty({ message: 'Нет оценки' })
  readonly rate: number;

  @ApiProperty({
    example: 1,
    description: 'Идентификатор пользователя',
  })
  @IsNotEmpty({ message: 'Нет идентифкатора пользователя' })
  @IsNumber({}, { message: 'Должно быть число' })
  readonly userId: number;

  @ApiProperty({
    example: 1,
    description: 'Идентифкатор товара',
  })
  @IsNotEmpty({ message: 'Нет идентифкатора товара' })
  @IsNumber({}, { message: 'Должно быть число' })
  readonly productId: number;
}
