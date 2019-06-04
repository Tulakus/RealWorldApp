import { ThunkDispatch } from "redux-thunk";
import { IRegistrationRequest, registerUser } from "../helpers/apiHelper";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";
import { AppState } from "../store/rootStore";
import {
  CHANGE_VALUE,
  changeValue,
  IChangeValueAction
} from "./actions/changeValueAction";

export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";

interface IRegistrationState {
  password: string;
  email: string;
  username: string;
  user?: IUser;
  errors?: IError;
}

interface IFetchedDataAction {
  type: typeof REGISTRATION_SUCCESS;
  user: IUser;
}

export function registrationSuccess(user: IUser): IFetchedDataAction {
  return {
    type: REGISTRATION_SUCCESS,
    user
  };
}

export interface IMapDispatchToProps {
  changeValue: (key: string, value: string) => void;
  registration: (data: IRegistrationRequest) => void;
}

export interface IMapStateToProps {
  email: string;
  password: string;
  username: string;
  errors?: IError;
}

export type RegistrationActionTypes = IChangeValueAction | IFetchedDataAction;

const initialState: IRegistrationState = {
  email: "tulakuss@realworld.com",
  password: "Password*",
  username: "tulakuss"
};

export function registrationReducer(
  state: IRegistrationState = initialState,
  action: RegistrationActionTypes
): IRegistrationState {
  switch (action.type) {
    case CHANGE_VALUE:
      return Object.assign({}, state, {
        [action.key]: action.value
      });
    case REGISTRATION_SUCCESS:
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
    registration: (data: IRegistrationRequest) => dispatch(registerUser(data))
  };
};

export const mapStateToProps = (
  state: AppState,
  ownprops: any
): IMapStateToProps => {
  return {
    email: state.registration.email,
    errors: state.registration.errors,
    password: state.registration.password,
    username: state.registration.username
  };
};

export interface IRegistrationProps
  extends IMapDispatchToProps,
    IMapStateToProps {
  errors?: IError;
}
