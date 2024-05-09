import { Role } from '../role/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 12345678910 })
  @IsNotEmpty()
  rfid: string;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsString()
  role: Role;

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
};