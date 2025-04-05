import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOptionsWhere } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { hashPassword } from '../utils/bcrypt';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      const roles = await this.roleRepository.findBy({ name: 'User' });
      const hashedPassword = await hashPassword(userData.password);

      userData.password = hashedPassword;
      const createdUser = this.usersRepository.create({ ...userData, roles });
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

  // search find unique
  async findById(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findBy(where: FindOptionsWhere<User>): Promise<User[] | null> {
    return await this.usersRepository.findBy(where);
  }

  async findOneBy(where: FindOptionsWhere<User>): Promise<User | null> {
    return await this.usersRepository.findOneBy(where);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
