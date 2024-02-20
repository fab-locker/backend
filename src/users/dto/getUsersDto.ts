import { BaseUsersDto } from './baseUsers.dto';
import { Optional } from '@nestjs/common';

export class GetUsersDto extends BaseUsersDto {
  @Optional()
  password: string;
}
