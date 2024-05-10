import { LockersController } from './lockers.controller';
import { LockersService } from '../service/lockers.service';
import { Test, TestingModule } from '@nestjs/testing';
import { LockerDto } from '../dto/locker.dto';

describe('LockersController', () => {
  let lockersService: LockersService;
  let lockersController: LockersController;

  const mockLocker = {
    id: 1,
  };

  const mockLockersService = {
    findAll: jest.fn().mockResolvedValueOnce([mockLocker]),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LockersController],
      providers: [
        {
          provide: LockersService,
          useValue: mockLockersService,
        },
      ],
    }).compile();

    lockersService = module.get<LockersService>(LockersService);
    lockersController = module.get<LockersController>(LockersController);
  });

  it('should be defined', () => {
    expect(lockersController).toBeDefined();
  });

  describe('getAllLockers', () => {
    it('should get all lockers', async () => {
      const result = await lockersController.getAllLockers();
    });
  });

  describe('createLocker', () => {
    it('should create a locker', async () => {
      const newLocker = {
        id: 36,
      };

      mockLockersService.create = jest
        .fn()
        .mockResolvedValueOnce(mockLocker);

      const result = await lockersController.create(newLocker as LockerDto);

      expect(lockersService.create).toHaveBeenCalled();
      expect(result).toEqual(mockLocker);
    });
  });
});
