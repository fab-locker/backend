import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsersEntity} from "../entity/users.entity";
import {CreateUsersDto} from "../dto/create-users.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>
    ) {
    }


    findAll(): Promise<UsersEntity[]> {
        return this.usersRepository.find();
    }

    async findOne(fieldName: string, value: any): Promise<UsersEntity> {

        let entity: UsersEntity | PromiseLike<UsersEntity>;

        if (fieldName === 'id_rfid') {
            if (typeof value !== 'number') throw new NotFoundException("Invalid RFID");
            entity = await this.usersRepository.findOne({where: {id_rfid: value}});
        } else if (fieldName === 'mail_junia') {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (typeof value !== 'string' || !emailRegex.test(value)) {
                throw new NotFoundException("Invalid email address");
            }
            entity = await this.usersRepository.findOne({where: {mail_junia: value.toString()}});
        }

        if (!entity) {
            throw new NotFoundException(`No user found with ${value} as ${fieldName}`);
        }

        return entity;
    }

    async create(user: CreateUsersDto): Promise<CreateUsersDto> {
        return this.usersRepository.save(user);
    }

    delete(user: CreateUsersDto): Promise<CreateUsersDto> {
        return this.usersRepository.remove(user);
    }
}
