import { RoleEnum } from 'src/role/role.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles: Role[];
}
