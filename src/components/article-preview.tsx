import * as React from "react";
import { Link } from "react-router-dom";
import { getDate } from "../helpers/helper";
import { IArticle } from "../interfaces/IArticle";
import { IAuthor } from "../interfaces/IAuthor";

export interface IProps {
  article: IArticle;
  favoriteArticle: (articleSlug: string) => void;
  unfavoriteArticle: (articleSlug: string) => void;
}

export class ArticlePreview extends React.Component<IProps, {}> {
  public render() {
    const article: IArticle = this.props.article;
    const author: IAuthor = article.author;
    return (
      <div className="article-preview">
        <div className="article-meta">
          <Link to={`/profile/${this.props.article.author.username}`}>
            <img src={author.image} />
          </Link>
          <div className="info">
            <Link to={`/profile/${author.username}`} className="author">
              {author.username}
            </Link>
            <span className="date">{getDate(article.createdAt)}</span>
          </div>
          <button
            className="btn btn-outline-primary btn-sm pull-xs-right"
            onClick={e =>
              article.favorited
                ? this.props.unfavoriteArticle(article.slug)
                : this.props.favoriteArticle(article.slug)
            }
          >
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
        <Link to={`/article/${article.slug}`} className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
          <ul className="tag-list">
            {!!article.tagList &&
              article.tagList.map(i => (
                <li key={i} className="tag-default tag-pill tag-outline">
                  {i}
                </li>
              ))}
          </ul>
        </Link>
      </div>
    );
  }
}
