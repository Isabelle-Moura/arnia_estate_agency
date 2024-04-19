import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async isEmailExists(email: string) {
    try {
      return await this.usersRepository.exists({ where: { email } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async register(payload: CreateUserDto) {
    try {
      const userExists = await this.isEmailExists(payload.email);

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
}
