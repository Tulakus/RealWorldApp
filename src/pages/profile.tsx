import autobind from "autobind-decorator";
import * as React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { ArticlePreview } from "../components/article-preview";
import { Pagination } from "../components/pagination";
import {
  IProfileProps,
  mapDispatchToProps,
  mapStateToProps
} from "../reducers/profile";

interface IMatchParams {
  username: string;
  favorited: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {}

interface IState {
  showFavorited: boolean;
}

class Profile extends React.Component<IProps & IProfileProps, IState> {
  public readonly state = {
    showFavorited: false
  };
  public componentDidMount() {
    this.fetchData({
      author: this.props.match.params.username,
      limit: 5,
      offset: 0
    });
  }

  public showFavorited(props: IProps): boolean {
    const params: IMatchParams = props.match.params;
    return !!params.favorited && params.favorited === "favorited";
  }

  public fetchData(data: any): void {
    this.props.fetchArticles(data);
  }
  public handleError(error: any) {
    if (error.response.statusCode === 401) {
      this.setState(error.response.body);
    }
  }
  @autobind
  public follow(userName: string) {
    this.props.follow(userName);
  }
  @autobind
  public unfollow(userName: string) {
    this.props.unfollow(userName);
  }
  public render() {
    const articles = this.props.articles;
    const profile = this.props.profile;
    const username = this.props.match.params.username;
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
                      to={`/profile/${username}`}
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
                      to={`/profile/${username}/favorited`}
                      className={
                        this.state.showFavorited
                          ? "nav-link active"
                          : "nav-link"
                      }
                      href=""
                      onClick={e =>
                        this.fetchData({
                          favorited: username,
                          limit: 5,
                          offset: 0
                        })
                      }
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

              <Pagination pages={this.props.articlesCount} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
