import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LockerDto {
  @ApiProperty()
  id: number;
}
