import { GetVideosDto } from "../dto/get-videos.dto";
import { UploadVideoDto } from "../dto/upload-video.dto";
import { Video } from "../entities/video.entity";

export interface IDatabaseConnection {
    getVideos(curso: GetVideosDto): Promise<Video[]>;
    uploadVideo(info: UploadVideoDto, url: string, public_id: string): Promise<Video>;
    deleteVideo(id: string): Promise<Video>;
}