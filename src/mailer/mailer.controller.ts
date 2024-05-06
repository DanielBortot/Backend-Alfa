/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import {sendEmailDto} from './sendEmail.dto'

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('/send-email')
  async sendMail(){
    const dto: sendEmailDto = {
      from: {name: 'SuportYogaApp', address: 'yogaApp@example.com'},
      recipients: [{name: 'John Doe', address: 'john@example.com'}],
      subject: 'verification Code',
      html: '<p> hi user, your verification code is 12345</p>'
    }
    return await this.mailerService.sendEmail(dto);
  }
}
