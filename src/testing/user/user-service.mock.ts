import { UsersService } from '../../users/users.service';
import { userMock } from './user.mock';

export const userServiceMock = {
  provide: UsersService,
  useValue: {
    register: jest.fn().mockResolvedValue(userMock),
    getUserBy: jest.fn().mockResolvedValue(userMock),
  },
};
