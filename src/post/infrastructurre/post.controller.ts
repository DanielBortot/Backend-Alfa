import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from '../application/post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
    private postService: PostService;











//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   register(@Body() createAuthDto: CreateUserDto) {
//     return this.authService.registerUser(createAuthDto);
//   }

//   @Post('login')
//   login(@Body() loginAuthDto: LoginUserDto) {
//     return this.authService.loginUser(loginAuthDto);
  }

