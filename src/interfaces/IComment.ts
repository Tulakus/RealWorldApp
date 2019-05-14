import { IAuthor } from './IAuthor';

export interface IComment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: IAuthor;
}