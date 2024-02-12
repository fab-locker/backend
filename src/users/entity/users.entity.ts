import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryColumn()
  rfid: number;

  @Column({ nullable: false })
  admin: boolean;

  @Column({ nullable: false })
  mail: string;

  @Column({ nullable: false })
  password: string;
}
