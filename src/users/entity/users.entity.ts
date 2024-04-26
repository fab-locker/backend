import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @Column({ nullable: false })
  mail: string;

  @Column({nullable: false})
  @PrimaryColumn()
  rfid: string;

  @Column({ nullable: false })
  admin: boolean;

  @Column({ nullable: false })
  password: string;
}
