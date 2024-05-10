import { Comentary } from '../../domain/Comentary';

interface PersistenceComentaryEntity {
    id: string;
    description: string;
    publication_date: Date;
    post: {
      id: string;
      title: string;
      description: string;
      imageURL: string;
      publication_date: Date;
    };
    user: {
      id: string;
      email: string;
      password: string;
      name: string;
      phone: string;
  };
  }

export class ComentaryMapper {
    static toDomain(comentary: any): Comentary {
        return new Comentary(
            comentary.id,
            comentary.description,
            comentary.publication_date,
            comentary.user.id,
            comentary.user.email,
          
        );
    }
}





