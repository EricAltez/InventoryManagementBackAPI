import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    this.userService.delete(id);
  }
}
