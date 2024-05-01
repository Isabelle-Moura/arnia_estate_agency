import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../database/entities';
import { usersMock } from './users-list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    find: jest.fn().mockResolvedValue(usersMock),
    findOne: jest.fn().mockResolvedValue(usersMock[0]),
  },
};
