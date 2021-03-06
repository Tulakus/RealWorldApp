import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCES,
  REGISTRATION_SUCCESS
} from "../reducers/authentication";
import agentWrapper from "./agentWrapper";
export const TOKEN = "jwt";

export default (store: any) => (next: any) => (action: any) => {
  if (action.type === LOGIN_SUCCESS || action.type === REGISTRATION_SUCCESS) {
    const userInfo = JSON.parse(action.payload).user;
    const jwtToken = userInfo.token;
    localStorage.setItem(TOKEN, jwtToken);
    agentWrapper.Token = jwtToken;
  } else if (action.type === LOGOUT_SUCCES) {
    localStorage.removeItem(TOKEN);
    agentWrapper.Token = "";
  }
  next(action);
};
