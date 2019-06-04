import { combineReducers } from "redux";
import { articleReducer } from "../reducers/article";
import { homeReducer } from "../reducers/home";
import { loaderReducer } from "../reducers/loader";
import { loginReducer } from "../reducers/login";
import { profileReducer } from "../reducers/profile";
import { registrationReducer } from "../reducers/register";
import { settingsReducer } from "../reducers/settings";

export const rootReducer = combineReducers({
  article: articleReducer,
  home: homeReducer,
  loader: loaderReducer,
  login: loginReducer,
  profile: profileReducer,
  registration: registrationReducer,
  settings: settingsReducer
});

export type AppState = ReturnType<typeof rootReducer>;
