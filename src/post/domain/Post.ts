

export class Post {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public imageURL: string, 
        public publication_date: Date, 
        // public comentaries?: string[],
         public tags: string[], 
       ){
    }
}