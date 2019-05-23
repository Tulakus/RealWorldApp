import * as React from "react";
import { Link } from "react-router-dom";
import * as request from "superagent";
import { getDate } from "../helpers/helper";

export interface IProps {
  img: string;
  name: string;
  date: string;
  articleName: string;
  description: string;
  favoriteCount: number;
  favorited: boolean;
  slug: string;
}

export class ArticlePreview extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.handleError = this.handleError.bind(this);
  }
  public handleError(error: any) {
    if (error.response.statusCode === 401) {
      this.setState(error.response.body);
    }
  }
  public favorite(slug: string) {
    request
      .post(`https://conduit.productionready.io/api/articles/${slug}/favorite`)
      .catch(err => this.handleError(err));
  }
  public unfavorite(slug: string) {
    request
      .delete(
        `https://conduit.productionready.io/api/articles/${slug}/favorite`
      )
      .catch(err => this.handleError(err));
  }
  public render() {
    const action = this.props.favorited ? this.unfavorite : this.favorite;
    return (
      <div className="article-preview">
        <div className="article-meta">
          <Link to={`/profile/${this.props.name}`}>
            <img src={this.props.img} />
          </Link>
          <div className="info">
            <Link to={`/profile/${this.props.name}`} className="author">
              {this.props.name}
            </Link>
            <span className="date">{getDate(this.props.date)}</span>
          </div>
          <button
            className="btn btn-outline-primary btn-sm pull-xs-right"
            onClick={e => action(this.props.slug)}
          >
            <i className="ion-heart" /> {this.props.favoriteCount}
          </button>
        </div>
        <Link to={`/article/${this.props.slug}`} className="preview-link">
          <h1>{this.props.articleName}</h1>
          <p>{this.props.description}</p>
          <span>Read more...</span>
        </Link>
      </div>
    );
  }
}
