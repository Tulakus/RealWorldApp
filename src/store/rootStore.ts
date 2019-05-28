import { combineReducers } from "redux";
import { loginReducer } from "../reducers/login";
import { registrationReducer } from "../reducers/register";

export const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer
});

export type AppState = ReturnType<typeof rootReducer>;
