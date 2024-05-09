import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowEntity } from '../entity/borrow.entity';
import { ItemEntity } from '../../items/entity/items.entity';
import { UsersEntity } from '../../users/entity/users.entity';
import { Role } from '../../auth/role/role.enum';
import { Roles } from '../../auth/roles/roles.decorator';
import { RoleGuard } from '../../auth/role/role.guard';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowEntity)
    private borrowRepository: Repository<BorrowEntity>,
  ) {
  }

  async getBorrows() {
    return this.borrowRepository.find();
  }

  async getBorrow(id: number) {
    return this.borrowRepository.findOne({ where: { id } });
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

  async returnBorrow(borrowId: number) {
    const borrow = await this.getBorrow(borrowId);
    if (!borrow) {
      throw new NotFoundException(`L'emprunt avec l'ID ${borrowId} n'existe pas.`);
    }

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
    const borrow = await this.getBorrow(id);
    if (!borrow) {
      throw new NotFoundException(`L'emprunt avec l'ID ${id} n'existe pas.`);
    }

    borrow.endDate = newEndDate;
    return this.borrowRepository.save(borrow);
  }
}