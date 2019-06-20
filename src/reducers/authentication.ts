import { IUser } from "../interfaces/IUser";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";

export interface IAuthenticationState {
  user: IUser | undefined;
  isLogged: boolean;
}

interface ILoginDataAction {
  type: typeof LOGIN_SUCCESS;
  payload: string;
}

interface IRegisterDataAction {
  type: typeof REGISTRATION_SUCCESS;
  payload: string;
}

export type AuthenticationActionTypes = ILoginDataAction | IRegisterDataAction;

const initialState: IAuthenticationState = {
  isLogged: false,
  user: undefined
};

export function authenticationReducer(
  state: IAuthenticationState = initialState,
  action: AuthenticationActionTypes
): IAuthenticationState {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTRATION_SUCCESS:
      const userInfo: IUser = JSON.parse(action.payload).user;
      const jwtToken = userInfo.token;
      localStorage.setItem("jwt", jwtToken);

      return Object.assign({}, state, {
        isLogged: true,
        user: userInfo
      });
    default:
      return state;
  }
}
