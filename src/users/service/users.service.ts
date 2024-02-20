import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entity/users.entity';
import { CreateUsersDto } from '../dto/createUsers.dto';
import { GetUsersDto } from '../dto/getUsersDto';
import { UpdateUsersDto } from '../dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {
  }

  /**
   * Check if a user exists with the same mail or rfid
   * @param user
   * @returns {Promise<boolean>}
   */
  async doUserExists(user: Partial<GetUsersDto>): Promise<boolean> {
    let existingUser: GetUsersDto;

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
   * @returns {Promise<GetUsersDto[]>}
   */
  findAll(): Promise<GetUsersDto[]> {
    return this.usersRepository.find({
      select: ['rfid', 'mail', 'admin'],
    });
  }

  /**
   * Find one user by a field
   * @param {string} fieldName
   * @param value
   * @returns {Promise<GetUsersDto>}
   */
  async findOne(fieldName: string, value: any): Promise<GetUsersDto> {
    let entity: GetUsersDto | PromiseLike<GetUsersDto>;

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
   * @returns {Promise<GetUsersDto>}
   */
  async create(user: CreateUsersDto): Promise<GetUsersDto> {
    await this.doUserExists(user);
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    const { password, ...result } = newUser;
    return newUser;
  }

  /**
   * Update a user
   * @param {number} rfid
   * @param {Partial<UpdateUsersDto>} user
   * @returns {Promise<GetUsersDto>}
   */
  async update(rfid: number, user: Partial<UpdateUsersDto>): Promise<GetUsersDto> {
    await this.doUserExists(user);
    await this.usersRepository.update({ rfid: rfid }, user);
    const userUpdated = await this.usersRepository.findOne({
      where: { rfid: rfid },
    });
    const { password, ...result } = userUpdated;
    return userUpdated;
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
