import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { LockersService } from '../service/lockers.service';
import { LockerDto } from '../dto/locker.dto';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../auth/roles/roles.decorator';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { RoleGuard } from '../../auth/role/role.guard';
import { Role } from '../../auth/role/role.enum';

@ApiTags('Lockers')
@Controller('api/lockers')
export class LockersController {
  constructor(private lockersService: LockersService) {
  }

  @ApiOperation({ summary: 'Get all lockers', description: 'Retrieve all lockers.' })
  @Roles(Role.User)
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  getAllLockers(): Promise<LockerDto[]> {
    return this.lockersService.findAll();
  }

  @ApiOperation({ summary: 'Create locker [Admin]', description: 'Create a new locker.' })
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBody({ type: LockerDto })
  @Post()
  create(@Body() locker: LockerDto): Promise<LockerDto> {
    return this.lockersService.create(locker);
  }

  @ApiOperation({ summary: 'Delete locker [Admin]', description: 'Delete a locker.' })
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBody({ type: LockerDto })
  @Delete()
  delete(@Body() locker: LockerDto): Promise<LockerDto> {
    return this.lockersService.delete(locker);
  }
}
