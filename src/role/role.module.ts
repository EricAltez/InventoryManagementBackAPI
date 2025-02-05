import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
