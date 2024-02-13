import { Controller, Get, Post,Param} from "@nestjs/common";
import { ItemDto } from "../dto/items.dto";
import { ItemsService } from "../service/items.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('api/items')
export class ItemsController{
    constructor(private itemService: ItemsService){
    }

    @Post('create')
    createItem(): string{
        return 'je crée un objet'
    }


    @Get('getMultiple/:fieldName/:value')
    getItems(@Param('fieldName') fieldName: string,@Param('value') value: string): Promise<ItemDto[]>{
        return this.itemService.getAll(fieldName, value);
    }

    @Get('getOne/:fieldName/:value')
    getOneItem(@Param('fieldName') fieldName: string, @Param('value') value: any): Promise<ItemDto> {
        console.log(fieldName, value)
      return this.itemService.getOne(fieldName, value);
    }
    // @Post('update')
    // updateItems(fieldName: string, value: any, newValue: any): Promise<void>{
        
    // }

}
