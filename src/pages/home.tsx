import { boundMethod } from "autobind-decorator";
import * as React from "react";
import { connect } from "react-redux";
import { ArticlePreview } from "../components/article-preview";
import { Pagination } from "../components/pagination";
import { Sidebar } from "../components/sidebar";
import { TagsList } from "../components/tag-list";
import { IArticle } from "../interfaces/IArticle";
import {
  IHomeProps,
  mapDispatchToProps,
  mapStateToProps
} from "./../reducers/home";

interface IArticleList {
  articles: IArticle[];
  articlesCount: { count: number };
  itemsPerPage?: number;
  selectedPage: number;
  handlePaginationClick: (index: number) => void;
  favoriteArticle: (articleSlug: string) => void;
  unfavoriteArticle: (articleSlug: string) => void;
}

const ArticleList = (props: IArticleList) => {
  return (
    <div>
      {props.articles.length === 0 ? (
        <div>No articles are here... yet.</div>
      ) : (
        props.articles.map((i: IArticle) => (
          <ArticlePreview
            key={i.slug}
            article={i}
            favoriteArticle={props.favoriteArticle}
            unfavoriteArticle={props.unfavoriteArticle}
          />
        ))
      )}
      <Pagination
        items={props.articlesCount.count}
        handleClick={props.handlePaginationClick}
        selectedPage={props.selectedPage}
        itemsPerPage={10}
      />
    </div>
  );
};

enum SelectedFeed {
  Personal,
  Global,
  Tag
}

interface IHomeState {
  tag: string;
  feed: SelectedFeed;
  page: number;
}

class Home extends React.Component<IHomeProps, IHomeState> {
  public readonly state = {
    feed: this.props.isAuthenticated
      ? SelectedFeed.Personal
      : SelectedFeed.Global,
    page: 0,
    tag: ""
  };

  public componentDidMount() {
    this.getItems(this.state.page, this.state.feed);
    this.props.getTags();
  }

  @boundMethod
  public handleFeedChange(
    feed: SelectedFeed,
    e: React.MouseEvent<HTMLElement>
  ) {
    e.preventDefault();
    this.setState({
      feed,
      page: 0,
      tag: ""
    });
    this.getItems(0, feed);
  }

  @boundMethod
  public handleTagClick(tag: string) {
    this.setState({
      feed: SelectedFeed.Tag,
      page: 0,
      tag
    });
    this.props.getArticleListWithTag(0, tag);
  }

  @boundMethod
  public getItems(page: number = 0, feed: SelectedFeed) {
    const offset: number = page;
    switch (feed) {
      case SelectedFeed.Personal:
        this.props.getArticleFeedList(offset);
        break;
      case SelectedFeed.Global:
        this.props.getArticleList(offset);
        break;
      case SelectedFeed.Tag:
        this.props.getArticleListWithTag(offset, this.state.tag);
        break;
    }
  }

  public render() {
    const tag: string = this.state.tag;
    const isSelectedTag = this.state.tag !== "";
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
                  {this.props.isAuthenticated && (
                    <li
                      className="nav-item"
                      onClick={e => {
                        this.handleFeedChange(SelectedFeed.Personal, e);
                      }}
                    >
                      <a
                        href=""
                        className={
                          this.state.feed === SelectedFeed.Personal &&
                          !isSelectedTag
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Your Feed
                      </a>
                    </li>
                  )}
                  <li
                    className="nav-item"
                    onClick={e => {
                      this.handleFeedChange(SelectedFeed.Global, e);
                    }}
                  >
                    <a
                      href=""
                      className={
                        this.state.feed === SelectedFeed.Global
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      Global Feed
                    </a>
                  </li>
                  {!!tag && tag !== "" && (
                    <li className="nav-item">
                      <a
                        className={
                          this.state.feed === SelectedFeed.Tag && isSelectedTag
                            ? "nav-link active"
                            : "nav-link"
                        }
                        href=""
                        onClick={e => e.preventDefault()}
                      >
                        {"#" + tag}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
              <ArticleList
                articles={this.props.articles}
                articlesCount={this.props.articlesCount}
                selectedPage={this.state.page}
                handlePaginationClick={(i: number) => {
                  this.setState({
                    page: i
                  });
                  this.getItems(i, this.state.feed);
                }}
                favoriteArticle={this.props.favoriteArticle}
                unfavoriteArticle={this.props.unfavoriteArticle}
              />
            </div>
            <div className="col-md-3">
              <Sidebar title={"Popular Tags"}>
                <TagsList
                  tags={this.props.tags}
                  onClick={this.handleTagClick}
                />
              </Sidebar>
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
)(Home);
