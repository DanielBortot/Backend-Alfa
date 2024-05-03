import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostEntity } from './entities/post.entity';
import { ComentaryEntity } from './entities/comentary.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, ComentaryEntity]),
    PassportModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class PostModule {}
