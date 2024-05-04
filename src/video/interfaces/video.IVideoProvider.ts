import { CloudinaryResponse } from "../types/cloudinary-response";

export interface IVideoProvider {
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
}