

export class Post {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public imageURL: string, 
        public publication_date: Date, 
        public tags: string[], 
        public comentaries: string[]){
    }
}