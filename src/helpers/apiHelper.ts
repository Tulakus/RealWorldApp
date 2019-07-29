import {
  ARTICLE_ADDED_SUCCESS,
  ARTICLE_CHANGED_SUCCESS,
  ARTICLE_COMMENTS_ADD_SUCCESS,
  ARTICLE_COMMENTS_DELETED_SUCCESS,
  ARTICLE_COMMENTS_FETCH_SUCCESS,
  ARTICLE_DELETED_SUCCESS,
  ARTICLE_FEED_LIST_FETCH_SUCCESS,
  ARTICLE_FETCH_SUCCESS,
  ARTICLE_LIST_FETCH_SUCCESS,
  FAVORITE_ARTICLE_SUCCESS,
  UNFAVORITE_ARTICLE_SUCCESS
} from "../reducers/article";
import { FETCH_EDIT_ARTICLE_SUCCESS } from "../reducers/article-editor";
import { LOGIN_SUCCESS } from "../reducers/authentication";
import {
  USER_INFO_CHANGED_SUCCESSFULLY,
  USER_INFO_FETCHED_SUCCESSFULLY
} from "../reducers/authentication";
import { TAGS_FETCH_SUCCESS } from "../reducers/home";
import {
  FOLLOW_SUCCESS,
  PROFILE_FETCH_SUCCESS,
  UNFOLLOW_SUCCESS
} from "../reducers/profile";
import { REGISTRATION_SUCCESS } from "../reducers/register";
import F from "./agentWrapper";

export interface IArticleListQuery {
  limit: number;
  offset: number;
  tag?: string;
  favorited?: string;
  author?: string;
}

export const getArticleFeedList = (data: IArticleListQuery) =>
  F.get<IArticleListQuery>(
    "https://conduit.productionready.io/api/articles/feed",
    ARTICLE_FEED_LIST_FETCH_SUCCESS,
    data
  );

export const getArticleList = (data: IArticleListQuery) =>
  F.get<IArticleListQuery>(
    "https://conduit.productionready.io/api/articles",
    ARTICLE_LIST_FETCH_SUCCESS,
    data
  );

export const getTagList = () =>
  F.get("https://conduit.productionready.io/api/tags", TAGS_FETCH_SUCCESS);

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

export const getProfile = (username: string) =>
  F.get(
    `https://conduit.productionready.io/api/profiles/${username}`,
    PROFILE_FETCH_SUCCESS
  );

export interface IFollowRequest {
  username: string;
}

export const followAuthor = (username: string) =>
  F.post(
    `https://conduit.productionready.io/api/profiles/${username}/follow`,
    FOLLOW_SUCCESS
  );

export const unfollowAuthor = (username: string) =>
  F.del(
    `https://conduit.productionready.io/api/profiles/${username}/follow`,
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

// tslint:disable-next-line:no-empty-interface
export interface IUserInfoRequest {}

export const getCurrentUserInfo = () =>
  F.get(
    "https://conduit.productionready.io/api/user",
    USER_INFO_FETCHED_SUCCESSFULLY
  );

export const updateUserSettings = (data: ISettingsRequest) =>
  F.put<ISettingsRequest>(
    "https://conduit.productionready.io/api/user",
    USER_INFO_CHANGED_SUCCESSFULLY,
    data
  );

export const favoriteArticle = (articleSlug: string) =>
  F.post(
    `https://conduit.productionready.io/api/articles/${articleSlug}/favorite`,
    FAVORITE_ARTICLE_SUCCESS
  );

export const unfavoriteArticle = (articleSlug: string) =>
  F.del(
    `https://conduit.productionready.io/api/articles/${articleSlug}/favorite`,
    UNFAVORITE_ARTICLE_SUCCESS
  );

export interface IArticleQuery {
  slug: string;
}

export const getArticle = (data: IArticleQuery) =>
  F.get(
    `https://conduit.productionready.io/api/articles/${data.slug}`,
    ARTICLE_FETCH_SUCCESS
  );

export const getArticleEdit = (slug: string) =>
  F.get(
    `https://conduit.productionready.io/api/articles/${slug}`,
    FETCH_EDIT_ARTICLE_SUCCESS
  );

export interface IArticleCommentsQuery {
  slug: string;
}

export const getArticleComments = (data: IArticleCommentsQuery) =>
  F.get(
    `https://conduit.productionready.io/api/articles/${data.slug}/comments`,
    ARTICLE_COMMENTS_FETCH_SUCCESS
  );

export interface IArticleCommentRequest {
  comment: {
    body: string;
  };
}

export const addArticleComment = (data: IArticleCommentRequest, slug: string) =>
  F.post<IArticleCommentRequest>(
    `https://conduit.productionready.io/api/articles/${slug}/comments`,
    ARTICLE_COMMENTS_ADD_SUCCESS,
    data
  );

export const deleteArticleComment = (id: number, slug: string) =>
  F.del(
    `https://conduit.productionready.io/api/articles/${slug}/comments/${id}`,
    ARTICLE_COMMENTS_DELETED_SUCCESS
  );

export interface IAddArticleRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
}

export const addArticle = (data: IAddArticleRequest) =>
  F.post(
    `https://conduit.productionready.io/api/articles`,
    ARTICLE_ADDED_SUCCESS,
    data
  );

export interface IEditArticleRequest {
  article: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}

export const updateArticle = (data: IEditArticleRequest, slug: string) =>
  F.put(
    `https://conduit.productionready.io/api/articles/${slug}`,
    ARTICLE_CHANGED_SUCCESS,
    data
  );

export const deleteArticle = (slug: string) =>
  F.del(
    `https://conduit.productionready.io/api/articles/${slug}`,
    ARTICLE_DELETED_SUCCESS
  );
