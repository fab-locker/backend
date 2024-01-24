import {Body, Controller, Get, Post} from '@nestjs/common';
import {LockersService} from '../service/lockers.service';
import {LockerDto} from '../dto/locker.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Lockers')
@Controller('api/lockers')
export class LockersController {
    constructor(private lockersService: LockersService) {
    }

    @Get()
    getAllLockers(): Promise<LockerDto[]> {
        return this.lockersService.findAll();
    }

    @Post('add')
    create(@Body() locker: LockerDto): Promise<LockerDto> {
        return this.lockersService.create(locker);
    }

    @Post('delete')
    delete(@Body() locker: LockerDto): Promise<LockerDto> {
        return this.lockersService.delete(locker);
    }
}
