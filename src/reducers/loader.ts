export const LOADING_STARTED = "LOADING_STARTED";
export const LOADING_FINISHED = "LOADING_FINISHED";
export const CLEAR_LOADING_ACTIONS = "CLEAR_STORAGE";

export interface ILoaderState {
  loadingActions: string[];
}

export interface ILoadStartedAction {
  type: typeof LOADING_STARTED;
  actionTypeKey: string;
}

export interface ILoadFinishedAction {
  type: typeof LOADING_FINISHED;
  actionTypeKey: string;
}

export interface IClearStorageAction {
  type: typeof CLEAR_LOADING_ACTIONS;
}

export function fetchingStarted(action: string): ILoadStartedAction {
  return {
    actionTypeKey: action,
    type: LOADING_STARTED
  };
}

export function fetchingFinished(action: string): ILoadFinishedAction {
  return {
    actionTypeKey: action,
    type: LOADING_FINISHED
  };
}

export type LoaderActionTypes =
  | ILoadFinishedAction
  | ILoadStartedAction
  | IClearStorageAction;
const initialLoaderState: ILoaderState = {
  loadingActions: []
};

export function loaderReducer(
  state: ILoaderState = initialLoaderState,
  action: LoaderActionTypes
): ILoaderState {
  switch (action.type) {
    case LOADING_STARTED:
      return {
        loadingActions: [...state.loadingActions, action.actionTypeKey]
      };

    case LOADING_FINISHED:
      return {
        loadingActions: state.loadingActions.filter(
          i => i !== action.actionTypeKey
        )
      };
    case CLEAR_LOADING_ACTIONS:
      return {
        loadingActions: []
      };
    default:
      return state;
  }
}

export function IsLoadingInProgress(
  loadingActions: string[],
  ...actionKeyType: string[]
): boolean {
  const a = actionKeyType.filter(registeredAction =>
    loadingActions.some(i => i === registeredAction)
  );
  return a.length !== 0;
}
