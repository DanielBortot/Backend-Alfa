import { Post } from '../../domain/Post';

interface PersistencePostEntity {
    id:               string;
    title:            string;
    description:      string;
    imageURL:         string;
    publication_date: Date;
    post_tag:         { id: string, tag: { id: string, name: string } }[];
}


export class PostMapper {
    static toDomain(post: any): Post {
        return new Post(
            post.id,
            post.title,
            post.description,
            post.imageURL,
            post.publication_date,
            post.post_tag.map((tag: any) => tag.tag.name)
            // post.comentaries,
            // post.tags
        );
    }ß

    // static toPersistence(post: Post): any {
    //     return {
    //         id: post.id,
    //         title: post.title,
    //         description: post.description,
    //         imageURL: post.imageURL,
    //         publication_date: post.publication_date,
            // comentaries: post.comentaries,
            // tags: post.tags
    //     }
    // }
}

