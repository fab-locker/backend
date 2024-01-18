import {Test, TestingModule} from '@nestjs/testing';
import {LockersController} from './lockers.controller';
import {LockersService} from "../service/lockers.service";
import {LockerDto} from '../dto/locker.dto';

// Créez une classe mock pour le service
class LockersServiceMock {
    findAll(): Promise<LockerDto[]> {
        return Promise.resolve([]);
    }

    createLocker(locker: LockerDto): Promise<LockerDto> {
        return Promise.resolve(locker);
    }
}

describe('LockersController', () => {
    let controller: LockersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LockersController],
            providers: [
                {
                    provide: LockersService,
                    useClass: LockersServiceMock, // Utilisez la classe mock pour le service
                },
            ],
        }).compile();

        controller = module.get<LockersController>(LockersController);
    });

    describe('getAllLockers', () => {
        it('should return an array of lockers', async () => {
            const result: LockerDto[] = await controller.getAllLockers();
            expect(result).toEqual([]);
        });
    });

    describe('create', () => {
        it('should create a new locker', async () => {
            const newLocker: LockerDto = {id: 1, id_objet: 2};
            const result: LockerDto = await controller.create(newLocker);
            expect(result).toEqual(newLocker);
        });
    });
});
