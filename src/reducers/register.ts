import { ThunkDispatch } from "redux-thunk";
import { IRegistrationRequest, registerUser } from "../helpers/apiHelper";
import { navigateOnSuccess } from "../helpers/helper";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";
import { IAppState } from "../store/rootReducer";
import { IChangeValueAction } from "./actions/changeValueAction";

export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";

// tslint:disable-next-line:no-empty-interface
export interface IRegistrationState {}

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
  registration: (data: IRegistrationRequest) => void;
}

export interface IMapStateToProps {
  errors: IError | undefined;
}

export type RegistrationActionTypes = IFetchedDataAction; // IChangeValueAction |

const initialState: IRegistrationState = {};

export function registrationReducer(
  state: IRegistrationState = initialState,
  action: RegistrationActionTypes
): IRegistrationState {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      return state;
  }
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownprops: any
): IMapDispatchToProps => {
  return {
    registration: (data: IRegistrationRequest) =>
      dispatch(navigateOnSuccess(() => registerUser(data), ownprops, "/"))
  };
};

export const mapStateToProps = (state: IAppState): IMapStateToProps => {
  return {
    errors: state.error.errors
  };
};

export interface IRegistrationProps
  extends IMapDispatchToProps,
    IMapStateToProps {}
