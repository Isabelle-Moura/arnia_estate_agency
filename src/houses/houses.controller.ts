import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';

@Controller('houses')
export class HousesController {
  constructor(private housesService: HousesService) {}

  @Post()
  async create(@Body() data: CreateHouseDto) {
    return await this.housesService.create(data);
  }

  @Get()
  async findAll() {
    return await this.housesService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: number) {
    return await this.housesService.findOne(+id);
  }
}
