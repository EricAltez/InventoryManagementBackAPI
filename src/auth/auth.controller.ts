import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UserService } from 'src/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }
}
