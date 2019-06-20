import { ThunkDispatch } from "redux-thunk";
import {
  favoriteArticle,
  getArticle,
  getArticleComments,
  getArticles as getArticleList,
  IArticleCommentsQuery,
  IArticleListQuery,
  IArticleQuery,
  IFavoriteRequest,
  unfavoriteArticle
} from "../helpers/apiHelper";
import { IArticle } from "../interfaces/IArticle";
import { IComment } from "../interfaces/IComment";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";

export const ARTICLE_LIST_FETCH_SUCCESS = "ARTICLES_FETCH_SUCCESS";
export const ARTICLE_FETCH_SUCCESS = "ARTICLE_FETCH_SUCCESS";
export const ARTICLE_COMMENTS_FETCH_SUCCESS = "ARTICLE_COMMENTS_FETCH_SUCCESS";
export const UNFAVORITE_ARTICLE_SUCCESS = "UNFAVORITE_ARTICLE_SUCCESS";
export const FAVORITE_ARTICLE_SUCCESS = "FAVORITE_ARTICLE_SUCCESS";

export interface IMapDispatchToProps {
  fetchArticleList: (data: IArticleListQuery) => void;
  favorite: (data: IFavoriteRequest) => void;
  unfavorite: (data: IFavoriteRequest) => void;
  fetchArticle: (data: IArticleQuery) => void;
  fetchArticleComments: (data: IArticleCommentsQuery) => void;
}

export interface IMapStateToProps {
  articles: IArticle[];
  articlesCount: number;
  articleComments: IComment[];
  article: IArticle;
}

export interface IArticleState {
  articles: IArticle[];
  articlesCount: number;
  articleComments: IComment[];
  article: IArticle;
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IMapDispatchToProps => {
  return {
    favorite: (data: IFavoriteRequest) => dispatch(favoriteArticle(data)),
    fetchArticle: (data: IArticleQuery) => dispatch(getArticle(data)),
    fetchArticleComments: (data: IArticleCommentsQuery) =>
      dispatch(getArticleComments(data)),
    fetchArticleList: (data: IArticleListQuery) =>
      dispatch(getArticleList(data)),
    unfavorite: (data: IFavoriteRequest) => dispatch(unfavoriteArticle(data))
  };
};

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

interface IFavoriteArticleSuccessAction {
  type: typeof UNFAVORITE_ARTICLE_SUCCESS;
}

interface IUnfavoriteArticleSuccessAction {
  type: typeof FAVORITE_ARTICLE_SUCCESS;
}

type ArticleActionTypes =
  | IFetchedArticlesSuccessAction
  | IFavoriteArticleSuccessAction
  | IUnfavoriteArticleSuccessAction
  | IFetchedArticleSuccessAction
  | IFetchedArticleCommentsSuccessAction;

const initialState: IArticleState = {
  article: {} as IArticle,
  articleComments: [],
  articles: [],
  articlesCount: 0
};

export function articleReducer(
  state: IArticleState = initialState,
  action: ArticleActionTypes
): IArticleState {
  switch (action.type) {
    case ARTICLE_LIST_FETCH_SUCCESS:
      return Object.assign({}, state, {
        articles: JSON.parse(action.payload).articles
      });
    case ARTICLE_FETCH_SUCCESS:
    case ARTICLE_COMMENTS_FETCH_SUCCESS:
    case FAVORITE_ARTICLE_SUCCESS:
    case UNFAVORITE_ARTICLE_SUCCESS:
      return state;
    // todo finish reducer
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

export interface IArticleProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
