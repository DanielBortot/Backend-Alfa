/* eslint-disable prettier/prettier */
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ConfigModule,AuthModule],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
