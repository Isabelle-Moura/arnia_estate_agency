import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from '../database/entities';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { UsersService } from '../users/users.service';
import { UpdateHouseDto } from './dto/update-house.dto';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private housesRepository: Repository<House>,
    private usersService: UsersService,
  ) {}

  async create(data: CreateHouseDto) {
    try {
      const newHouse = this.housesRepository.create(data);

      await this.housesRepository.save(newHouse);

      return newHouse;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, data: UpdateHouseDto) {
    try {
      const houseToUpdate = await this.findOne(id);

      await this.housesRepository.update(houseToUpdate.id, data);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async softDelete(id: number) {
    try {
      await this.findOne(id);

      await this.housesRepository.softDelete(id);

      return { response: 'House deleted successfully.' };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async restore(id: number) {
    try {
      await this.housesRepository.restore(id);

      return { message: 'House restored successfully.' };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.housesRepository.find();
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const house = await this.housesRepository.findOne({ where: { id } });

      if (!house) {
        throw new NotFoundException("House wasn't found.");
      }

      return house;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async buyHouse(id: number, userId: number) {
    try {
      const house = await this.findOne(id);

      if (!house.seller) {
        throw new BadRequestException('This house is not for sell.');
      }

      const user = await this.usersService.findOne(userId);

      house.owner = user;
      house.seller = null;

      return house;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
