import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Андрей',
    description: 'Имя пользователя',
  })
  @IsNotEmpty({ message: 'Пустое значение имени' })
  readonly name: string;

  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Email пользователя',
  })
  @IsNotEmpty({ message: 'Пустое значение почты' })
  @IsEmail({}, { message: 'Некорректный емайл' })
  readonly email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Пароль пользователя',
  })
  @IsNotEmpty({ message: 'Пустое значение пароля' })
  @Length(8, 99, { message: 'Пароль должен быть не меньше 8 знаков' })
  readonly password: string;
}
