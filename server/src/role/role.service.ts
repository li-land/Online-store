import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (!role) {
      throw new HttpException(
        'Такой роли не существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    return role;
  }
  async addRole(roleDto: CreateRoleDto): Promise<void> {
    const candidateRole = await this.roleRepository.findOne({
      where: { value: roleDto.value },
    });
    if (candidateRole) {
      throw new HttpException('Роль уже существует', HttpStatus.BAD_REQUEST);
    }
    await this.roleRepository.create({ ...roleDto });
  }
}
