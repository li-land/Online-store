import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../user/user.model';
import { Role } from './role.model';

@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
