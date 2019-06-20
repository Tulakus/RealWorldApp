import { ThunkDispatch } from "redux-thunk";
import { ILoginRequest, login } from "../helpers/apiHelper";
import { navigateOnFetchSuccess } from "../helpers/helper";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";
import { IChangeValueAction } from "./actions/changeValueAction";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

interface IFetchedDataAction {
  type: typeof LOGIN_SUCCESS;
  payload: string;
}

export interface IMapDispatchToProps {
  login: (data: ILoginRequest) => void;
}

export interface IMapStateToProps {
  errors: IError | undefined;
}

export type LoginActionTypes = IChangeValueAction | IFetchedDataAction;

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownProps: any
): IMapDispatchToProps => {
  return {
    login: (data: ILoginRequest) => {
      return dispatch(navigateOnFetchSuccess(() => login(data), ownProps, "/"));
    }
  };
};

export const mapStateToProps = (state: IAppState): IMapStateToProps => {
  return {
    errors: state.error.fetchError
  };
};

export interface ILoginProps extends IMapDispatchToProps, IMapStateToProps {}
