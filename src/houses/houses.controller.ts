import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../utils/user-role.enum';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CurrentUserDto } from '../decorators/current-user.dto';
import { UpdateHouseDto } from './dto/update-house.dto';

@Controller('houses')
export class HousesController {
  constructor(private housesService: HousesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles([UserRole.SELLER])
  //@RolesGuard(Role.seller)
  @Post()
  async create(@Body() data: CreateHouseDto) {
    return await this.housesService.create(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles([UserRole.BUYER])
  @Post(':id/buy')
  async buyHouse(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserDto,
  ) {
    return await this.housesService.buyHouse(id, user.id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHouseDto: UpdateHouseDto,
  ) {
    return await this.housesService.update(id, updateHouseDto);
  }

  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.housesService.restore(id);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.housesService.softDelete(id);
  }

  @Get()
  async findAll() {
    return await this.housesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.housesService.findOne(+id);
  }
}
