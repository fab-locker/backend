import { LockerDto } from '../dto/locker.dto';
import { Injectable } from '@nestjs/common';
import { LockerEntity } from '../entity/locker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LockersService {
  constructor(
    @InjectRepository(LockerEntity)
    private lockerRepository: Repository<LockerEntity>,
  ) {}

  findAll(): Promise<LockerDto[]> {
    return this.lockerRepository.find();
  }

  findOne(id: number): Promise<LockerDto> {
    return this.lockerRepository.findOne({ where: { id: id } });
  }

  create(locker: LockerDto): Promise<LockerDto> {
    return this.lockerRepository.save(locker);
  }

  delete(locker: LockerDto): Promise<LockerDto> {
    return this.lockerRepository.remove(locker);
  }
}
