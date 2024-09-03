import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LogginUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Post('login')
  async userLogin(@Body() userData: LogginUserDto) {
    return this.authService.signIn(userData.email, userData.password);
  }
}
