import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BaseHistoricDto{

    @IsNotEmpty()
    @IsNumber()
    readonly id: number

    @ApiProperty({example: 6})
    @IsNotEmpty({message: "id_locker cannot be empty"})
    @IsNumber()
    id_locker: number

    @ApiProperty({example:"oscilloscope"})
    @IsNotEmpty({message: "name cannot be empty"})
    @IsString()
    object_name: string

    @ApiProperty({example:"toto@gmail.com"})
    @IsNotEmpty()
    @IsNumber()
    email: string

    @IsNotEmpty({message: "borrow date cannot be empty"})
    @IsDate()
    borrow_date: Date

    @IsNotEmpty({message: "ended date cannot be empty"})
    @IsDate()
    render_date: Date

}