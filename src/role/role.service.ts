import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
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

  async createRole(Role) {
    const newRole = this.roleRepository.create(Role);
    await this.roleRepository.save(newRole);
  }
}
