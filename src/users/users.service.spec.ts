import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userRepositoryMock, usersMock } from '../testing';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('Should be defined.', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return a list of users.', async () => {
      expect(await service.findAll()).toEqual(usersMock);
    });
  });

  describe('findOne', () => {
    it('Should return a user.', async () => {
      expect(await service.findOne(1)).toEqual(usersMock[0]);
    });
  });
});
