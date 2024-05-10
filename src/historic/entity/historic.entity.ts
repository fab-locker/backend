import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('historic')
export class HistoricEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_locker: number

    @Column()
    object_name: string

    @Column()
    email: string

    @Column()
    borrow_date: Date

    @Column({nullable: true})
    render_date?: Date

}
