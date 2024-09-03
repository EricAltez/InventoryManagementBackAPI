export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  isActive: boolean;
}

export class LogginUserDto {
  email: string;
  password: string;
}
