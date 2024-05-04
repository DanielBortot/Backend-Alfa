import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';

@Module({
  imports: [ConfigModule /*TypeOrmModule.forFeature([Video])*/],
  controllers: [BlogController],
  providers: [],
})
export class BlogModule {}
