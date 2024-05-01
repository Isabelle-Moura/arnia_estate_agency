import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  UserCreatedDoc,
  CreateUserDoc,
  LoginDoc,
  LoginResponseDoc,
} from '../docs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDoc })
  @ApiResponse({ type: UserCreatedDoc })
  @Post('register')
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }

  @ApiBody({
    type: LoginDoc,
  })
  @ApiResponse({
    type: LoginResponseDoc,
  })
  @Post('login')
  async login(@Body() payload: AuthLoginDto) {
    return await this.authService.login(payload);
  }
}
