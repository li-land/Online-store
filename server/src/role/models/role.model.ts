import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { User } from '../../user/user.model';
import { UserRole } from './user-role.model';

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
