// lockers.module.ts
import { Module } from '@nestjs/common';
import { LockersController } from './controller/lockers.controller';
import { LockersService } from './service/lockers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerEntity } from './entity/locker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LockerEntity])],
  controllers: [LockersController],
  providers: [LockersService],
})
export class LockersModule {}
