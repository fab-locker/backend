import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @Column({ nullable: false })
  rfid: string;

  @Column({ nullable: false })
  admin: boolean;

  @Column({ nullable: false })
  @PrimaryColumn()
  mail: string;

  @Column({ nullable: false })
  password: string;
}
