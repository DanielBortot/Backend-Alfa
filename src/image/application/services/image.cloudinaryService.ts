import { createReadStream } from "fs";
import { CloudinaryResponse } from "../providers/image.cloudinaryProvider";
import { v2 as cloudinary} from "cloudinary";
import { HttpException, HttpStatus } from "@nestjs/common";

export class ImageCloudinaryService {

  uploadImage(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image"
        },
        (err, result) => {
          if (err) {return reject(err); }
          resolve(result);
        }
      );
      createReadStream(file.buffer).pipe(uploadStream);
    })
  }

  async deleteImage(public_id: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(public_id, {
        resource_type: "image",
        invalidate: true
      });
    } catch (error) {
      throw new HttpException('No se encontró la imagen en Cloudinary', HttpStatus.BAD_REQUEST)
    }
  }
}