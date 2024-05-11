import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {
  }

  findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<UsersEntity | null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  findOneByEmailWithPassword(email: string): Promise<UsersEntity> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }

  findOneByRfid(rfid: string): Promise<UsersEntity | null> {
    return this.usersRepository.findOneBy({ rfid: rfid });
  }

  create(user: UsersEntity): Promise<UsersEntity> {
    return this.usersRepository.save(user);
  }

  update(rfid: string, userInformation: Partial<UsersEntity>): Promise<UpdateResult> {
    return this.usersRepository.update(rfid, userInformation);
  }

  delete(rfid: number): Promise<DeleteResult> {
    return this.usersRepository.delete(rfid);
  }
}