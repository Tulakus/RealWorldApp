import F from "../helpers/dataFetchHelper";
import {
  ARTICLE_FETCH_SUCCESS,
  ARTICLE_LIST_FETCH_SUCCESS,
  FAVORITE_ARTICLE_SUCCESS,
  UNFAVORITE_ARTICLE_SUCCESS
} from "../reducers/article";
import { LOGIN_SUCCESS } from "../reducers/authentication";
import { TAGS_FETCH_SUCCESS } from "../reducers/home";
import {
  FOLLOW_SUCCESS,
  PROFILE_FETCH_SUCCESS,
  UNFOLLOW_SUCCESS
} from "../reducers/profile";
import { REGISTRATION_SUCCESS } from "../reducers/register";
import { SETTING_CHANGED_SUCCESSFULLY } from "../reducers/settings";

export interface IArticleListQuery {
  limit: number;
  offset: number;
  tag?: string;
}

export const getArticles = (data: IArticleListQuery) =>
  F.get<IArticleListQuery>(
    "https://conduit.productionready.io/api/articles",
    ARTICLE_LIST_FETCH_SUCCESS,
    data
  );

// tslint:disable-next-line:no-empty-interface
interface ITagsQuery {}

export const getTags = () =>
  F.get<ITagsQuery>(
    "https://conduit.productionready.io/api/tags",
    TAGS_FETCH_SUCCESS
  );

export interface ILoginRequest {
  user: { email: string; password: string };
}

export const login = (data: ILoginRequest) =>
  F.post<ILoginRequest>(
    "https://conduit.productionready.io/api/users/login",
    LOGIN_SUCCESS,
    data
  );

export interface IProfileQuery {
  user: string;
}
export const getProfile = (data: IProfileQuery) =>
  F.get(
    `https://conduit.productionready.io/api/profiles/${data.user}`,
    PROFILE_FETCH_SUCCESS
  );

export interface IFollowRequest {
  username: string;
}

export const followUser = (data: IFollowRequest) =>
  F.post(
    `https://conduit.productionready.io/api/profiles/${data.username}/follow`,
    FOLLOW_SUCCESS
  );

export const unfollowUser = (data: IFollowRequest) =>
  F.del(
    `https://conduit.productionready.io/api/profiles/${data.username}/follow`,
    UNFOLLOW_SUCCESS
  );

export interface IRegistrationRequest {
  user: { email: string; password: string; username: string };
}

export const registerUser = (data: IRegistrationRequest) =>
  F.post<IRegistrationRequest>(
    "https://conduit.productionready.io/api/users",
    REGISTRATION_SUCCESS,
    data
  );

export interface ISettingsRequest {
  user: {
    password?: string;
    email?: string;
    name?: string;
    bio?: string;
    image?: string;
  };
}

export const updateUserSettings = (data: ISettingsRequest) =>
  F.put<ISettingsRequest>(
    "https://conduit.productionready.io/api/user",
    SETTING_CHANGED_SUCCESSFULLY,
    data
  );

export interface IFavoriteRequest {
  slug: string;
}

export const favoriteArticle = (data: IFavoriteRequest) =>
  F.post<IFavoriteRequest>(
    `https://conduit.productionready.io/api/articles/${data.slug}/favorite`,
    FAVORITE_ARTICLE_SUCCESS
  );

export const unfavoriteArticle = (data: IFavoriteRequest) =>
  F.del<IFavoriteRequest>(
    `https://conduit.productionready.io/api/articles/${data.slug}/favorite`,
    UNFAVORITE_ARTICLE_SUCCESS
  );

export interface IArticleQuery {
  slug: string;
}

export const getArticle = (data: IArticleQuery) =>
  F.get<IArticleQuery>(
    `https://conduit.productionready.io/api/articles/${data.slug}`,
    ARTICLE_FETCH_SUCCESS
  );

export interface IArticleCommentsQuery {
  slug: string;
}

export const getArticleComments = (data: IArticleCommentsQuery) =>
  F.get<IArticleCommentsQuery>(
    `https://conduit.productionready.io/api/articles/${data.slug}/comments`,
    ARTICLE_FETCH_SUCCESS
  );
