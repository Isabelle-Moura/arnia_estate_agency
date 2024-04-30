import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {
  jwtServiceMock,
  userServiceMock,
  userMock,
  loginMock,
  tokenMock,
} from '../testing';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, userServiceMock, jwtServiceMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Should be defined.', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('Should register a new user.', async () => {
      const newUser = await authService.register(userMock);

      expect(newUser).toHaveProperty('id');
    });
  });

  describe('login', () => {
    it('Should return an auth token.', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const authToken = await authService.login(loginMock);

      expect(authToken).toHaveProperty('token');
      expect(typeof authToken.token).toBe('string');
      expect(authToken.token).toEqual(tokenMock);
    });
  });
});
