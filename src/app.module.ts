import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    VideoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
