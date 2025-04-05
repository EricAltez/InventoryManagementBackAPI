import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createRoleDto } from '../role/dto/role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findRoles() {
    return await this.roleRepository.findOneBy({ name: 'User' });
  }

  //add exeption for duplicated entry
  async createRole(roleData: createRoleDto) {
    const newRole = this.roleRepository.create(roleData);
    await this.roleRepository.save(newRole);
  }
}
