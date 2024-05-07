// lockers.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowController } from './controller/borrow.controller';
import { BorrowService } from './service/borrow.service';
import { BorrowEntity } from './entity/borrow.entity';
import { ItemsService } from '../items/service/items.service';
import { ItemEntity } from '../items/entity/items.entity';
import { UsersService } from '../users/service/users.service';
import { UsersEntity } from '../users/entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowEntity]), TypeOrmModule.forFeature([ItemEntity]), TypeOrmModule.forFeature([UsersEntity])],
  controllers: [BorrowController],
  providers: [BorrowService, ItemsService, UsersService],
})
export class BorrowModule {
}
