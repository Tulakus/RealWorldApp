import { IAuthor } from './IAuthor';

export interface IArticle {
    title: string,
    slug: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    tagList: string[],
    description: string,
    author: IAuthor,
    favorited: boolean,
    favoritesCount: number
}