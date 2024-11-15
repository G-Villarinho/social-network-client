export type PostResponse = {
    id: string;
    authorUsername: string;
    likes: number;
    likesByUser: boolean;
    title: string;
    content: string;
    createdAt: Date;
};
