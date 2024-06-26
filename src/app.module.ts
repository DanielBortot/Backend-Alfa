import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/infrastructure/post.module';
import { CourseModule } from './course/infrastructure/course.module';
import { NotifyModule } from './notify/notify.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    PostModule,
    CourseModule,
    CategoryModule,
    VideoModule,
    AuthModule,
    NotifyModule,
    BlogModule,
    ImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
