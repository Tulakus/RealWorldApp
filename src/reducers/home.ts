import { ThunkDispatch } from "redux-thunk";
import { getArticles, getTags } from "../helpers/apiHelper";
import { IArticle } from "../interfaces/IArticle";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";

export const TAGS_FETCH_SUCCESS = "TAGS_FETCH_SUCCESS";
export const TAG_CHANGED = "TAG_CHANGED";

export interface IHomeState {
  articlesCount: number;
  articles: IArticle[];
  tags: string[];
}

interface IFetchedTagsDataAction {
  type: typeof TAGS_FETCH_SUCCESS;
  payload: string;
}

export interface IMapDispatchToProps {
  getArticles: () => void;
  getArticlesWithTag: (tag: string) => void;
  getTags: () => void;
}

export interface IMapStateToProps {
  articles: IArticle[];
  articlesCount: number;
  tags: string[];
}

export type LoginActionTypes = IFetchedTagsDataAction;

const initialState: IHomeState = {
  articles: [],
  articlesCount: 0,
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
    getArticles: () => {
      dispatch(
        getArticles({
          limit: 10,
          offset: 0
        })
      );
    },
    getArticlesWithTag: (tag: string) => {
      dispatch(
        getArticles({
          limit: 10,
          offset: 0,
          tag
        })
      );
    },
    getTags: () => {
      dispatch(getTags());
    }
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
}
