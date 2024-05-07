

export class Comentary {
    constructor(
        public id: string,
        public description: string,
        public publication_date: Date,
        public user_id: string,
        public user_email: string
    ) {}
}