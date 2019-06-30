import { ThunkDispatch } from "redux-thunk";
import {
  getArticle,
  getArticleComments,
  IArticleCommentsQuery,
  IArticleQuery
} from "../helpers/apiHelper";
import { IArticle } from "../interfaces/IArticle";
import { IComment } from "../interfaces/IComment";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";

export const ARTICLE_FEED_LIST_FETCH_SUCCESS =
  "ARTICLE_FEED_LIST_FETCH_SUCCESS";
export const ARTICLE_LIST_FETCH_SUCCESS = "ARTICLES_FETCH_SUCCESS";
export const ARTICLE_FETCH_SUCCESS = "ARTICLE_FETCH_SUCCESS";
export const ARTICLE_COMMENTS_FETCH_SUCCESS = "ARTICLE_COMMENTS_FETCH_SUCCESS";
export const UNFAVORITE_ARTICLE_SUCCESS = "UNFAVORITE_ARTICLE_SUCCESS";
export const FAVORITE_ARTICLE_SUCCESS = "FAVORITE_ARTICLE_SUCCESS";

export interface IMapDispatchToProps {
  fetchArticle: (data: IArticleQuery) => void;
  fetchArticleComments: (data: IArticleCommentsQuery) => void;
}

export interface IMapStateToProps {
  articles: IArticle[];
  articlesCount: { count: number };
  articleComments: IComment[];
  article: IArticle;
}

export interface IArticleState {
  articles: IArticle[];
  articlesCount: { count: number };
  articleComments: IComment[];
  article: IArticle;
}

interface IFetchedArticleSuccessAction {
  type: typeof ARTICLE_FETCH_SUCCESS;
  payload: string;
}

interface IFetchedArticleCommentsSuccessAction {
  type: typeof ARTICLE_COMMENTS_FETCH_SUCCESS;
  payload: string;
}

interface IFetchedArticlesSuccessAction {
  type: typeof ARTICLE_LIST_FETCH_SUCCESS;
  payload: string;
}

interface IFetchedFeedArticleSuccessAction {
  type: typeof ARTICLE_FEED_LIST_FETCH_SUCCESS;
  payload: string;
}

interface IFavoriteArticleSuccessAction {
  type: typeof UNFAVORITE_ARTICLE_SUCCESS;
  payload: string;
}

interface IUnfavoriteArticleSuccessAction {
  type: typeof FAVORITE_ARTICLE_SUCCESS;
  payload: string;
}

type ArticleActionTypes =
  | IFetchedArticlesSuccessAction
  | IFavoriteArticleSuccessAction
  | IUnfavoriteArticleSuccessAction
  | IFetchedArticleSuccessAction
  | IFetchedArticleCommentsSuccessAction
  | IFetchedFeedArticleSuccessAction;

const initialState: IArticleState = {
  article: {} as IArticle,
  articleComments: [],
  articles: [],
  articlesCount: { count: 0 }
};

export function articleReducer(
  state: IArticleState = initialState,
  action: ArticleActionTypes
): IArticleState {
  switch (action.type) {
    case ARTICLE_FEED_LIST_FETCH_SUCCESS:
    case ARTICLE_LIST_FETCH_SUCCESS:
      const parsedPayload = JSON.parse(action.payload);
      return Object.assign({}, state, {
        articles: parsedPayload.articles,
        articlesCount: { count: parsedPayload.articlesCount }
      });

    case ARTICLE_FETCH_SUCCESS:
      return Object.assign({}, state, {
        article: JSON.parse(action.payload).article
      });
    case FAVORITE_ARTICLE_SUCCESS:
    case UNFAVORITE_ARTICLE_SUCCESS:
      const article = JSON.parse(action.payload).article;
      const index = state.articles.findIndex(
        (i: IArticle) => i.slug === article.slug
      );

      if (index === -1) {
        return state;
      }

      const articles = state.articles
        .slice(0, index)
        .concat([article])
        .concat(state.articles.slice(index + 1));

      return Object.assign({}, state, {
        articles
      });
    case ARTICLE_COMMENTS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        articleComments: JSON.parse(action.payload).comments
      });
    default:
      return state;
  }
}

export const mapStateToProps = (
  state: IAppState,
  ownprops: any
): IMapStateToProps => {
  return {
    article: state.article.article,
    articleComments: state.article.articleComments,
    articles: state.article.articles,
    articlesCount: state.article.articlesCount
  };
};

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IMapDispatchToProps => {
  return {
    fetchArticle: (data: IArticleQuery) => dispatch(getArticle(data)),
    fetchArticleComments: (data: IArticleCommentsQuery) =>
      dispatch(getArticleComments(data))
  };
};

export interface IArticleProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
