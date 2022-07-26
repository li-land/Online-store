import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/role/models/role.model';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      include: {
        model: Role,
        as: 'roles',
        through: { attributes: [] },
      },
    });
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create({ ...userDto });
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async removeUser(id: number): Promise<string> {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException(
        `Пользователя с id=${id} не существует`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.userRepository.destroy({
      where: { id },
    });
    return `Пользователь с id=${id} удален`;
  }
}
