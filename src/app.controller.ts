import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/guards/jwt.guard';
import { RoleGuard } from './auth/role/role.guard';
import { Roles } from './auth/roles/roles.decorator';
import { Role } from './auth/role/role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  profile(@Req() req, @Res() res): string {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
