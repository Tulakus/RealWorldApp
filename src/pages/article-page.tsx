import { boundMethod } from "autobind-decorator";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ArticleMeta } from "../components/article-meta";
import { Banner } from "../components/banner";
import { Button, ButtonCounter } from "../components/button";
import { Card } from "../components/card";
import { getDate } from "../helpers/helper";
import { IArticle } from "../interfaces/IArticle";
import { IAuthor } from "../interfaces/IAuthor";
import { IComment } from "../interfaces/IComment";
import {
  IArticleProps,
  mapDispatchToProps,
  mapStateToProps
} from "../reducers/article";

interface IMatchParams {
  slug: string;
}

interface IProps extends IArticleProps, RouteComponentProps<IMatchParams> {}

class ArticlePage extends React.Component<IProps> {
  @boundMethod
  public favoriteArticle(articleSlug: string) {
    this.props.favoriteArticle(articleSlug);
  }
  @boundMethod
  public unfavoriteArticle(articleSlug: string) {
    this.props.unfavoriteArticle(articleSlug);
  }
  @boundMethod
  public followAuthor(userName: string) {
    this.props.followAuthor(userName);
  }
  @boundMethod
  public unfollowAuthor(userName: string) {
    this.props.unfollowAuthor(userName);
  }

  @boundMethod
  public editArtcile(slug: string) {
    this.props.editArticle(slug);
  }
  @boundMethod
  public deleteArticle(e: any, slug: string) {
    e.preventDefault();
    this.props.deleteArticle(slug);
  }

  public componentWillMount() {
    this.props.fetchArticle({ slug: this.props.match.params.slug });
    this.props.fetchArticleComments({ slug: this.props.match.params.slug });
  }

  public createNotPersonal(article: IArticle) {
    const author: IAuthor = article.author;
    const userName: string = author.username;
    const favoriteAction = article.favorited
      ? this.unfavoriteArticle
      : this.favoriteArticle;
    const followAction = author.following
      ? this.unfollowAuthor
      : this.followAuthor;

    return (
      <React.Fragment>
        <Button
          iconClass="ion-plus-round"
          label={
            article.author.following
              ? `Unfollow ${userName}`
              : `Follow ${userName}`
          }
          buttonClassName="btn btn-sm btn-outline-secondary"
          onClickHandler={() => followAction(userName)}
        />
        &nbsp;&nbsp;
        <ButtonCounter
          iconClass="ion-heart"
          label={article.favorited ? "Unfavorite Post" : "Favorite Post"}
          buttonClassName="btn btn-sm btn-outline-primary"
          counter={article.favoritesCount || 0}
          onClickHandelr={e => favoriteAction(article.slug)}
        />
      </React.Fragment>
    );
  }

  public createPersonal(article: IArticle) {
    return (
      <React.Fragment>
        <Button
          iconClass="ion-edit"
          label={"Edit Article"}
          buttonClassName="btn btn-sm btn-outline-secondary"
          onClickHandler={() => this.editArtcile(article.slug)}
        />
        &nbsp;&nbsp;
        <Button
          iconClass="ion-trash-a"
          label={"Delete Article"}
          buttonClassName="btn btn-sm btn-outline-danger"
          onClickHandler={e => this.deleteArticle(e, article.slug)}
        />
      </React.Fragment>
    );
  }
  public render() {
    const article: IArticle = this.props.article;
    const author: IAuthor = article.author;

    if (
      Object.entries(article).length === 0 &&
      article.constructor === Object
    ) {
      return <div>Loading</div>;
    }
    const userName = author.username;

    return (
      <div className="article-page">
        {
          <Banner title={article.title}>
            <ArticleMeta
              img={!!article.author && article.author.image}
              userName={!!article.author && article.author.username}
              date={article.createdAt}
            >
              {!this.props.isLogged
                ? null
                : this.props.currentUser!.username === article.author.username
                ? this.createPersonal(article)
                : this.createNotPersonal(article)}
            </ArticleMeta>
          </Banner>
        }

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">{!!article && article.body}</div>
          </div>
          <hr />
          {/* <div className="article-actions">
            {!!article && (
              <ArticleMeta
                img={!!article.author && article.author.image}
                userName={!!article.author && article.author.username}
                date={getDate(article.createdAt)}
                following={!!article.author && article.author.following}
                favoriteCount={article.favoritesCount}
                favorited={article.favorited}
                slug={article.slug}
                favoriteArticle={this.props.favoriteArticle}
                unfavoriteArticle={this.props.unfavoriteArticle}
                followAuthor={this.props.followAuthor}
                unfollowAuthor={this.props.unfollowAuthor}
              />
            )}
          </div> */}

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              {!this.props.isLogged && (
                <div>
                  <Link to={"/login"}>Sign in</Link> or{" "}
                  <Link to={"/register"}>sign up</Link> to add comments on this
                  article.
                </div>
              )}
              {this.props.isLogged && (
                <Card
                  isEditing={true}
                  img={
                    (!!this.props.currentUser &&
                      this.props.currentUser.image) ||
                    undefined
                  }
                  addComment={this.props.sendCommnent}
                  slug={this.props.article.slug}
                />
              )}
              {!!this.props.articleComments &&
                this.props.articleComments.map((comment: IComment) => (
                  <Card
                    img={comment.author.image}
                    comment={comment.body}
                    name={comment.author.username}
                    date={getDate(comment.createdAt)}
                    isAuthor={
                      this.props.isLogged &&
                      !!this.props.currentUser &&
                      comment.author.username ===
                        this.props.currentUser.username
                    }
                    addComment={this.props.sendCommnent}
                    slug={this.props.article.slug}
                    id={comment.id}
                    deleteComment={this.props.deleteCommnent}
                  />
                ))}
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
)(ArticlePage);
