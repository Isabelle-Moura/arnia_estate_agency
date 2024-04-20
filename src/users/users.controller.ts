import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: number) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param() id: number, @Body() data: UpdateUserDto) {
    return await this.usersService.update(+id, data);
  }
}
