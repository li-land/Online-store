import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Role } from './models/role.model';
import { UserRole } from './models/user-role.model';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole]), TokenModule],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
