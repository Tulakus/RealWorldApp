import { ThunkDispatch } from "redux-thunk";
import * as request from "superagent";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";
import { AppState } from "../store/rootStore";

const CHANGE_VALUE = "CHANGE_VALUE";
const REGISTRATION_ERROR = "REGISTRATION_ERROR";
const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";

interface IRegistrationState {
  password: string;
  email: string;
  username: string;
  user?: IUser;
  errors?: IError;
}

interface IChangeValueAction {
  type: typeof CHANGE_VALUE;
  value: string;
  key: string;
}

interface IHasErrorAction {
  type: typeof REGISTRATION_ERROR;
  error: any;
}

interface IFetchedDataAction {
  type: typeof REGISTRATION_SUCCESS;
  user: IUser;
}

export function changeValue(key: string, value: string): IChangeValueAction {
  return {
    key,
    type: CHANGE_VALUE,
    value
  };
}

export function registrationHasError(error: any): IHasErrorAction {
  return {
    error,
    type: REGISTRATION_ERROR
  };
}

export function registrationSuccess(user: IUser): IFetchedDataAction {
  return {
    type: REGISTRATION_SUCCESS,
    user
  };
}

export interface IMapDispatchToProps {
  changeValue: (key: string, value: string) => void;
  registration: (username: string, password: string, email: string) => void;
}

export interface IMapStateToProps {
  email: string;
  password: string;
  username: string;
  errors?: IError;
}

export type RegistrationActionTypes =
  | IChangeValueAction
  | IHasErrorAction
  | IFetchedDataAction;

const initialState: IRegistrationState = {
  email: "",
  password: "",
  username: ""
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
    case REGISTRATION_ERROR:
      return Object.assign({}, state, {
        errors: action.error.errors
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
    registration: (username: string, password: string, email: string) => {
      request
        .post("https://conduit.productionready.io/api/users")
        .send({
          user: { email, username, password }
        })
        .then(resp => dispatch(registrationSuccess(resp.body)))
        .catch(err => dispatch(registrationHasError(err.response.body)));
    }
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
