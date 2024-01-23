// lockers.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersEntity} from "./entity/users.entity";
import {UsersController} from "./controller/users.controller";
import {UsersService} from "./service/users.service";


@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    controllers: [UsersController],
    providers: [UsersService],
})

export class UsersModule {}
