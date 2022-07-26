import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

interface TokenCreationAttrs {
  refreshToken: string;
  userId: number;
}

@Table({ tableName: 'tokens', createdAt: false, updatedAt: false })
export class Token extends Model<Token, TokenCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  refreshToken: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
