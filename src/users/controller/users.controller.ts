import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUsersDto, UpdateUsersDto } from '../dto/createUsers.dto';
import { UsersService } from '../service/users.service';
import { DeleteResult } from 'typeorm';
import { AccessTokenPayload } from '../../auth/types/AccessTokenPayload';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({ summary: 'Get users (with optional filters)' })
  @ApiOkResponse({ description: 'Success' })
  @ApiQuery({ name: 'id_rfid', type: 'number', required: false })
  @ApiQuery({ name: 'email', type: 'string', required: false })
  @Get()
  getUsers(@Request() req, @Query('id_rfid') id?: number, @Query('email') email?: string) {
    const accessTokenPayload: AccessTokenPayload =
      req.user as AccessTokenPayload;
    if (id) {
      return this.usersService.findOneByRfid(id);
    } else if (email) {
      return this.usersService.findOneByEmail(email);
    } else {
      return this.usersService.findAll();
    }
  }

  @ApiOperation({ summary: 'Create an user' })
  @ApiCreatedResponse({ description: 'User created' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'An user with this rfid already exists.',
        },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  @ApiBody({ type: CreateUsersDto })
  @Post()
  async create(@Body() user: CreateUsersDto) {
    return this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Update an user' })
  @ApiOkResponse({ description: 'User updated' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'An user with this rfid already exists.',
        },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  @ApiBody({ type: UpdateUsersDto })
  @ApiParam({ name: 'rfid', type: 'number' })
  @Patch(':rfid')
  async updateUser(
    @Param('rfid') rfid: number,
    @Body() user: Partial<UpdateUsersDto>,
  ) {
    return this.usersService.update(rfid, user);
  }

  @ApiOperation({ summary: 'Delete an user' })
  @ApiOkResponse({
    description: 'User deleted successfully',
    schema: {
      properties: {
        statusCode: { type: 'number', example: HttpStatus.OK },
        message: { type: 'string', example: 'User deleted successfully' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
    schema: {
      properties: {
        statusCode: { type: 'number', example: HttpStatus.NOT_FOUND },
        message: { type: 'string', example: 'User not found' },
      },
    },
  })
  @ApiParam({ name: 'rfid', type: 'number' })
  @Delete(':rfid')
  async deleteUser(
    @Param('rfid') rfid: number,
  ): Promise<DeleteResult> {
    return this.usersService.delete(rfid);
  }
}
