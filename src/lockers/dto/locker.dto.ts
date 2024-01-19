import { IsNumber } from 'class-validator';

export class LockerDto {
  @IsNumber()
  id: number;

  @IsNumber()
  id_objet: number;
}
