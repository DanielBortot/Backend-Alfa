/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Body, Put, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { sendEmailDto } from './dto/sendEmail.dto';
import { mailDto } from './dto/mail.dto';
import { ValidateCodeDto } from './dto/validateCode.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

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

  @Post('/send-email')
  async sendMail(@Body() mailDto: mailDto){
    const { email } = mailDto;
    const verificationCode = Math.floor(Math.random() * 9000) + 1000;
    const dto: sendEmailDto = {
      from: {name: 'SuportApp', address: 'yogaApp@example.com'},
      recipients: [{name: 'User', address: email}],
      subject: 'verification Code',
      html:`<p>Tu código de verificación es: <strong>${verificationCode}</strong></p>`
    }
    return await this.authService.sendEmail(dto,mailDto,verificationCode);
  }

  @Post('/validate-Code')
  async validateCode(@Body() validateCodeDto: ValidateCodeDto){

    return this.authService.validateCode(validateCodeDto)
  }

  @Patch('/changePassword')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto){

    return this.authService.changePassword(changePasswordDto)
  }

}
