import { Role } from 'src/role/entity/role.entity';
import { RoleEnum } from 'src/role/role.enum';

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
