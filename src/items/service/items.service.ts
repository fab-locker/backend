import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../entity/items.entity';
import { BaseItemDto } from '../dto/base-items.dto';
import { UpdateItemDto } from '../dto/update-item-dto';
import { throwError } from 'rxjs';
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  //   /**
  //  * Check if a user exists with the same mail or rfid
  //  * @param item
  //  * @returns {Promise<boolean>}
  //  */
  //   async doUserExists(item: Partial<createItemDto>): Promise<boolean> {
  //     let existingItem: createItemDto;
  
  //     // If the mail or rfid is passed in the body, it means it is a creation or an update of mail or rfid, so we need to check if the user exists
  //     // Otherwise, it means it is exclusively an update of role or password, so no need to check if the user exists
  //     if (item.name) {
  //       existingItem = await this.itemRepository.findOne({
  //         where: [{ mail: user.mail }, { rfid: user.rfid }],
  //       });
  //       if (existingUser) {
  //         let field: string;
  //         if (existingUser.mail === user.mail) {
  //           field = 'e-mail';
  //         } else {
  //           field = 'badge';
  //         }
  //         throw new BadRequestException(
  //           `Un utilisateur avec le même ${field} existe déjà.`,
  //         );
  //       }
  //     } else {
  //       return false;
  //     }
  //   }

  async getAllItems(item : BaseItemDto): Promise<BaseItemDto[] | null> {
    return await this.itemRepository.find();
  }




  async getOne(fieldName: string, value: any): Promise<BaseItemDto | null> {
    try {
      await this.itemRepository.findOne({ where: { [fieldName]: value } });
    } catch (error) {
      console.error('Erreur lors de la récupération d\'un élément :', error);
      return null;
    }
  }

  async updateItem(id:number, item: Partial<UpdateItemDto>): Promise<UpdateItemDto>{
    try{
      await this.itemRepository.update(id,item);
    }catch(error){
      console.error('Erreur lors de la récupération d\'un élément :', error);
      return null;
    }
  }

  async createItem(item: BaseItemDto): Promise<BaseItemDto | null>{
    
    const newItem = this.itemRepository.create(item);
    await this.itemRepository.save(newItem);
    return this.itemRepository.create(item)
  }

  async deleteItem(id: number): Promise<void>{
    const existingItem = await this.itemRepository.findOne({where:[{id : id}]} )
    if(!existingItem){
      throw new NotFoundException("l'item sélectionné n'existe pas")
    } else{
      await this.itemRepository.delete({id:id})
    }
  }


}