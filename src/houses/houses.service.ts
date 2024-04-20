import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from '../database/entities';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private housesRepository: Repository<House>,
  ) {}

  async create(data: CreateHouseDto) {
    try {
      const newHouse = this.housesRepository.create(data);

      await this.housesRepository.save(newHouse);

      return newHouse;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.housesRepository.find();
    } catch (error) {
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
      throw new HttpException(error.message, error.status);
    }
  }
}
