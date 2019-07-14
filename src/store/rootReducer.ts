import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { combineReducers, Reducer } from "redux";
import thunk from "redux-thunk";
import auth from "../helpers/authenticationMiddleware";
import logger from "../helpers/loggerMiddleware";
import { articleReducer, IArticleState } from "../reducers/article";
import { editorReducer, IArticleEditorState } from "../reducers/article-editor";
import {
  authenticationReducer,
  IAuthenticationState
} from "../reducers/authentication";
import { errorHandlingReducer, IErrorState } from "../reducers/errorHandler";
import { homeReducer, IHomeState } from "../reducers/home";
import { ILoaderState, loaderReducer } from "../reducers/loader";
import { IProfileState, profileReducer } from "../reducers/profile";
import { IRegistrationState, registrationReducer } from "../reducers/register";

export function createRootReducer(history: any): Reducer<IAppState> {
  return combineReducers({
    article: articleReducer,
    authentication: authenticationReducer,
    editor: editorReducer,
    error: errorHandlingReducer,
    home: homeReducer,
    loader: loaderReducer,
    profile: profileReducer,
    registration: registrationReducer,
    router: connectRouter(history)
  });
}

export interface IAppState {
  error: IErrorState;
  router: any;
  article: IArticleState;
  authentication: IAuthenticationState;
  home: IHomeState;
  loader: ILoaderState;
  profile: IProfileState;
  registration: IRegistrationState;
  editor: IArticleEditorState;
}

export const browserHistory = createBrowserHistory();

export const store = createStore(
  createRootReducer(browserHistory),
  applyMiddleware(thunk, logger, auth)
);
