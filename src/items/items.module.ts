// lockers.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './controller/items.controller';
import { ItemsService } from './service/items.service';
import { ItemEntity } from './entity/items.entity';
import { LockersService } from '../lockers/service/lockers.service';
import { LockerEntity } from '../lockers/entity/locker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity]), TypeOrmModule.forFeature([LockerEntity])],
  controllers: [ItemsController],
  providers: [ItemsService, LockersService],
})
export class ItemsModule {
}
