import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/infrastructure/post.module';
import { CourseModule } from './course/course.module';
import { NotifyModule } from './notify/notify.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    PostModule,
    CourseModule,
    CategoryModule,
    VideoModule,
    AuthModule,
    NotifyModule,
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
