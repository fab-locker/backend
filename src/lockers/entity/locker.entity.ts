import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('lockers')
export class LockerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    id_objet: number;
}
