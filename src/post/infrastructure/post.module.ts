import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsEntity } from './entities/posts.entity';
import { ComentaryEntity } from './entities/comentary.entity';
import { PostController } from './post.controller';
import { TagEntity } from './entities/tag.entity';
import { PostTagEntity } from './entities/post_tag.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([PostsEntity, ComentaryEntity, TagEntity, PostTagEntity]),
    PassportModule,
    ConfigModule,
  ],
  controllers: [PostController],
  providers: [],
})
export class PostModule {}
