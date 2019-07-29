import * as React from "react";
import { IArticle } from "../interfaces/IArticle";
import { ArticlePreview } from "./article-preview";
import { createLoader } from "./loader";
import { Pagination } from "./pagination";

interface IArticleList {
  articles: IArticle[];
  articlesCount: { count: number };
  itemsPerPage?: number;
  selectedPage: number;
  loading: boolean;
  handlePaginationClick: (index: number) => void;
  favoriteArticle: (articleSlug: string) => void;
  unfavoriteArticle: (articleSlug: string) => void;
}

export const ArticleList = (props: IArticleList) => {
  return (
    <div>
      {props.loading ? (
        createLoader()
      ) : props.articles.length === 0 ? (
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
