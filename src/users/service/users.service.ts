import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UsersEntity} from "../entity/users.entity";
import {UsersDto} from "../dto/users.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>
    ) {
    }


    findAll(): Promise<UsersDto[]> {
        return this.usersRepository.find();
    }

    async findOne(fieldName: string, value: any): Promise<UsersEntity> {

        let entity: UsersEntity | PromiseLike<UsersEntity>;

        if (fieldName === 'id_rfid') {
            const entity = await this.usersRepository.findOne({where: {id_rfid: value}});
        } else if (fieldName === 'mail_junia') {
            const entity = await this.usersRepository.findOne({where: {mail_junia: value}});
        }

        if (!entity) {
            throw new NotFoundException(`No record found with ${fieldName}=${value}`);
        }

        return entity;
    }

    create(user: UsersDto): Promise<UsersDto> {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!emailRegex.test(user.mail_junia)) {
            throw new Error("Invalid email address");
        }
        return this.usersRepository.save(user);
    }

    delete(user: UsersDto): Promise<UsersDto> {
        return this.usersRepository.remove(user);
    }
}
