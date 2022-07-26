import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'USER',
    description: 'Роль пользователя',
  })
  @IsString()
  readonly value: string;
}
