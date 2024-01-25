import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../entity/items.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  findOne(fieldName: string, value: any): Promise<ItemEntity | null> {
    return this.itemRepository.findOne({ where: { name: value } });
  }
}