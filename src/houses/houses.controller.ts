import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Controller('houses')
export class HousesController {
  constructor(private housesService: HousesService) {}}
