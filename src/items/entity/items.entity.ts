import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('items')
export class ItemEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_locker: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    availability: boolean

    @Column()
    weight: number

    @Column()
    borrow_duration: number

}