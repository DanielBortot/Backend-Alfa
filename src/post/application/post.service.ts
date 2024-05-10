import { IComentaryRepository } from "../domain/IComentary.repository";
import { IPostRepository } from "../domain/IPost.repository";

export class PostService {

  constructor(
    private postRepository: IPostRepository,
    private comentaryRepository: IComentaryRepository
  ) {}

  findAllPosts() {
    return this.postRepository.findAllPosts();
  };

  async findOnePost(id: string) {
    const post = await this.postRepository.findOnePost(id);
    const postComentaries = await this.comentaryRepository.findComentariesByPostId(id);
    //console.log({post, postComentaries})
    return { post, postComentaries };
  };

}
