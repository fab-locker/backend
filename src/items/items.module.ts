// lockers.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from './controller/items.controller';
import { ItemsService } from './service/items.service';
import { ItemEntity } from './entity/items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
