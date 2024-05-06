/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { sendEmailDto } from './sendEmail.dto';
import Mail from 'nodemailer/lib/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class MailerService {

constructor(private readonly configService: ConfigService){
   
}

    mailTransport(){
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('EMAIL_HOST'),
            port: this.configService.get<number>('EMAIL_PORT'),
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: this.configService.get<string>('EMAIL_USERNAME') ,
              pass: this.configService.get<string>('EMAIL_PASSWORD'),
            },
          });

        return transporter;
    }

    async sendEmail(dto: sendEmailDto){
        const{from, recipients, subject, html, placeholderReplacements} = dto;

        const transport = this.mailTransport();
        const options : Mail.Options={
            from: from ?? {
              name: this.configService.get<string>('APP_NAME') ,
              address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
            },
            to:recipients,
            subject,
            html
        }
        try {
            const result = await transport.sendMail(options)
        } catch (error) {
            console.log('Error:', error);
        }
    }

}
