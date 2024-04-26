import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
import { CreateUsersDto } from '../dto/create-users.dto';
import { UsersService } from '../service/users.service';
import { UsersDto } from '../dto/users.dto';
import { UpdateUsersDto } from '../dto/update-user.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get users (with optional filters)' })
  @ApiOkResponse({ description: 'Success', type: [UsersDto] })
  @ApiQuery({ name: 'id_rfid', type: 'string', required: false })
  @ApiQuery({ name: 'mail', type: 'string', required: false })
  @Get()
  getUsers(@Query('id_rfid') id?: string, @Query('mail') mail?: string) {
    if (id) {
      return this.usersService.findOne('id_rfid', parseInt(id.toString()));
    } else if (mail) {
      return this.usersService.findOne('mail_junia', mail);
    } else {
      return this.usersService.findAll();
    }
  }

  @ApiOperation({ summary: 'Create an user' })
  @ApiCreatedResponse({ description: 'User created', type: UsersDto })
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
  async create(@Body() user: CreateUsersDto): Promise<UsersDto> {
    return this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Update an user' })
  @ApiOkResponse({ description: 'User updated', type: UsersDto })
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
  @ApiParam({ name: 'rfid', type: 'string' })
  @Patch(':rfid')
  async updateUser(
    @Param('rfid') rfid: string,
    @Body() user: Partial<UpdateUsersDto>,
  ): Promise<UsersDto> {
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
  @ApiParam({ name: 'rfid', type: 'string' })
  @Delete(':rfid')
  async deleteUser(
    @Param('rfid') rfid: string,
  ): Promise<{ statusCode: number; message: string }> {
    return this.usersService.delete(rfid);
  }
}
