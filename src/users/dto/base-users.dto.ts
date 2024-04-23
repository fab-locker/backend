import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class BaseUsersDto {
  @ApiProperty({ example: 12345678910 })
  @IsNotEmpty()
  @IsString()
  rfid: string;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  admin: boolean;

  @ApiProperty({ example: 'exemple@student.junia.com' })
  @IsString()
  @IsEmail()
  mail: string;

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre.',
  })
  password: string;
}
