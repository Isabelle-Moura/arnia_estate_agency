import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    try {
      return await this.usersService.register(data);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async login(payload: AuthLoginDto) {
    try {
      const user = await this.usersService.getUserBy(payload.email);

      const comparePasswords = await bcrypt.compare(
        user.password,
        payload.password,
      );

      if (!user || !comparePasswords) {
        throw new UnauthorizedException('E-mail or password wrong. Try again.');
      }

      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      return { token: this.jwtService.sign(tokenPayload) };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
