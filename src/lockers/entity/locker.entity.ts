import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemEntity } from '../../items/entity/items.entity';

@Entity('lockers')
export class LockerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => ItemEntity)
  @JoinColumn()
  item?: ItemEntity;
}
