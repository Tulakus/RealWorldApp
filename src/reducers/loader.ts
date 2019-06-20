export const LOADING_STARTED = "LOADING_STARTED";
export const LOADING_FINISHED = "LOADING_FINISHED";

const initialLoaderState: ILoaderState = {
  loading: false
};

export interface ILoaderState {
  loading: boolean;
}

export interface ILoadStartedAction {
  type: typeof LOADING_STARTED;
}

export interface ILoadFinishedAction {
  type: typeof LOADING_FINISHED;
}

export function fetchingStarted(): ILoadStartedAction {
  return {
    type: LOADING_STARTED
  };
}

export function fetchingFinished(): ILoadFinishedAction {
  return {
    type: LOADING_FINISHED
  };
}

export type LoaderActionTypes = ILoadFinishedAction | ILoadStartedAction;

export function loaderReducer(
  state: ILoaderState = initialLoaderState,
  action: LoaderActionTypes
): ILoaderState {
  switch (action.type) {
    case LOADING_STARTED:
      return Object.assign({}, state, {
        loading: !state.loading
      });

    case LOADING_FINISHED:
      return Object.assign({}, state, {
        loading: !state.loading
      });
    default:
      return state;
  }
}
