import { Role } from '../role/role.enum';

export type RegisterRequestDto = {
  rfid: number;
  role: Role;
  email: string;
  password: string;
};