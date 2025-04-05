import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class Permission {
  @PrimaryColumn()
  action: string;

  @PrimaryColumn()
  object: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
