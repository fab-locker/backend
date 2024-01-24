import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity('users')
export class UsersEntity {
    @PrimaryColumn()
    id_rfid: number;

    @Column({nullable: false})
    is_admin: boolean;

    @Column({nullable: false})
    mail_junia: string;

    @Column({nullable: false})
    password: string;
}
