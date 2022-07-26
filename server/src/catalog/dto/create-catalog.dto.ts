import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCatalogDto {
  @ApiProperty({
    example: 'Подносы',
    description: 'Название каталога',
  })
  @IsNotEmpty({ message: 'Нет наименования товара' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
