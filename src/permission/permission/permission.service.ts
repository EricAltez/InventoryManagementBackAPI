import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPermissionDto } from '../../permission/dto/permission.dto';
import { Permission } from '../../permission/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createPermission(permissionData: createPermissionDto) {
    const newPermission = this.permissionRepository.create(permissionData);
    await this.permissionRepository.save(newPermission);
  }

  async updatePermission() {}
  async deletePermission() {}
}
