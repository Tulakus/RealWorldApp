import { IError } from "../interfaces/IError";

export const ERROR = "ERROR";
export const CLEAN_ERRORS = "CLEAN_ERRORS";

export interface IErrorState {
  errors: IError | undefined;
}
const initialState: IErrorState = {
  errors: {}
};

interface IErrorAction {
  type: typeof ERROR;
  payload: string;
}

interface ICleanErrorAction {
  type: typeof CLEAN_ERRORS;
}
export function cleanErrors(): ICleanErrorAction {
  return {
    type: CLEAN_ERRORS
  };
}
export type AuthenticationActionTypes = IErrorAction | ICleanErrorAction;

export function errorHandlingReducer(
  state: IErrorState = initialState,
  action: AuthenticationActionTypes
): IErrorState {
  switch (action.type) {
    case ERROR:
      return Object.assign({}, state, {
        errors: action.payload
      });
    case CLEAN_ERRORS:
      return state.errors === undefined
        ? state
        : {
            errors: undefined
          };
    default:
      return state;
  }
}
