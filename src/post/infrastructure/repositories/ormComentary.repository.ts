import { Comentary } from "src/post/domain/Comentary";
import { IComentaryRepository } from "src/post/domain/IComentary.repository";
import { DataSource, Repository } from 'typeorm';
import { ComentaryEntity } from "../entities/comentary.entity";
import { ComentaryMapper } from "../mappers/comentary.mapper";

export class OrmComentaryRepository extends Repository<ComentaryEntity> implements IComentaryRepository {
    constructor(database: DataSource){
        super(ComentaryEntity, database.manager)
    }
     async findComentariesByPostId(postId: string): Promise<Comentary[]> {
       const resp =  await this.createQueryBuilder('comentary')
         .leftJoinAndSelect('comentary.post', 'post')
         .leftJoinAndSelect('comentary.user', 'user')
            .where('post.id = :postId', {postId})
            .getMany()
        console.log(resp)
        return resp.map((comentary) => ComentaryMapper.toDomain(comentary))

    }
    
    
}