import { ThunkDispatch } from "redux-thunk";
import { ILoginRequest, login } from "../helpers/apiHelper";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";
import { AppState } from "../store/rootStore";
import {
  CHANGE_VALUE,
  changeValue,
  IChangeValueAction
} from "./actions/changeValueAction";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

interface ILoginState {
  email: string;
  password: string;
  user?: IUser;
  errors?: IError;
}

interface IFetchedDataAction {
  type: typeof LOGIN_SUCCESS;
  payload: string;
}

export interface IMapDispatchToProps {
  changeValue: (key: string, value: string) => void;
  login: (data: ILoginRequest) => void;
}

export interface IMapStateToProps {
  email: string;
  password: string;
  errors?: IError;
  user?: IUser;
}

export type LoginActionTypes = IChangeValueAction | IFetchedDataAction;

const initialState: ILoginState = {
  email: "tulakuss@realworld.com",
  password: "Password*"
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
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        user: JSON.parse(action.payload).user
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
    login: (data: ILoginRequest) => {
      dispatch(login(data));
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
