import { Body, Controller, Get, Post } from '@nestjs/common';
import { LockersService } from '../service/lockers.service';
import { LockerDto } from '../dto/locker.dto';

@Controller('api/lockers')
export class LockersController {
  constructor(private lockersService: LockersService) {}

  @Get('all')
  getAllLockers(): Promise<LockerDto[]> {
    return this.lockersService.findAll();
  }

  @Post('addLocker')
  create(@Body() locker: LockerDto): Promise<LockerDto> {
    return this.lockersService.createLocker(locker);
  }
}
