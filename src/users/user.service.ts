import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await hashPassword(userData.password);
      userData.password = hashedPassword;
      const createdUser = this.usersRepository.create(userData);
      await this.usersRepository.save(createdUser);
      return createdUser;
    } catch (error) {
      if (error.code == 'ER_DUP_ENTRY') {
        throw new HttpException(
          { error: 'Email already in use' },
          HttpStatus.CONFLICT,
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
