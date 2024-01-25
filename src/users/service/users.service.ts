import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entity/users.entity';
import { CreateUsersDto } from '../dto/create-users.dto';
import { UsersDto } from '../dto/users.dto';
import { UpdateUsersDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  /**
   * Check if a user exists with the same mail or rfid
   * @param user
   * @returns {Promise<boolean>}
   */
  async doUserExists(user: Partial<UsersDto>): Promise<boolean> {
    let existingUser: UsersDto;

    // If the mail or rfid is passed in the body, it means it is a creation or an update of mail or rfid, so we need to check if the user exists
    // Otherwise, it means it is exclusively an update of role or password, so no need to check if the user exists
    if (user.mail || user.rfid) {
      existingUser = await this.usersRepository.findOne({
        where: [{ mail: user.mail }, { rfid: user.rfid }],
      });
      if (existingUser) {
        let field: string;
        if (existingUser.mail === user.mail) {
          field = 'e-mail';
        } else {
          field = 'badge';
        }
        throw new BadRequestException(
          `Un utilisateur avec le même ${field} existe déjà.`,
        );
      }
    } else {
      return false;
    }
  }

  /**
   * Find all users
   * @returns {Promise<UsersDto[]>}
   */
  findAll(): Promise<UsersDto[]> {
    return this.usersRepository.find({
      select: ['rfid', 'mail', 'admin'],
    });
  }

  /**
   * Find one user by a field
   * @param {string} fieldName
   * @param value
   * @returns {Promise<UsersDto>}
   */
  async findOne(fieldName: string, value: any): Promise<UsersDto> {
    let entity: UsersDto | PromiseLike<UsersDto>;

    if (fieldName === 'id_rfid') {
      if (typeof value !== 'number')
        throw new BadRequestException('Invalid RFID');
      entity = await this.usersRepository.findOne({
        where: { rfid: value },
      });
    } else if (fieldName === 'mail_junia') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (typeof value !== 'string' || !emailRegex.test(value)) {
        throw new BadRequestException('Invalid email address');
      }
      entity = await this.usersRepository.findOne({
        where: { mail: value.toString() },
      });
    }
    if (!entity) {
      throw new NotFoundException(
        `No user found with ${value} as ${fieldName}`,
      );
    }
    return entity;
  }

  /**
   * Create a user
   * @param {CreateUsersDto} user
   * @returns {Promise<UsersDto>}
   */
  async create(user: CreateUsersDto): Promise<UsersDto> {
    await this.doUserExists(user);
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return {
      rfid: newUser.rfid,
      mail: newUser.mail,
      admin: newUser.admin,
    };
  }

  /**
   * Update a user
   * @param {number} rfid
   * @param {Partial<UpdateUsersDto>} user
   * @returns {Promise<UsersDto>}
   */
  async update(rfid: number, user: Partial<UpdateUsersDto>): Promise<UsersDto> {
    await this.doUserExists(user);
    await this.usersRepository.update({ rfid: rfid }, user);
    const userUpdated = await this.usersRepository.findOne({
      where: { rfid: rfid },
    });
    return {
      rfid: userUpdated.rfid,
      mail: userUpdated.mail,
      admin: userUpdated.admin,
    };
  }

  /**
   * Delete a user
   * @param {number} rfid
   * @returns {Promise<unknown>}
   */
  async delete(rfid: number): Promise<{ statusCode: number; message: string }> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ rfid: rfid }],
    });
    if (!existingUser) {
      throw new NotFoundException(`No user found with rfid ${rfid}`);
    }
    await this.usersRepository.delete({ rfid: rfid });
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
