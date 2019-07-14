import { boundMethod } from "autobind-decorator";
import * as React from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { ArticlePreview } from "../components/article-preview";
import { Pagination } from "../components/pagination";
import { IArticle } from "../interfaces/IArticle";
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
  username: string;
  page: number;
}

class Profile extends React.Component<IProps & IProfileProps, IState> {
  public readonly state: IState = {
    page: 0,
    username: this.props.match.params.username
  };
  public componentDidMount() {
    this.showFavorited()
      ? this.props.getFavoritedArticles(0, this.state.username) // 1 -> pagination starts at index 1
      : this.props.getAuthorArticles(0, this.state.username);
    this.props.getProfile(this.state.username);
  }

  public showFavorited(): boolean {
    const params: IMatchParams = this.props.match.params;
    return !!params.favorited && params.favorited === "favorited";
  }

  @boundMethod
  public follow(userName: string) {
    this.props.followAuthor(userName);
  }
  @boundMethod
  public unfollow(userName: string) {
    this.props.unfollowAuthor(userName);
  }
  public render() {
    const articles = this.props.articles;
    const profile = this.props.profile;
    const showFavorited: boolean = this.showFavorited();
    const onClickAction = showFavorited
      ? this.props.getFavoritedArticles
      : this.props.getAuthorArticles;
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
                      to={`/profile/${this.state.username}`}
                      className={showFavorited ? "nav-link" : "nav-link active"}
                      href=""
                      onClick={e => {
                        this.setState({
                          page: 1
                        });
                        this.props.getAuthorArticles(0, this.state.username);
                      }}
                    >
                      My Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/profile/${this.state.username}/favorited`}
                      className={showFavorited ? "nav-link active" : "nav-link"}
                      href=""
                      onClick={e => {
                        this.setState({
                          page: 1
                        });
                        this.props.getFavoritedArticles(0, this.state.username);
                      }}
                    >
                      Favorited Articles
                    </Link>
                  </li>
                </ul>
              </div>

              {!!articles &&
                articles.map((article: IArticle) => (
                  <ArticlePreview
                    article={article}
                    favoriteArticle={this.props.favoriteAuthor}
                    unfavoriteArticle={this.props.unfavoriteArticle}
                  />
                ))}

              <Pagination
                items={this.props.articlesCount.count}
                handleClick={(i: number) => {
                  this.setState({
                    page: i
                  });
                  onClickAction(i, this.state.username);
                }}
                selectedPage={this.state.page}
              />
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
