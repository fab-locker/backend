import {Test, TestingModule} from '@nestjs/testing';
import {LockersService} from './lockers.service';
import {LockerDto} from '../dto/locker.dto';
import {LockerEntity} from '../entity/locker.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

class LockerRepositoryMock {
    find(): Promise<LockerEntity[]> {
        return Promise.resolve([]);
    }

    findOne(id: number): Promise<LockerEntity | undefined> {
        return Promise.resolve(undefined);
    }

    save(locker: LockerDto): Promise<LockerDto> {
        return Promise.resolve(locker);
    }
}

describe('LockersService', () => {
    let service: LockersService;
    let repository: Repository<LockerEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LockersService,
                {
                    provide: getRepositoryToken(LockerEntity),
                    useClass: LockerRepositoryMock,
                },
            ],
        }).compile();

        service = module.get<LockersService>(LockersService);
        repository = module.get<Repository<LockerEntity>>(
            getRepositoryToken(LockerEntity),
        );
    });

    describe('findAll', () => {
        it('should return an array of lockers', async () => {
            jest
                .spyOn(repository, 'find')
                .mockImplementation(() => Promise.resolve([]));

            const result: LockerDto[] = await service.findAll();
            expect(result).toEqual([]);
        });
    });

    describe('findOne', () => {
        it('should return a single locker by ID', async () => {
            const lockerId = 1;
            const mockLocker: LockerEntity = {id: lockerId};
            jest
                .spyOn(repository, 'findOne')
                .mockImplementation(() => Promise.resolve(mockLocker));

            const result: LockerDto = await service.findOne(lockerId);
            expect(result).toEqual(mockLocker);
        });
    });

    describe('createLocker', () => {
        it('should create a new locker', async () => {
            const newLockerData: LockerDto = {id: 1};
            jest
                .spyOn(repository, 'save')
                .mockImplementation(() => Promise.resolve(newLockerData));

            const result: LockerDto = await service.create(newLockerData);
            expect(result).toEqual(newLockerData);
        });
    });
});
