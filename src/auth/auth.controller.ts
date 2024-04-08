import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from '../users/dto/createUsers.dto';
import { UsersService } from '../users/service/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {
  }

  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.body);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUsersDto) {
    return await this.usersService.create(createUserDto);
  }
}
