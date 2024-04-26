import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UsersDto {
  @ApiProperty({ example: "12 345 67 89" })
  @IsNotEmpty()
  @IsString()
  rfid: string;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  admin: boolean;

  @ApiProperty({ example: 'example@student.junia.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  mail: string;
}
