import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { ItemEntity } from '../../items/entity/items.entity';

@Entity('borrow')
export class BorrowEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => ItemEntity)
  @JoinColumn()
  item: ItemEntity;

  @OneToOne(() => UsersEntity)
  @JoinColumn()
  user: UsersEntity;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true, default: null })
  returnDate: Date;
}
