import { Role } from '../../role/entities/role.entity';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  roles: Role[];
}

export class LogginUserDto {
  email: string;
  password: string;
}
