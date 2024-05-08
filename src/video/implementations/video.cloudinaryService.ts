import { HttpException, HttpStatus } from "@nestjs/common";
import { IVideoProvider } from "../interfaces/video.IVideoProvider";
import { CloudinaryResponse } from "../types/cloudinary-response";
import { v2 as cloudinary } from "cloudinary";
import { createReadStream } from "streamifier";

export class CloudinaryService implements IVideoProvider {
    
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_chunked_stream(
                    {
                        resource_type: 'video'
                    },
                    (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    }
                );
                createReadStream(file.buffer).pipe(uploadStream);
        })
    }

    async deleteFile(public_id: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(public_id, {
                resource_type: 'video',
                invalidate: true
            });
        } catch (e) {
            throw new HttpException('no se encontro el archivo en cloudinary', HttpStatus.BAD_REQUEST);
        }
    }
}