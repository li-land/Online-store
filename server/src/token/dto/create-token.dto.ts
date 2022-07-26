import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateTokenDto {
  @ApiProperty({
    example: 1,
    description: 'Идентификатор пользователя',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly id: number;

  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Email пользователя',
  })
  @IsNotEmpty({ message: 'Пустое значение почты' })
  @IsEmail({}, { message: 'Некорректный емайл' })
  readonly email: string;

  @ApiProperty({
    example: 'Андрей',
    description: 'Имя пользователя',
  })
  @IsNotEmpty({ message: 'Пустое значение имени' })
  readonly name: string;

  @ApiProperty({
    example: '["USER", "ADMIN"]',
    description: 'Роли пользователя',
  })
  @IsArray({ message: 'Должен быть массив' })
  readonly roles: string[];
  constructor(model) {
    this.id = model.id;
    this.email = model.email;
    this.name = model.name;
    this.roles = model.roles;
  }
}
