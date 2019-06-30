import { ThunkDispatch } from "redux-thunk";
import {
  favoriteArticle,
  followUser,
  getArticleList,
  getProfile,
  IArticleListQuery,
  IFavoriteRequest,
  unfavoriteArticle,
  unfollowUser
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
  follow: (usrename: string) => void;
  unfollow: (usrename: string) => void;
  favorite: (data: IFavoriteRequest) => void;
  unfavorite: (data: IFavoriteRequest) => void;
}

export interface IMapStateToProps {
  articles: IArticle[];
  articlesCount: { count: number };
  profile: IProfile;
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
    favorite: (data: IFavoriteRequest) => dispatch(favoriteArticle(data)),
    follow: (username: string) => dispatch(followUser({ username })),
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
    getProfile: (profile: string) => dispatch(getProfile({ user: profile })),
    unfavorite: (data: IFavoriteRequest) => dispatch(unfavoriteArticle(data)),
    unfollow: (username: string) => dispatch(unfollowUser({ username }))
  };
};

export const mapStateToProps = (state: IAppState): IMapStateToProps => {
  return {
    articles: state.article.articles,
    articlesCount: state.article.articlesCount,
    profile: state.profile.profile
  };
};

export interface IProfileProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
