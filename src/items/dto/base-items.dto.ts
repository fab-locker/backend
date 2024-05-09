import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { LockerEntity } from '../../lockers/entity/locker.entity';

export class BaseItemDto {

  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: { id: 3 } })
  @IsNotEmpty({ message: 'id_locker cannot be empty' })
  locker: LockerEntity;

  @ApiProperty({ example: 'oscilloscope' })
  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'permet de mesurer une tension' })
  // @IsNotEmpty({message: "description cannot be empty"})
  @IsString()
  description?: string;

  @ApiProperty({ example: true })
  @IsNotEmpty({ message: 'availability cannot be empty' })
  @IsBoolean()
  availability: boolean = true;

  @ApiProperty({ example: 95 })
  @IsNotEmpty()
  @IsNumber()
  weight: number = 0;

  @ApiProperty({ example: 7 })
  @IsNotEmpty({ message: 'borrow cannot be empty' })
  @IsNumber()
  borrow_duration: number = 7;

}