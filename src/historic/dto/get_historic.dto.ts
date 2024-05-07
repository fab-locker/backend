import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsNumber } from "class-validator";

export class GetHistoricDto{

    @ApiProperty({example: 6})
    @IsNotEmpty({message: "id_locker cannot be empty"})
    @IsNumber()
    id_locker: number

}