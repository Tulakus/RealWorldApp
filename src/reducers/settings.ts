import { ThunkDispatch } from "redux-thunk";
import { ISettingsRequest, updateUserSettings } from "../helpers/apiHelper";
import { IError } from "../interfaces/IError";
import { IAppState } from "../store/rootReducer";

export const SETTING_CHANGED_SUCCESSFULLY = "SETTING_CHANGED_SUCCESSFULLY";

export interface IMapStateToProps {
  password?: string;
  email?: string;
  userName?: string;
  userBio?: string;
  userImage?: string;
}
export interface ISettingChangedAction {
  type: typeof SETTING_CHANGED_SUCCESSFULLY;
  payload: string;
}

// tslint:disable-next-line:no-empty-interface
export interface ISettingsState {}

const initialState: ISettingsState = {};

export const mapStateToProps = (state: IAppState) => {
  return {
    email: "tulakuss@realworld.com",
    password: "",
    userBio: "i am Grut",
    userImage: "http://todo",
    userName: "tulakuss"
  };
};

export interface IMapDispatchToProps {
  updateSettings: (data: ISettingsRequest) => void;
}

export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): IMapDispatchToProps => {
  return {
    updateSettings: (data: ISettingsRequest) =>
      dispatch(updateUserSettings(data))
  };
};

export type SettingsActionTypes = ISettingChangedAction;

export function settingsReducer(
  state: ISettingsState = initialState,
  action: SettingsActionTypes
): ISettingsState {
  switch (action.type) {
    case SETTING_CHANGED_SUCCESSFULLY:
      return Object.assign({}, state, {
        user: JSON.parse(action.payload).user
      });
    default:
      return state;
  }
}

export interface ISettingsnProps extends IMapDispatchToProps, IMapStateToProps {
  errors?: IError;
}
