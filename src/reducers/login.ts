import { ThunkDispatch } from "redux-thunk";
import * as request from "superagent";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";
import { AppState } from "../store/rootStore";

const CHANGE_LOGIN_EMAIL = "CHANGE_LOGIN_EMAIL";
const CHANGE_LOGIN_PASSWORD = "CHANGE_LOGIN_PASSWORD";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const CHANGE_VALUE = "CHANGE_VALUE";

interface ILoginState {
  email: string;
  password: string;
  user?: IUser;
  errors?: IError;
}

interface IChangeEmailAction {
  type: typeof CHANGE_LOGIN_EMAIL;
  email: string;
}

interface IChangePasswordAction {
  type: typeof CHANGE_LOGIN_PASSWORD;
  password: string;
}

interface IHasErrorAction {
  type: typeof LOGIN_ERROR;
  error: any;
}

interface IFetchedDataAction {
  type: typeof LOGIN_SUCCESS;
  user: IUser;
}

interface IChangeValueAction {
  type: typeof CHANGE_VALUE;
  value: string;
  key: string;
}

export function changeValue(key: string, value: string): IChangeValueAction {
  return {
    key,
    type: CHANGE_VALUE,
    value
  };
}

export function loginHasError(error: any): IHasErrorAction {
  return {
    error,
    type: LOGIN_ERROR
  };
}

export function loginSuccess(user: IUser): IFetchedDataAction {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export interface IMapDispatchToProps {
  changeValue: (key: string, value: string) => void;
  login: (username: string, password: string) => void;
}

export interface IMapStateToProps {
  email: string;
  password: string;
  errors?: IError;
  user?: IUser;
}

export type LoginActionTypes =
  | IChangeValueAction
  | IHasErrorAction
  | IFetchedDataAction;

const initialState: ILoginState = {
  email: "tulak@tulak.com",
  password: "Pass2013*"
};

export function loginReducer(
  state: ILoginState = initialState,
  action: LoginActionTypes
): ILoginState {
  switch (action.type) {
    case CHANGE_VALUE:
      return Object.assign({}, state, {
        [action.key]: action.value
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        errors: action.error.errors
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      return state;
  }
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IMapDispatchToProps => {
  return {
    changeValue: (key, e) => dispatch(changeValue(key, e)),
    login: (username: string, password: string) => {
      request
        .post("https://conduit.productionready.io/api/users/login")
        .send({
          user: { email: username, password }
        })
        .then(resp => dispatch(loginSuccess(resp.body.user)))
        .catch(err => dispatch(loginHasError(err.response.body)));
    }
  };
};

export const mapStateToProps = (
  state: AppState,
  ownprops: any
): IMapStateToProps => {
  return {
    email: state.login.email,
    errors: state.login.errors,
    password: state.login.password,
    user: state.login.user
  };
};

export interface ILoginProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
