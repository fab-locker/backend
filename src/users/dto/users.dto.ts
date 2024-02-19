import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UsersDto {
  @ApiProperty({ example: 12345678910 })
  @IsNotEmpty()
  @IsNumber()
  rfid: number;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  admin: boolean;

  @ApiProperty({ example: 'example@student.junia.com' })
  @IsString()
  @IsEmail()
  mail: string;
}
