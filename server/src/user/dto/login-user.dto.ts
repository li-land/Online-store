import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Email пользователя',
  })
  @IsNotEmpty({ message: 'Пустое значение почты' })
  @IsEmail({}, { message: 'Некорректный емайл' })
  readonly email: string;

  @ApiProperty({
    example: '123456',
    description: 'Пароль пользователя',
  })
  @IsNotEmpty({ message: 'Пустое значение пароля' })
  @Length(8, 99, { message: 'Пароль должен быть не меньше 8 знаков' })
  readonly password: string;
}
