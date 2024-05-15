import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowEntity } from '../entity/borrow.entity';
import { ItemEntity } from '../../items/entity/items.entity';
import { UsersEntity } from '../../users/entity/users.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowEntity)
    private borrowRepository: Repository<BorrowEntity>,
  ) {
  }

  async getBorrows() {
    return this.borrowRepository.find({ relations: ['item', 'user'] });
  }

  async getBorrowByLockerId(lockerId: number): Promise<BorrowEntity> {
    return await this.borrowRepository
      .createQueryBuilder('borrow')
      .innerJoinAndSelect('borrow.user', 'user')
      .innerJoinAndSelect('borrow.item', 'item')
      .innerJoinAndSelect('item.locker', 'locker')
      .where(`locker.id = ${lockerId}`)
      .andWhere('borrow.returnDate IS NULL')
      .getOne();
  }

  async createBorrow(user: UsersEntity, item: ItemEntity) {
    try {
      if (item.availability === false) {
        throw new ConflictException('L\'objet n\'est pas disponible');
      }

      const endDate = this.calculateEndDate(new Date(), item.borrow_duration);
      const borrow = new BorrowEntity();
      borrow.item = item;
      borrow.startDate = new Date();
      borrow.endDate = endDate;
      borrow.user = user;
      borrow.returnDate = null;

      return await this.borrowRepository.save(borrow);
    } catch (error) {
      console.error('Erreur lors de l\'emprunt:', error);
      throw new ConflictException('Erreur lors de l\'emprunt');
    }
  }

  async returnBorrow(lockerId: number) {
    const borrow = await this.getBorrowByLockerId(lockerId);
    if (!borrow) {
      throw new NotFoundException(`Le casier avec l'ID ${lockerId} n'a pas d'emprunt.`);
    }
    const borrowId = borrow.id;
    await this.borrowRepository.update(borrowId, { returnDate: new Date() });
  }

  private calculateEndDate(startDate: Date, durationInDays: number): Date {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationInDays);
    return endDate;
  }

  async updateBorrow(id: number, borrow: BorrowEntity) {
    return this.borrowRepository.update(id, borrow);
  }

  async updateEndDate(id: number, newEndDate: Date) {
    const borrow = await this.getBorrowByLockerId(id);
    if (!borrow) {
      throw new NotFoundException(`L'emprunt avec l'ID ${id} n'existe pas.`);
    }

    borrow.endDate = newEndDate;
    return this.borrowRepository.save(borrow);
  }
}