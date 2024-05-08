import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/image/domain/image.entity';
import { Repository } from 'typeorm';
import { ImageCloudinaryService } from './image.cloudinaryService';

@Injectable()
export class ImageService {
  private readonly images: Repository<Image>;
  private readonly cloudinary: ImageCloudinaryService;

  constructor(@InjectRepository(Image) images: Repository<Image>) {
    this.images = images;
    this.cloudinary = new ImageCloudinaryService();
  }


  async uploadImage(file: Express.Multer.File): Promise<Image> {
    const {url, public_id} = await this.cloudinary.uploadImage(file);
    
    const newImage: Image = new Image();
    newImage.url = url;
    newImage.public_id = public_id;
    
    return this.images.save(newImage);
  }

  async deleteById(idToDelete: string): Promise<void> {
    const image = await this.images.findOneBy({id: idToDelete});
    
    if (image) {
      this.images.delete({id: idToDelete});
      this.cloudinary.deleteImage(image.public_id);
    }
  }

  getAllImages(): Promise<Image[]> {
    return this.images.find();
  }

  getImageById(idToGet: string): Promise<Image> {
    return this.images.findOneBy({id: idToGet});
  }

}
