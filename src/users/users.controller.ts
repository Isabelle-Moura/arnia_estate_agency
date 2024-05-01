import {
  Controller,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Body,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/decorators/current-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersDoc } from '../docs/users/users.doc';
import { CreateUserDoc, UserCreatedDoc } from '../docs';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBody({ type: [UsersDoc] })
  @ApiResponse({ type: [UsersDoc] })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiBody({ type: CreateUserDoc })
  @ApiResponse({ type: UserCreatedDoc })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.usersService.update(+id, data);
  }

  @UseGuards(AuthGuard)
  @Post('/change-password')
  async changePassword(
    @CurrentUser() user: CurrentUserDto,
    @Body() updateHouseDto: UpdatePasswordDto,
  ) {
    return await this.usersService.changePassword(user.id, updateHouseDto);
  }
}
