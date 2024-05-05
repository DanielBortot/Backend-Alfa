import { CloudinaryResponse } from "../types/cloudinary-response";

export interface IVideoProvider {
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
    deleteFile(public_id: string): Promise<void>;
}