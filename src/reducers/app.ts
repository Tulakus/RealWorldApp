import { ThunkDispatch } from "redux-thunk";
import { getCurrentUserInfo } from "../helpers/apiHelper";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";
import { IAppState } from "../store/rootReducer";

export interface IMapStateToProps {
  isAuthenticated: boolean;
  user: IUser | undefined;
}

export const mapStateToProps = (
  state: IAppState,
  ownprops: any
): IMapStateToProps => {
  return {
    isAuthenticated: state.authentication.isLogged,
    user: state.authentication.user
  };
};

export interface IMapDispatchToProps {
  getUserInfo: () => void;
}
export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownprops: any
): IMapDispatchToProps => {
  return {
    getUserInfo: () => dispatch(getCurrentUserInfo())
  };
};

export interface IAppProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
