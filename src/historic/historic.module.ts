// lockers.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricEntity } from './entity/historic.entity';
import { HistoricController } from './controller/historic.controller';
import { HistoricService } from './service/historic.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricEntity])],
  controllers: [HistoricController],
  providers: [HistoricService],
})
export class HistoricModule {}
