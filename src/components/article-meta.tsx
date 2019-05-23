import * as React from "react";
import * as request from "superagent";

export interface IProps {
  img?: string;
  userName: string;
  date: string;
  favoriteCount?: number;
  favorited: boolean;
  following: boolean;
  followCount?: number;
  slug: string;
}

export class ArticleMeta extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleError = this.handleError.bind(this);
    this.favorite = this.favorite.bind(this);
    this.unfavorite = this.unfavorite.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
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
  public follow(userName: string) {
    request
      .post(
        `https://conduit.productionready.io/api/profiles/${userName}/follow`
      )
      .catch(err => this.handleError(err));
  }
  public unfollow(userName: string) {
    request
      .delete(
        `https://conduit.productionready.io/api/profiles/${userName}/follow`
      )
      .catch(err => this.handleError(err));
  }
  public render() {
    const favoriteAction = this.props.favorited
      ? this.unfavorite
      : this.favorite;
    const followAction = this.props.following ? this.unfollow : this.follow;
    // favoriteAction = this.props.favorited ? this.unfavorite : this.favorite;
    return (
      <div className="article-meta">
        <a href="">
          <img src={this.props.img} />
        </a>
        <div className="info">
          <a href="" className="author">
            {this.props.userName}
          </a>
          <span className="date">{this.props.date}</span>
        </div>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={e => followAction(this.props.slug)}
        >
          <i className="ion-plus-round" />
          &nbsp; Follow {this.props.userName}
          <span className="counter">
            ({(!!this.props.following && this.props.following) || 0})
          </span>
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={e => favoriteAction(this.props.userName)}
        >
          <i className="ion-heart" />
          &nbsp; Favorite Post
          <span className="counter">
            ({(!!this.props.favoriteCount && this.props.favoriteCount) || 0})
          </span>
        </button>
      </div>
    );
  }
}
