import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LockerEntity } from '../../lockers/entity/locker.entity';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => LockerEntity, locker => locker.item)
  locker: LockerEntity;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string = "";

  @Column()
  availability: boolean = true;

  @Column()
  weight: number = 0;

  @Column()
  borrow_duration: number = 7;

}
