import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LockersService } from '../service/lockers.service';
import { LockerDto } from '../dto/locker.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/roles/roles.decorator';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { RoleGuard } from '../../auth/role/role.guard';

@ApiTags('Lockers')
@Controller('api/lockers')
export class LockersController {
  constructor(private lockersService: LockersService) {
  }

  @Roles('user')
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  getAllLockers(): Promise<LockerDto[]> {
    return this.lockersService.findAll();
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RoleGuard)
  @Post('add')
  create(@Body() locker: LockerDto): Promise<LockerDto> {
    return this.lockersService.create(locker);
  }

  @Roles('admin')
  @UseGuards(JwtGuard, RoleGuard)
  @Post('delete')
  delete(@Body() locker: LockerDto): Promise<LockerDto> {
    return this.lockersService.delete(locker);
  }
}
