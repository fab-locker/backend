import { Controller, Get, Post,Param, Body, Patch, Delete} from "@nestjs/common";
import { BaseItemDto } from "../dto/base-items.dto";
import { ItemsService } from "../service/items.service";
import { UpdateItemDto } from "../dto/update-item.dto";
import { CreateItemDto } from "../dto/create-item.dto";
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('Items')
@Controller('api/items')
export class ItemsController{
    constructor(private itemService: ItemsService){
    }


    @ApiOperation({ summary: 'Get item(s) (with optional filters)' })
    @ApiOkResponse({ description: 'Success', type: [BaseItemDto] })
    @Get()
    async getItems(@Body() item?: Partial<BaseItemDto>): Promise<BaseItemDto[] | BaseItemDto | null> {
        return this.itemService.getItems(item);
      }


    @ApiOperation({ summary: 'Create item (with optional filters)' })
    @ApiOkResponse({ description: 'Success', type: [CreateItemDto] })
    @Post('create')
    async createItem(@Body() item: CreateItemDto): Promise<CreateItemDto | null>{
      return this.itemService.createItem(item)
    }


    @ApiOperation({ summary: 'Update item (with optional filters)' })
    @ApiOkResponse({ description: 'Success', type: [UpdateItemDto] })
    @ApiQuery({ name: 'id', type: 'number', required: true })
    @Patch('update/:id')
    async updateItem(@Param('id') id:number, @Body() newItem: Partial<UpdateItemDto>): Promise<UpdateItemDto | null>{
      return this.itemService.updateItem(id,newItem)
    }

    @ApiOperation({ summary: 'Delete item' })
    @ApiOkResponse({ description: 'Success' })
    @ApiQuery({ name: 'id', type: 'number', required: true })
    @Delete('delete/:id')
    async deleteItem(@Param('id') id:number): Promise<{ statusCode: number; message: string }>{
     return this.itemService.deleteItem(id)
    }

}
