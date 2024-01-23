import {Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('lockers')
export class LockerEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
