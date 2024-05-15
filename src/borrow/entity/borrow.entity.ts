import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { ItemEntity } from '../../items/entity/items.entity';

@Entity('borrow')
export class BorrowEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ItemEntity)
  @JoinColumn()
  item: ItemEntity;

  @ManyToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true, default: null })
  returnDate: Date;
}
