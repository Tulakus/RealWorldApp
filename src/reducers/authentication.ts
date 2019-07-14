import { IUser } from "../interfaces/IUser";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const LOGOUT_SUCCES = "LOGOUT_SUCCES";
export const USER_INFO_CHANGED_SUCCESSFULLY = "USER_INFO_CHANGED_SUCCESSFULLY";
export const USER_INFO_FETCHED_SUCCESSFULLY = "USER_INFO_FETCHED_SUCCESSFULLY";

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

interface ILogoutAction {
  type: typeof LOGOUT_SUCCES;
  payload: string;
}

interface ISettingChangedAction {
  type: typeof USER_INFO_CHANGED_SUCCESSFULLY;
  payload: string;
}

interface ISettingFetchedAction {
  type: typeof USER_INFO_FETCHED_SUCCESSFULLY;
  payload: string;
}

export type AuthenticationActionTypes =
  | ILoginDataAction
  | IRegisterDataAction
  | ILogoutAction
  | ISettingChangedAction
  | ISettingFetchedAction;

const initialState: IAuthenticationState = {
  isLogged: false,
  user: undefined
};

export function authenticationReducer(
  state: IAuthenticationState = initialState,
  action: AuthenticationActionTypes
): IAuthenticationState {
  switch (action.type) {
    case USER_INFO_FETCHED_SUCCESSFULLY:
    case LOGIN_SUCCESS:
    case REGISTRATION_SUCCESS:
      const userInfo: IUser = JSON.parse(action.payload).user;
      return Object.assign({}, state, {
        isLogged: true,
        user: userInfo
      });
    case USER_INFO_CHANGED_SUCCESSFULLY:
      return Object.assign({}, state, {
        isLogged: true,
        user: JSON.parse(action.payload).user
      });
    case LOGOUT_SUCCES:
      return { ...state, isLogged: false, user: undefined };
    default:
      return state;
  }
}
