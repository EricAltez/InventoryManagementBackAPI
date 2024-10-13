import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Permision {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @ManyToMany(() => Role, (role) => role.permisions)
  roles: Role[];
}
