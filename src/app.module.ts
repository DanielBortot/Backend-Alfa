import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { BlogController } from './controller/blog/blog.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    VideoModule,
    AuthModule,
    BlogModule
  ],
  controllers: [BlogController],
  providers: [],
})
export class AppModule {}
