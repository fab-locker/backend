import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '../../auth/role/role.enum';

@Entity('users')
export class UsersEntity {
  @PrimaryColumn({ type: 'bigint' })
  rfid: number;

  @Column({ nullable: false })
  role: Role;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
