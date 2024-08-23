import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const createdUser = this.usersRepository.create(userData);
    return this.usersRepository.save(createdUser);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
