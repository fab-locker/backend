import {Controller, Get} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {UsersDto} from "../dto/users.dto";
import {UsersService} from "../service/users.service";

@ApiTags('API')
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Get()
    getAllUsers(): Promise<UsersDto[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    getUserByRfid(id: number): Promise<UsersDto> {
        return this.usersService.findOne('id_rfid', id);
    }

    @Get(':mail')
    getUserByMail(mail: string): Promise<UsersDto> {
        return this.usersService.findOne('mail_junia', mail);
    }
}
