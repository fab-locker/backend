import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../entity/items.entity';
import { ItemDto } from '../dto/items.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}
  
  async getAll(fieldName: string, value: any): Promise<ItemEntity[] | null> {
        return await this.itemRepository.find({ where: { [fieldName]: value } });
  }
  
  async getOne(fieldName: string, value: any): Promise<ItemEntity | null> {
    try {
      await this.itemRepository.findOne({ where: { [fieldName]: value } });
    } catch (error) {
      console.error('Erreur lors de la récupération d\'un élément :', error);
      return null;
    }
  }

  async update(fieldName: string, value: any, newValue: any): Promise<void>{
    try{
      await this.itemRepository.update({[fieldName]:value},{[fieldName]:newValue})
    }catch(error){
      console.error('Erreur lors de la récupération d\'un élément :', error);
      return null;
    }
  }

  async create(item: ItemDto): Promise<void>{
    try{
      await this.itemRepository.save(item)
    }catch(error){
      console.error('Erreur lors de la création de l\'élément : ', error)
      return null;
    }
  }


}