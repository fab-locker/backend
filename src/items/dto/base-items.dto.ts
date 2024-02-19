import { IsBoolean, IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";

export class BaseItemDto{

    @IsNotEmpty()
    @IsNumber()
    readonly id: number

    @IsNotEmpty()
    @IsNumber()
    id_locker: number

    @IsNotEmpty({message: "name cannot be empty"})
    @IsString()
    name: string

    @IsNotEmpty({message: "description cannot be empty"})
    @IsString()
    description: string

    @IsNotEmpty()
    @IsBoolean()
    availability: boolean

    @IsNotEmpty()
    @IsNumber()
    weight: number

    @IsNotEmpty({message: "borrow cannot be empty"})
    @IsNumber()
    borrow_duration: number

}