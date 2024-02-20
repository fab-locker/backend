import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/service/users.service';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(mail: string, pass: string) {
    const user = await this.userService.findOne('mail', mail);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UsersEntity) {
    const payload = {
      username: user.mail,
      sub: {
        admin: user.admin,
      },
    };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
