import { ThunkDispatch } from "redux-thunk";
import { ISettingsRequest, updateUserSettings } from "../helpers/apiHelper";
import { navigateOnFetchSuccess } from "../helpers/helper";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";

export interface IMapStateToProps {
  password?: string;
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export const mapStateToProps = (state: IAppState) => {
  const user = state.authentication.user!;
  return {
    bio: user.bio,
    email: user.email,
    image: user.image,
    password: "",
    username: user.username
  };
};

export interface IMapDispatchToProps {
  updateSettings: (data: ISettingsRequest) => void;
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownProps: any
): IMapDispatchToProps => {
  return {
    updateSettings: (data: ISettingsRequest) =>
      dispatch(
        navigateOnFetchSuccess(() => updateUserSettings(data), ownProps, "/")
      )
  };
};

export interface ISettingsnProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
