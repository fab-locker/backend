import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUsersDto} from "../dto/create-users.dto";
import {UsersService} from "../service/users.service";

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    // @Get()
    // getAllUsers(): Promise<CreateUsersDto[]> {
    //     return this.usersService.findAll();
    // }

    @Get()
    getUsers(@Query('id_rfid') id: number, @Query('mail') mail: string) {
        if (id) {
            return this.usersService.findOne('id_rfid', parseInt(id.toString()));
        } else if (mail) {
            return this.usersService.findOne('mail_junia', mail);
        } else {
            return this.usersService.findAll();
        }
    }

    @Post('add')
    async create(@Body() user: CreateUsersDto): Promise<CreateUsersDto> {
        return this.usersService.create(user);
    }

}
