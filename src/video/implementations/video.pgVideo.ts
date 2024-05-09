import { Repository } from "typeorm";
import { GetVideosDto } from "../dto/get-videos.dto";
import { Video } from "../entities/video.entity";
import { IDatabaseConnection } from "../interfaces/video.IDataBaseConnection";
import { UploadVideoDto } from "../dto/upload-video.dto";

export class PgVideo implements IDatabaseConnection {

    private videos: Repository<Video>;

    constructor(videos: Repository<Video>) {
        this.videos = videos;
    }

    uploadVideo(info: UploadVideoDto, url: string, public_id: string): Promise<Video> {
        const newVideo = this.videos.create({...info, url, public_id})
        return this.videos.save(newVideo);
    }

    getVideos(curso: GetVideosDto): Promise<Video[]> {
        return this.videos.findBy({id_curso: curso.id_curso});
    }

    async deleteVideo(id: string): Promise<Video> {
        const video = await this.videos.findOneBy({id});
        await this.videos.delete({id});
        return video;
    }

}