import { ThunkDispatch } from "redux-thunk";
import {
  favoriteArticle,
  followAuthor,
  getArticleList,
  getProfile,
  IArticleListQuery,
  unfavoriteArticle,
  unfollowAuthor
} from "../helpers/apiHelper";
import { IArticle } from "../interfaces/IArticle";
import { IError } from "../interfaces/IError";
import { IProfile } from "../interfaces/IProfile";
import { IAppState } from "../store/rootReducer";

export const PROFILE_FETCH_SUCCESS = "PROFILE_FETCH_SUCCESS";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";

export interface IMapDispatchToProps {
  getArticles: (data: IArticleListQuery) => void;
  getProfile: (profile: string) => void;
  getAuthorArticles: (offset: number, author: string) => void;
  getFavoritedArticles: (offset: number, favorited: string) => void;
  followAuthor: (username: string) => void;
  unfollowAuthor: (username: string) => void;
  favoriteAuthor: (articleSlug: string) => void;
  unfavoriteArticle: (articleSlug: string) => void;
}

export interface IMapStateToProps {
  articles: IArticle[];
  articlesCount: { count: number };
  profile: IProfile;
  loadingActions: string[];
}

export interface IProfileState {
  articles: IArticle[];
  articlesCount: number;
  profile: IProfile;
}

interface IProfileFetchAction {
  type: typeof PROFILE_FETCH_SUCCESS;
  payload: string;
}

interface IUnfollwSuccessAction {
  type: typeof UNFOLLOW_SUCCESS;
  payload: string;
}

interface IFollwSuccessAction {
  type: typeof FOLLOW_SUCCESS;
  payload: string;
}

type ProfileActionTypes =
  | IProfileFetchAction
  | IUnfollwSuccessAction
  | IFollwSuccessAction;

const initialState: IProfileState = {
  articles: [],
  articlesCount: 0,
  profile: {} as IProfile
};

export function profileReducer(
  state: IProfileState = initialState,
  action: ProfileActionTypes
): IProfileState {
  switch (action.type) {
    case UNFOLLOW_SUCCESS:
    case FOLLOW_SUCCESS:
    case PROFILE_FETCH_SUCCESS:
      return Object.assign({}, state, {
        profile: JSON.parse(action.payload).profile
      });

    default:
      return state;
  }
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IMapDispatchToProps => {
  return {
    favoriteAuthor: (articleSlug: string) =>
      dispatch(favoriteArticle(articleSlug)),
    followAuthor: (username: string) => dispatch(followAuthor(username)),
    getArticles: (data: IArticleListQuery) => dispatch(getArticleList(data)),
    getAuthorArticles: (offset: number, author: string) =>
      dispatch(
        getArticleList({
          author,
          limit: 10,
          offset: offset * 10
        })
      ),
    getFavoritedArticles: (offset: number, favorited: string) =>
      dispatch(
        getArticleList({
          favorited,
          limit: 10,
          offset: offset * 10
        })
      ),
    getProfile: (profile: string) => dispatch(getProfile(profile)),
    unfavoriteArticle: (articleSlug: string) =>
      dispatch(unfavoriteArticle(articleSlug)),
    unfollowAuthor: (username: string) => dispatch(unfollowAuthor(username))
  };
};

export const mapStateToProps = (state: IAppState): IMapStateToProps => {
  return {
    articles: state.article.articles,
    articlesCount: state.article.articlesCount,
    loadingActions: state.loader.loadingActions,
    profile: state.profile.profile
  };
};

export interface IProfileProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
