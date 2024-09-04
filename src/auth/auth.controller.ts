import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, LogginUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/utils/publicdecporator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async userLogin(@Body() userData: LogginUserDto) {
    return this.authService.signIn(userData.email, userData.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
