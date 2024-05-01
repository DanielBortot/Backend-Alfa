import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, UpdateAuthDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.registerUser(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginUserDto) {
    return this.authService.loginUser(loginAuthDto);
  }
}
