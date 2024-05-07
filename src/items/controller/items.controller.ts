import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BaseItemDto } from '../dto/base-items.dto';
import { ItemsService } from '../service/items.service';
import { UpdateItemDto } from '../dto/update-item.dto';
import { CreateItemDto } from '../dto/create-item.dto';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';
import { Roles } from '../../auth/roles/roles.decorator';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { RoleGuard } from '../../auth/role/role.guard';
import { Role } from '../../auth/role/role.enum';

@ApiTags('Items')
@Controller('api/items')
export class ItemsController {
  constructor(private itemService: ItemsService) {
  }

  @ApiOperation({ summary: 'Get item(s) (with optional filters)' })
  @ApiOkResponse({ description: 'Success', type: [BaseItemDto] })
  @Roles(Role.User)
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async getItems(@Body() item?: Partial<BaseItemDto>): Promise<BaseItemDto[] | BaseItemDto | null> {
    return this.itemService.getItems(item);
  }

  @ApiOperation({ summary: 'Create item (with optional filters)' })
  @ApiOkResponse({ description: 'Success', type: [CreateItemDto] })
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBody({ type: CreateItemDto })
  @Post()
  async createItem(@Body() item: CreateItemDto): Promise<CreateItemDto | null | ConflictException> {
    return this.itemService.createItem(item);
  }

  @ApiOperation({ summary: 'Update item (with optional filters)' })
  @ApiOkResponse({ description: 'Success', type: [UpdateItemDto] })
  @ApiQuery({ name: 'id', type: 'number', required: true })
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiBody({ type: UpdateItemDto })
  @Patch(':id')
  async updateItem(@Param('id') id: number, @Body() newItem: Partial<UpdateItemDto>): Promise<UpdateItemDto | null> {
    return this.itemService.updateItem(id, newItem);
  }

  @ApiOperation({ summary: 'Delete item' })
  @ApiOkResponse({ description: 'Success' })
  @ApiQuery({ name: 'id', type: 'number', required: true })
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<{ statusCode: number; message: string }> {
    return this.itemService.deleteItem(id);
  }
}
