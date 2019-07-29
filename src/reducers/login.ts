import { ThunkDispatch } from "redux-thunk";
import { ILoginRequest, login } from "../helpers/apiHelper";
import { navigateOnSuccess } from "../helpers/helper";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";
import { cleanErrors } from "./errorHandler";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

interface IFetchedDataAction {
  type: typeof LOGIN_SUCCESS;
  payload: string;
}

export interface IMapDispatchToProps {
  login: (data: ILoginRequest) => void;
  clean: () => void;
}

export interface IMapStateToProps {
  errors: IError | undefined;
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownProps: any
): IMapDispatchToProps => {
  return {
    clean: () => dispatch(cleanErrors()),
    login: (data: ILoginRequest) =>
      dispatch(navigateOnSuccess(() => login(data), ownProps, "/"))
  };
};

export const mapStateToProps = (state: IAppState): IMapStateToProps => {
  return {
    errors: state.error.errors
  };
};

export interface ILoginProps extends IMapDispatchToProps, IMapStateToProps {}
