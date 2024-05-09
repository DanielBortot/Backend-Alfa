import { Module } from '@nestjs/common';
import { ImageController } from './infrastructure/controller/image.controller';
import { ImageService } from './application/services/image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './domain/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image])
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService]
})
export class ImageModule {}
