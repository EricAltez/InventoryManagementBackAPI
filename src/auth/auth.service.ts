import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log('you are in', user);
    }
  }
}
