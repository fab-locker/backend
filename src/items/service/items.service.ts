import { ConflictException, HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../entity/items.entity';
import { BaseItemDto } from '../dto/base-items.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { CreateItemDto } from '../dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}


  async getItems(item? : Partial<BaseItemDto>): Promise<BaseItemDto[] | BaseItemDto | null> {
    try{
    if(!item){
      return await this.itemRepository.findOne({ where: item });
    }else{
      return await this.itemRepository.find();
    }
  }catch(error){
    console.error("Erreur lors de la récupération d'un item : ",  error)
    return null;
  }
  }

  async updateItem(id:number, item: Partial<UpdateItemDto>): Promise<UpdateItemDto>{
    try{
      await this.itemRepository.update(id,item);
    }catch(error){
      console.error('Erreur lors de la mise à jour d\'un item :', error);
      return null;
    }
  }

  async createItem(item: CreateItemDto): Promise<CreateItemDto | null>{
    try{
    const busyLocker = await this.itemRepository.findOne({where:[{id_locker :item.id_locker}]})
      if(!busyLocker){
        const newItem = this.itemRepository.create(item);
        await this.itemRepository.save(newItem);
        return this.itemRepository.create(item);
      }else{
        throw new ConflictException("le casier indiqué n'est pas disponible choisissez en un autre")
      }
    }catch(error){
      console.error('Erreur lors de la récupération d\'un item :', error);
      return null;
    }
    }

  async deleteItem(id: number):  Promise<{ statusCode: number; message: string }>{
    try{
    const existingItem = await this.itemRepository.findOne({where:[{id : id}]} )
    if(!existingItem){
      throw new NotFoundException("l'item sélectionné n'existe pas")
    } else{
      await this.itemRepository.delete({id:id})
      return {statusCode: HttpStatus.OK,message:"Item deleted successfuly"}
    }
    }catch(error){
      console.error('Erreur lors de la suppression d\'un item :', error);
      return null;
    }
  }

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


}