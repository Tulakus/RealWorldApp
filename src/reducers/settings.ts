import { ThunkDispatch } from "redux-thunk";
import { ISettingsRequest, updateUserSettings } from "../helpers/apiHelper";
import { navigate, navigateOnSuccess } from "../helpers/helper";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";
import { LOGOUT_SUCCES } from "./authentication";

export interface IMapStateToProps {
  password?: string;
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export const mapStateToProps = (state: IAppState) => {
  const user = state.authentication.user;
  if (user === undefined) {
    return;
  }
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
  logout: () => void;
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownProps: any
): IMapDispatchToProps => {
  return {
    logout: async () => {
      await dispatch({
        type: LOGOUT_SUCCES
      });
      navigate(ownProps, "/");
    },
    updateSettings: (data: ISettingsRequest) =>
      dispatch(navigateOnSuccess(() => updateUserSettings(data), ownProps, "/"))
  };
};

export interface ISettingsnProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
