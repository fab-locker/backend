import {Test, TestingModule} from '@nestjs/testing';
import {LockersController} from './lockers.controller';
import {LockerDto} from '../dto/locker.dto';
import {LockersService} from "../service/lockers.service";

describe('LockersController', () => {
    let lockersController: LockersController;

    beforeEach(async () => {
        const lockersModule: TestingModule = await Test.createTestingModule({
            controllers: [LockersController],
            providers: [LockersService],
        }).compile();

        lockersController = lockersModule.get<LockersController>(LockersController);
    });

    describe('getAllLockers', () => {
        it('should return an array of lockers', async () => {
            const result: LockerDto[] = await lockersController.getAllLockers();
            expect(result).toEqual([]);
        });
    });

    describe('create', () => {
        it('should create a new locker', async () => {
            const newLocker: LockerDto = {id: 1, id_objet: 2};
            const result: LockerDto = await LockersController.call('create', newLocker);
            expect(result).toEqual(newLocker);
        });
    });
});
