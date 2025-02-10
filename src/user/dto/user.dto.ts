import { Role } from 'src/role/entity/role.entity';

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
