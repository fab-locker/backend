import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/service/users.service';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../users/entity/users.entity';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './types/AccessToken';
import { RegisterRequestDto } from './dtos/register-request.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(mail: string, pass: string) {
    const user = await this.userService.findOne('mail', mail);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(pass, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }
    return user;
  }

  async login(user: UsersEntity): Promise<AccessToken> {
    const payload = {
      mail: user.mail,
      rfid: user.rfid,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.userService.findOne('mail', user.mail);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: UsersEntity = { ...user, password: hashedPassword };
    await this.userService.create(newUser);
    return this.login(newUser);
  }
}
