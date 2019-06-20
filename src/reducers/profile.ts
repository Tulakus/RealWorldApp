import { ThunkDispatch } from "redux-thunk";
import {
  followUser,
  getArticles,
  getProfile,
  IArticleListQuery,
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
  fetchArticles: (data: any) => void;
  fetchProfile: (profile: string) => void;
  follow: (usrename: string) => void;
  unfollow: (usrename: string) => void;
}

export interface IMapStateToProps {
  articles: IArticle[];
  articlesCount: number;
  profile: IProfile;
}

export interface IProfileState {
  articles: IArticle[];
  articlesCount: number;
  profile: IProfile;
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IMapDispatchToProps => {
  return {
    fetchArticles: (data: IArticleListQuery) => dispatch(getArticles(data)),
    fetchProfile: (profile: string) => dispatch(getProfile({ user: profile })),
    follow: (username: string) => dispatch(followUser({ username })),
    unfollow: (username: string) => dispatch(unfollowUser({ username }))
  };
};

interface IProfileFetchAction {
  type: typeof PROFILE_FETCH_SUCCESS;
  payload: string;
}

interface IUnfollwSuccessAction {
  type: typeof UNFOLLOW_SUCCESS;
}

interface IFollwSuccessAction {
  type: typeof FOLLOW_SUCCESS;
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
    case PROFILE_FETCH_SUCCESS:
    case UNFOLLOW_SUCCESS:
    case FOLLOW_SUCCESS:
    default:
      return state;
  }
}

export const mapStateToProps = (
  state: IAppState,
  ownprops: any
): IMapStateToProps => {
  return {
    articles: state.article.articles,
    articlesCount: state.article.articlesCount,
    profile: state.profile.profile
  };
};

export interface IProfileProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
