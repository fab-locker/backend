import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ example: 12345678910 })
  @IsNotEmpty()
  @IsNumber()
  rfid: number;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  admin: boolean;

  @ApiProperty({ example: 'exemple@student.junia.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre.',
  })
  password: string;
}

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}