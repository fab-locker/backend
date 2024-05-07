import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BorrowService } from '../service/borrow.service';
import { BorrowEntity } from '../entity/borrow.entity';
import { ItemsService } from '../../items/service/items.service';
import { UsersService } from '../../users/service/users.service';
import { ItemEntity } from '../../items/entity/items.entity';
import { Roles } from '../../auth/roles/roles.decorator';
import { Role } from '../../auth/role/role.enum';
import { RoleGuard } from '../../auth/role/role.guard';
import { JwtGuard } from '../../auth/guards/jwt.guard';

@ApiTags('Borrows')
@Controller('api/borrows')
export class BorrowController {
  constructor(
    private readonly borrowService: BorrowService,
    private readonly itemService: ItemsService,
    private readonly userService: UsersService,
  ) {
  }

  @ApiOperation({ summary: 'Get all borrows' })
  @ApiOkResponse({ description: 'List of all borrows found successfully.', type: [BorrowEntity] })
  @Roles(Role.User)
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async getBorrows() {
    return this.borrowService.getBorrows();
  }

  @ApiOperation({ summary: 'Get borrow by ID' })
  @ApiOkResponse({ description: 'Borrow found successfully.', type: BorrowEntity })
  @ApiNotFoundResponse({ description: 'Borrow with specified ID not found.' })
  @ApiParam({ name: 'id', description: 'ID of the borrow to fetch', type: 'number' })
  @Roles(Role.User)
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  async getBorrow(@Param('id') id: number) {
    return this.borrowService.getBorrow(id);
  }

  @ApiOperation({ summary: 'Create a new borrow' })
  @ApiConflictResponse({ description: 'The item is not available or an error occurred.' })
  @ApiOkResponse({ description: 'New borrow created successfully.', type: BorrowEntity })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userRfid: { type: 'number', example: 12345678913 },
        itemId: { type: 'number', example: 1 },
      },
    },
  })
  @Roles(Role.User)
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async createBorrow(
    @Body('userRfid') userRfid: number,
    @Body('itemId') itemId: number,
  ) {
    const item = await this.itemService.getItems({ id: itemId }) as ItemEntity;
    const user = await this.userService.findOneByRfid(userRfid);
    const newBorrow = await this.borrowService.createBorrow(user, item);
    await this.itemService.updateItem(item.id, { availability: false });
    return newBorrow;
  }

  @ApiOperation({ summary: 'Return borrow by ID' })
  @ApiOkResponse({ description: 'Borrow returned successfully.', type: BorrowEntity })
  @ApiNotFoundResponse({ description: 'Borrow with specified ID not found.' })
  @ApiParam({ name: 'id', description: 'ID of the borrow to return', type: 'number' })
  @Roles(Role.User)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id/return')
  async returnBorrow(@Param('id') id: number) {
    const borrow = await this.borrowService.returnBorrow(id);
    await this.itemService.updateItem(id, { availability: true });
    return borrow;
  }

  @ApiOperation({ summary: 'Update borrow by ID' })
  @ApiOkResponse({ description: 'Borrow updated successfully.', type: BorrowEntity })
  @ApiNotFoundResponse({ description: 'Borrow with specified ID not found.' })
  @ApiParam({ name: 'id', description: 'ID of the borrow to update', type: 'number' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        item: {
          type: 'object',
          properties: {
            locker: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
              },
            },
            name: { type: 'string', example: 'Nom de l\'article' },
            description: { type: 'string', example: 'Description de l\'article' }, // nullable: true
            availability: { type: 'boolean', example: true },
            weight: { type: 'number', example: 5 },
            borrow_duration: { type: 'number', example: 7 },
          },
        },
        user: {
          type: 'object',
          properties: {
            rfid: { type: 'number', example: 12345678913 },
            role: { type: 'string', example: 'user' },
            email: { type: 'string', example: 'example@email.com' },
          },
        },
        startDate: { type: 'string', format: 'date-time', example: '2024-05-01T12:00:00' },
        endDate: { type: 'string', format: 'date-time', example: '2024-05-08T12:00:00' },
        returnDate: { type: 'string', format: 'date-time', example: '2024-05-15T12:00:00' }, // nullable: true
      },
    },
  })
  @Roles(Role.User)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id')
  async updateBorrow(
    @Param('id') id: number,
    @Body() borrow: BorrowEntity,
  ) {
    return this.borrowService.updateBorrow(id, borrow);
  }

  @ApiOperation({ summary: 'Update borrow end date by ID' })
  @ApiOkResponse({ description: 'Borrow end date updated successfully.', type: BorrowEntity })
  @ApiNotFoundResponse({ description: 'Borrow with specified ID not found.' })
  @ApiParam({ name: 'id', description: 'ID of the borrow to update', type: 'number' })
  @ApiBody({
    schema: {
      type: 'string',
      format: 'date-time',
      example: { 'endDate': '2024-05-08T12:00:00' },
    },
  })
  @Roles(Role.User)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id/endDate')
  async updateEndDate(
    @Param('id') id: number,
    @Body('endDate') endDate: Date,
  ) {
    return this.borrowService.updateEndDate(id, endDate);
  }
}
