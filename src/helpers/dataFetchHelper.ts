import { ThunkDispatch } from "redux-thunk";
import * as request from "superagent";
import { fetchingFinished, fetchingStarted } from "../reducers/loader";

export function post<TRequestData extends object>(
  url: string,
  actionType: string,
  data: TRequestData = {} as TRequestData
): any {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(fetchingStarted());

    request
      .post(url)
      .send(data)
      .then(response => {
        if (!response.ok) {
          throw Error(response.body.statusText);
        }
        dispatch(fetchSuccess(actionType, response.body));
      })
      .catch(err => dispatch(fetchError("ERROR", err.response)))
      .finally(() => dispatch(fetchingFinished()));
  };
}

export function get<TQueryData extends object>(
  url: string,
  actionType: string,
  queryData: TQueryData = {} as TQueryData
): any {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(fetchingStarted());

    request
      .get(url)
      .query(queryData)
      .then(response => {
        if (!response.ok) {
          throw Error(response.body.statusText);
        }
        // tslint:disable-next-line:no-console
        console.log(actionType);
        dispatch(fetchSuccess(actionType, response.body));
      })
      .catch(err => dispatch(fetchError("ERROR", err.response)))
      .finally(() => dispatch(fetchingFinished()));
  };
}

export function put<TPutData extends object>(
  url: string,
  actionType: string,
  data: TPutData = {} as TPutData
): any {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(fetchingStarted());

    request
      .put(url)
      .send(data)
      .then(response => {
        if (!response.ok) {
          throw Error(response.body.statusText);
        }
        dispatch(fetchSuccess(actionType, response.body));
      })
      .catch(err => dispatch(fetchError("ERROR", err.response)))
      .finally(() => dispatch(fetchingFinished()));
  };
}

export function del<TDeleteData extends object>(
  url: string,
  actionType: string,
  data: TDeleteData = {} as TDeleteData
): any {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(fetchingStarted());

    request
      .delete(url)
      .send(data)
      .then(response => {
        if (!response.ok) {
          throw Error(response.body.statusText);
        }
        dispatch(fetchSuccess(actionType, response.body));
      })
      .catch(err => dispatch(fetchError("ERROR", err.response)))
      .finally(() => dispatch(fetchingFinished()));
  };
}

function fetchSuccess(type: string, response: request.Response) {
  return {
    payload: JSON.stringify(response),
    type
  };
}

function fetchError(type: string, err: request.Response) {
  return {
    payload: err.body.errors,
    type
  };
}
