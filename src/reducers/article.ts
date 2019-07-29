import { ThunkDispatch } from "redux-thunk";
import {
  addArticleComment,
  deleteArticle,
  deleteArticleComment,
  favoriteArticle,
  followAuthor,
  getArticle,
  getArticleComments,
  IArticleCommentsQuery,
  IArticleQuery,
  unfavoriteArticle,
  unfollowAuthor
} from "../helpers/apiHelper";
import { navigate, navigateOnSuccess } from "../helpers/helper";
import { IArticle } from "../interfaces/IArticle";
import { IComment } from "../interfaces/IComment";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";
import { IAppState } from "../store/rootReducer";

export const ARTICLE_ADDED_SUCCESS = "ARTICLE_ADDED_SUCCESS";
export const ARTICLE_CHANGED_SUCCESS = "ARTICLE_CHANGED_SUCCESS";
export const ARTICLE_DELETED_SUCCESS = "ARTICLE_DELETED_SUCCESS";

export const ARTICLE_FETCH_SUCCESS = "ARTICLE_FETCH_SUCCESS";
export const ARTICLE_LIST_FETCH_SUCCESS = "ARTICLES_FETCH_SUCCESS";
export const ARTICLE_FEED_LIST_FETCH_SUCCESS =
  "ARTICLE_FEED_LIST_FETCH_SUCCESS";
export const ARTICLE_COMMENTS_ADD_SUCCESS = "ARTICLE_COMMENTS_ADD_SUCCESS";
export const ARTICLE_COMMENTS_FETCH_SUCCESS = "ARTICLE_COMMENTS_FETCH_SUCCESS";
export const ARTICLE_COMMENTS_DELETED_SUCCESS =
  "ARTICLE_COMMENTS_DELETED_SUCCESS";
export const FAVORITE_ARTICLE_SUCCESS = "FAVORITE_ARTICLE_SUCCESS";
export const UNFAVORITE_ARTICLE_SUCCESS = "UNFAVORITE_ARTICLE_SUCCESS";

export interface IMapDispatchToProps {
  fetchArticle: (data: IArticleQuery) => void;
  fetchArticleComments: (data: IArticleCommentsQuery) => void;
  sendCommnent: (comment: string, slug: string) => void;
  deleteCommnent: (id: number, slug: string) => void;
  favoriteArticle: (slug: string) => void;
  unfavoriteArticle: (slug: string) => void;
  followAuthor: (author: string) => void;
  unfollowAuthor: (author: string) => void;
  editArticle: (slug: string) => void;
  deleteArticle: (slug: string) => void;
}

export interface IMapStateToProps {
  articles: IArticle[];
  articlesCount: { count: number };
  articleComments: IComment[];
  article: IArticle;
  isLogged: boolean;
  currentUser?: IUser;
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

interface IArticleCommentAddedSuccessAction {
  type: typeof ARTICLE_COMMENTS_ADD_SUCCESS;
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

interface IChangeArticleSuccessAction {
  type: typeof ARTICLE_CHANGED_SUCCESS;
  payload: string;
}

interface IDeleteSuccessAction {
  type: typeof ARTICLE_DELETED_SUCCESS;
  payload: string;
}

type ArticleActionTypes =
  | IArticleCommentAddedSuccessAction
  | IFetchedArticlesSuccessAction
  | IFavoriteArticleSuccessAction
  | IUnfavoriteArticleSuccessAction
  | IFetchedArticleSuccessAction
  | IFetchedArticleCommentsSuccessAction
  | IFetchedFeedArticleSuccessAction
  | IChangeArticleSuccessAction
  | IDeleteSuccessAction;

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
        article,
        articles
      });
    case ARTICLE_COMMENTS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        articleComments: JSON.parse(action.payload).comments
      });
    case ARTICLE_COMMENTS_ADD_SUCCESS:
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
    articlesCount: state.article.articlesCount,
    currentUser: state.authentication.user,
    isLogged: state.authentication.isLogged
  };
};

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownProps: any
): IMapDispatchToProps => {
  return {
    deleteArticle: (slug: string) =>
      dispatch(navigateOnSuccess(() => deleteArticle(slug), ownProps, "/")),
    deleteCommnent: (id: number, slug: string) =>
      dispatch(deleteArticleComment(id, slug)).then(() =>
        dispatch(getArticleComments({ slug }))
      ),
    editArticle: (slug: string) =>
      dispatch(() => navigate(ownProps, `/editor/${slug}`)),
    favoriteArticle: (slug: string) => dispatch(favoriteArticle(slug)),
    fetchArticle: (data: IArticleQuery) => dispatch(getArticle(data)),
    fetchArticleComments: (data: IArticleCommentsQuery) =>
      dispatch(getArticleComments(data)),
    followAuthor: (author: string) => dispatch(followAuthor(author)),
    sendCommnent: (comment: string, slug: string) =>
      dispatch(
        addArticleComment(
          {
            comment: {
              body: comment
            }
          },
          slug
        )
      ).then(() => dispatch(getArticleComments({ slug }))),
    unfavoriteArticle: (slug: string) => dispatch(unfavoriteArticle(slug)),
    unfollowAuthor: (author: string) => dispatch(unfollowAuthor(author))
  };
};

export interface IArticleProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
