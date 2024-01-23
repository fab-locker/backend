import {Column, Entity, PrimaryColumn} from 'typeorm';

@Entity('users')
export class UsersEntity {
    @PrimaryColumn()
    id_rfid: number;

    @Column()
    is_admin: boolean;

    @Column()
    mail_junia: string;

    @Column()
    password: string;
}
