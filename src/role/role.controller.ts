import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { createRoleDto } from 'src/role/dto/role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('role')
  async createRole(@Body() roleData: createRoleDto) {
    return this.roleService.createRole(roleData);
  }
}
