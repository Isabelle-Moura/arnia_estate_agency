import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async doesEmailExists(email: string) {
    try {
      return await this.usersRepository.exists({ where: { email } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async register(payload: CreateUserDto) {
    try {
      const userExists = await this.doesEmailExists(payload.email);

      if (userExists) {
        throw new BadRequestException(
          'An user with this email already exists.',
        );
      }

      const newUser = this.usersRepository.create(payload);

      await this.usersRepository.save(newUser);

      return newUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getUserBy(email: string) {
    try {
      return this.usersRepository.findOne({
        where: { email },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException("User wasn't found.");
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, data: UpdateUserDto) {
    try {
      const user = await this.findOne(id);

      await this.usersRepository.update(user.id, data);

      return await this.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async changePassword(userId: number, body: UpdatePasswordDto) {
    try {
      const user = await this.findOne(userId);

      const comparedPassword = await bcrypt.compare(
        user.password,
        body.password,
      );

      if (!comparedPassword) {
        throw new UnauthorizedException();
      }

      user.password = await bcrypt.hash(body.newPassword, 10);
      await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
