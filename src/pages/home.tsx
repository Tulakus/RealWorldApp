import * as React from "react";
import { connect } from "react-redux";
import { ArticlePreview } from "../components/article-preview";
import { Pagination } from "../components/pagination";
import { Sidebar } from "../components/sidebar";
import { TagsList } from "../components/tag-list";
import { getDate } from "../helpers/helper";
import {
  IHomeProps,
  mapDispatchToProps,
  mapStateToProps
} from "./../reducers/home";

class Home extends React.Component<IHomeProps, {}> {
  public readonly state = {
    tag: ""
  };
  public componentDidMount() {
    this.props.getArticles();
    this.props.getTags();
  }
  public handle(e: React.MouseEvent<HTMLElement>) {
    // todo dodelat
  }
  public handleTagClick = (tag: string) => {
    this.setState({
      tag
    });
    this.props.getArticlesWithTag(tag);
  };

  public render() {
    const tag: string = this.state.tag;
    const isActive = tag !== "";
    return (
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item" onClick={e => this.handle}>
                    <a
                      href=""
                      className={isActive ? "nav-link" : "nav-link active"}
                    >
                      Global Feed
                    </a>
                  </li>
                  {!!tag && tag !== "" && (
                    <li className="nav-item">
                      <a
                        className={isActive ? "nav-link active" : "nav-link"}
                        href="/"
                        onClick={e => e.preventDefault()}
                      >
                        {"#" + tag}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              {this.props.articles.length > 0 &&
                this.props.articles.map(i => (
                  <ArticlePreview
                    img={i.author.image}
                    name={i.author.username}
                    date={getDate(i.createdAt)}
                    articleName={i.title}
                    favoriteCount={i.favoritesCount}
                    description={i.description}
                    slug={i.slug}
                    favorited={i.favorited}
                  />
                ))}
            </div>
            <div className="col-md-3">
              {
                <Sidebar title={"Popular Tags"}>
                  {
                    <TagsList
                      tags={this.props.tags}
                      onClick={this.handleTagClick}
                    />
                  }
                </Sidebar>
              }
            </div>
          </div>
        </div>
        <Pagination pages={Math.floor(this.props.articlesCount / 10)} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
