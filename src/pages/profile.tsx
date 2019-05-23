import * as React from "react";
import { Link, match, RouteComponentProps } from "react-router-dom";
import * as request from "superagent";
import { ArticlePreview } from "../components/article-preview";
import { Pagination } from "../components/pagination";
import { IArticle } from "../interfaces/IArticle";
import { IProfile } from "../interfaces/IProfile";

interface IMatchParams {
  username: string;
  favorited: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {}

interface IState {
  articles: IArticle[];
  articlesCount: number;
  showFavorited: boolean;
  isFetchingData: boolean;
  profile: IProfile;
}

class Profile extends React.Component<IProps, IState> {
  public readonly state: IState = {
    articlesCount: 0,
    isFetchingData: true,
    showFavorited: this.showFavorited(this.props)
  } as IState;
  constructor(props: IProps) {
    super(props);
    this.handleError = this.handleError.bind(this);
  }
  public componentDidMount() {
    request
      .get(
        `https://conduit.productionready.io/api/profiles/${
          this.props.match.params.username
        }`
      )
      .then(resp => this.setState(resp.body));

    this.fetchData();
  }

  public showFavorited(props: IProps): boolean {
    const params: IMatchParams = props.match.params;
    return !!params.favorited && params.favorited === "favorited";
  }

  public urlChanged(oldProps: IProps): boolean {
    return oldProps.match.url !== this.props.match.url;
  }

  public fetchData(): void {
    const params: IMatchParams = this.props.match.params;

    if (this.showFavorited(this.props)) {
      request
        .get("https://conduit.productionready.io/api/articles")
        .query({ favorited: params.username, limit: 5, offset: 0 })
        .then(resp => this.setState(resp.body))
        .then(() => this.setState({ isFetchingData: false }))
        .catch(err => this.handleError(err));
    } else {
      request
        .get("https://conduit.productionready.io/api/articles")
        .query({ author: params.username, limit: 5, offset: 0 })
        .then(resp => this.setState(resp.body))
        .then(() => this.setState({ isFetchingData: false }))
        .catch(err => this.handleError(err));
    }

    this.setState({ isFetchingData: true });
  }
  public handleError(error: any) {
    if (error.response.statusCode === 401) {
      this.setState(error.response.body);
    }
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
  public componentDidUpdate(oldProps: IProps, oldState: IState) {
    if (
      this.state.isFetchingData ||
      oldState.isFetchingData ||
      !this.urlChanged(oldProps)
    ) {
      return;
    }

    this.setState({ showFavorited: !oldState.showFavorited });
    this.fetchData();
  }

  public render() {
    const articles = this.state.articles;
    const profile = this.state.profile;
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={!!profile && profile.image} className="user-img" />
                <h4>{!!profile && profile.username}</h4>
                {!!profile && profile.bio}
                {!!profile &&
                  (profile.following ? (
                    <button
                      className="btn btn-sm btn-outline-secondary action-btn"
                      onClick={e => this.unfollow(profile.username)}
                    >
                      <i className="ion-plus-round" />
                      &nbsp; Unfollow {profile.username}
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-secondary action-btn"
                      onClick={e => this.follow(profile.username)}
                    >
                      <i className="ion-plus-round" />
                      &nbsp; Follow {profile.username}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link
                      to={`/profile/${this.props.match.params.username}`}
                      className={
                        this.state.showFavorited
                          ? "nav-link"
                          : "nav-link active"
                      }
                      href=""
                    >
                      My Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/profile/${
                        this.props.match.params.username
                      }/favorited`}
                      className={
                        this.state.showFavorited
                          ? "nav-link active"
                          : "nav-link"
                      }
                      href=""
                    >
                      Favorited Articles
                    </Link>
                  </li>
                </ul>
              </div>

              {!!articles &&
                articles.map(article => (
                  <ArticlePreview
                    img={article.author.image}
                    name={article.author.username}
                    date={article.createdAt}
                    articleName={article.title}
                    description={article.description}
                    favoriteCount={article.favoritesCount}
                    favorited={article.favorited}
                    slug={article.slug}
                  />
                ))}

              <Pagination pages={this.state.articlesCount} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { Profile };
