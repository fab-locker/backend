import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersEntity } from '../users/entity/users.entity';
import { UsersService } from '../users/service/users.service';
import { RegisterRequestDto } from './dtos/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(email: string, password: string): Promise<UsersEntity> {
    const user: UsersEntity = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(user: UsersEntity): Promise<string> {
    const payload = { email: user.email, rfid: user.rfid, role: user.role };
    return this.jwtService.sign(payload);
  }

  async register(user: RegisterRequestDto): Promise<string> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: UsersEntity = { ...user, password: hashedPassword };
    await this.usersService.create(newUser);
    return this.login(newUser);
  }
}
