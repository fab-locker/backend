import { Controller, Get, Post,Param, Body, Patch, Delete} from "@nestjs/common";
import { BaseItemDto } from "../dto/base-items.dto";
import { ItemsService } from "../service/items.service";
import { ApiTags } from "@nestjs/swagger";
import { UpdateItemDto } from "../dto/update-item-dto";

@Controller('api/items')
export class ItemsController{
    constructor(private itemService: ItemsService){
    }

    // @Post('create')
    // createItem(): string{
    //     return 'je crée un objet'
    // }

    @Get()
    async getAllItems(@Body() item: BaseItemDto): Promise<BaseItemDto[] | null> {
        // Sinon, continuer le traitement normalement
        return this.itemService.getAllItems(item);
      }

    @Get('getOne')
    async getOneItem(@Param('fieldName') fieldName: string, @Param('value') value: any): Promise<BaseItemDto> {
        console.log(fieldName, value)
      return this.itemService.getOne(fieldName, value);
    }
    // @Post('update')
    // updateItems(fieldName: string, value: any, newValue: any): Promise<void>{
    
    @Post('create')
    async createItem(@Body() item: BaseItemDto): Promise<BaseItemDto | null>{
      return this.itemService.createItem(item)
    }

    @Patch('update/:id')
    async updateItem(@Param('id') id:number, @Body() newItem: Partial<UpdateItemDto>): Promise<UpdateItemDto | null>{
      return this.itemService.updateItem(id,newItem)
    }

    @Delete('delete/:id')
    async deleteItem(@Param('id') id:number): Promise<void>{
     await this.itemService.deleteItem(id)
    }
    
    
    // }

}
