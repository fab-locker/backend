import {IsBoolean, IsNumber, IsString} from "class-validator";

export class UsersDto {
    @IsNumber()
    id_rfid: number;

    @IsBoolean()
    is_admin: boolean;

    @IsString()
    mail_junia: string;

    @IsString()
    password: string;
}
