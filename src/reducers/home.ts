import { ThunkDispatch } from "redux-thunk";
import {
  favoriteArticle,
  getArticleFeedList,
  getArticleList,
  getTagList,
  unfavoriteArticle
} from "../helpers/apiHelper";
import { IArticle } from "../interfaces/IArticle";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";

export const TAGS_FETCH_SUCCESS = "TAGS_FETCH_SUCCESS";
export const TAG_CHANGED = "TAG_CHANGED";

export interface IHomeState {
  articlesCount: { count: number };
  articles: IArticle[];
  tags: string[];
}

interface IFetchedTagsDataAction {
  type: typeof TAGS_FETCH_SUCCESS;
  payload: string;
}

export interface IMapDispatchToProps {
  getArticleFeedList: (offset: number) => void;
  getArticleList: (offset: number) => void;
  getArticleListWithTag: (offset: number, tag: string) => void;
  getTags: () => void;
  favoriteArticle: (articleSlug: string) => void;
  unfavoriteArticle: (articleSlug: string) => void;
}

export interface IMapStateToProps {
  articles: IArticle[];
  articlesCount: { count: number };
  tags: string[];
}

export type LoginActionTypes = IFetchedTagsDataAction;

const initialState: IHomeState = {
  articles: [],
  articlesCount: { count: 0 },
  tags: []
};

export function homeReducer(
  state: IHomeState = initialState,
  action: LoginActionTypes
): IHomeState {
  switch (action.type) {
    case TAGS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        tags: JSON.parse(action.payload).tags
      });
    default:
      return state;
  }
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IMapDispatchToProps => {
  return {
    favoriteArticle: (articleSlug: string) =>
      dispatch(favoriteArticle(articleSlug)),
    getArticleFeedList: (offset: number) => {
      dispatch(
        getArticleFeedList({
          limit: 10,
          offset: offset * 10
        })
      );
    },
    getArticleList: (offset: number) => {
      dispatch(
        getArticleList({
          limit: 10,
          offset: offset * 10
        })
      );
    },
    getArticleListWithTag: (offset: number, tag: string) => {
      dispatch(
        getArticleList({
          limit: 10,
          offset: offset * 10,
          tag
        })
      );
    },
    getTags: () => {
      dispatch(getTagList());
    },
    unfavoriteArticle: (articleSlug: string) =>
      dispatch(unfavoriteArticle(articleSlug))
  };
};

export const mapStateToProps = (
  state: IAppState,
  ownprops: any
): IMapStateToProps => {
  return {
    articles: state.article.articles,
    articlesCount: state.article.articlesCount,
    tags: state.home.tags
  };
};

export interface IHomeProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
  isAuthenticated: boolean;
}
