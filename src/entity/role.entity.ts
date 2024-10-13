import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Permision } from './permision.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Permision, { cascade: true })
  @JoinTable()
  permisions: Permision[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
