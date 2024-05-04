import { IPostRepository } from "../domain/IPost.repository";

export class PostService {

  constructor(private postRepository: IPostRepository) {}

  findAllPosts() {
    return this.postRepository.findAllPosts();
  };

  findOnePost(id: string) {
    return id;
  };

}
