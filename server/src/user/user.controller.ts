import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/role/role-auth.decorators';
import { RolesGuard } from 'src/role/role.guard';
import { UserService } from './user.service';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь с id удален',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователя с id не существует',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.removeUser(+id);
  }
}
