import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './role-auth.decorators';
import { RolesGuard } from './role.guard';
import { RoleService } from './role.service';

@ApiTags('Роли')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Добавление роли в БД' })
  @ApiResponse({
    status: 200,
    description: 'Роль добавлена',
  })
  @ApiResponse({
    status: 400,
    description: 'Роль уже существует',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет доступа',
  })
  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async addRole(@Body() roleDto: CreateRoleDto): Promise<void> {
    await this.roleService.addRole(roleDto);
  }
}
