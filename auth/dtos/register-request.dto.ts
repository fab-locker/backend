import { Role } from '../../src/auth/role/role.enum';

export type RegisterRequestDto = {
  rfid: number;
  role: Role;
  email: string;
  password: string;
};
