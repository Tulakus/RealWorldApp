import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { ArticleMeta } from "../components/article-meta";
import { Banner } from "../components/banner";
import { Card } from "../components/card";
import { getDate } from "../helpers/helper";
import {
  IArticleProps,
  mapDispatchToProps,
  mapStateToProps
} from "../reducers/article";

interface IMatchParams {
  slug: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {}

class ArticlePage extends React.Component<IProps & IArticleProps> {
  public componentDidMount() {
    this.props.fetchArticle({ slug: this.props.match.params.slug });
    this.props.fetchArticleComments({ slug: this.props.match.params.slug });
  }
  public render() {
    const article = this.props.article;
    return (
      <div className="article-page">
        {
          <Banner title={article.title}>
            <ArticleMeta
              img={!!article.author && article.author.image}
              userName={!!article.author && article.author.username}
              date={getDate(article.createdAt)}
              following={article.favorited}
              favorited={article.favorited}
              favoriteCount={article.favoritesCount}
              slug={article.slug}
            />
          </Banner>
        }

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">{!!article && article.body}</div>
          </div>

          <hr />

          <div className="article-actions">
            {!!article && (
              <ArticleMeta
                img={!!article.author && article.author.image}
                userName={!!article.author && article.author.username}
                date={getDate(article.createdAt)}
                following={article.favorited}
                favoriteCount={article.favoritesCount}
                favorited={article.favorited}
                slug={article.slug}
              />
            )}
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <div>
                <Link to={"/login"}>Sign in</Link> or{" "}
                <Link to={"/register"}>sign up</Link> to add comments on this
                article.
              </div>
              {!!this.props.articleComments &&
                this.props.articleComments.map(comment => (
                  <Card
                    img={comment.author.image}
                    comment={comment.body}
                    name={comment.author.username}
                    date={getDate(comment.createdAt)}
                    // isAuthor= {comment.author === }
                  />
                ))}

              {/*TODO : add this
                        <Card
                            isEditing={true}
                            img={"http://i.imgur.com/Qr71crq.jpg"}
                        />
                        <Card
                            img={"http://i.imgur.com/Qr71crq.jpg"}
                            comment={"With supporting text below as a natural lead-in to additional content."}
                            name={"Jacob Schmidt"}
                            date={"Dec 29th"}
                            isAuthor={true}
                        />*/}
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
