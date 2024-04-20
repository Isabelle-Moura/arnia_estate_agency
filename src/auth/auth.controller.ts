import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() payload: CreateUserDto) {
    return await this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: AuthLoginDto) {
    return await this.authService.login(payload);
  }
}
