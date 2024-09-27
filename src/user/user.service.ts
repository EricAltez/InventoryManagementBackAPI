import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from '../entity/user.entity';
import { hashPassword } from 'src/utils/bcrypt';
import { Role } from 'src/entity/role.entity';

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
      console.log(roles);
      const hashedPassword = await hashPassword(userData.password);
      userData.password = hashedPassword;
      // changing roles name generates an error
      const createdUser = this.usersRepository.create({ ...userData, roles });
      console.log(createdUser);
      await this.usersRepository.save(createdUser);
      console.log(createdUser);
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
  //this should be the same function
  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
