import {IsNumber} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LockerDto {

    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNumber()
    id_objet: number;
}
