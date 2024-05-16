import { LockerEntity } from "src/lockers/entity/locker.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('historic')
export class HistoricEntity{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => LockerEntity)
    @JoinColumn()
    id_locker: number

    @Column()
    item_id: number

    @Column()
    object_name: string

    @Column()
    email: string


    @Column()
    borrow_date: Date

    @Column({nullable: true})
    render_date?: Date

}
