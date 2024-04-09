import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsersDto } from '../dto/createUsers.dto';

describe('UsersController', () => {
  let usersService: UsersService;
  let usersController: UsersController;

  const mockUser = {
    rfid: 123456,
    email: 'test@mail.com',
    password: 'test',
    admin: false,
  };

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValueOnce([mockUser]),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      const result = await usersController.getUsers();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const newUser = {
        rfid: 36,
        email: 'test36@mail.com',
        password: 'test',
        admin: false,
      };

      mockUsersService.create = jest.fn().mockResolvedValueOnce(mockUser);

      const result = await usersController.create(newUser as CreateUsersDto);

      expect(usersService.create).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });
});
