import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateUsersDto {
    @IsNotEmpty()
    @IsNumber()
    id_rfid: number;

    @IsNotEmpty()
    @IsBoolean()
    is_admin: boolean;

    @IsNotEmpty()
    @IsString()
    mail_junia: string;

    @IsNotEmpty({message: "Password cannot be empty"})
    @IsString()
    password: string;
}
