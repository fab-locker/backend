import { Body, Controller, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { RegisterRequestDto } from '../../auth/dtos/register-request.dto';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Res() res, @Request() req) {
    try {
      const user = req.user;
      const access_token = await this.authService.login(user);
      user.password = undefined;
      return res.status(HttpStatus.OK).json({ user, access_token });
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Post('register')
  async register(
    @Body() registerBody: RegisterRequestDto,
    @Res() res,
  ): Promise<string> {
    const access_token = await this.authService.register(registerBody);
    return res.status(HttpStatus.OK).json({ access_token });
  }
}
