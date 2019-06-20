import { ThunkDispatch } from "redux-thunk";
import * as request from "superagent";
import { cleanErrors, ERROR } from "../reducers/errorHandler";
import { fetchingFinished, fetchingStarted } from "../reducers/loader";

class FetchHelper {
  public post<TRequestData extends object>(
    url: string,
    actionType: string,
    data: TRequestData = {} as TRequestData
  ): any {
    return this.sendRequest(request.post(url).send(data), actionType);
  }
  public get<TQueryData extends object>(
    url: string,
    actionType: string,
    data: TQueryData = {} as TQueryData
  ): any {
    return this.sendRequest(request.get(url).query(data), actionType);
  }

  public put<TPutData extends object>(
    url: string,
    actionType: string,
    data: TPutData = {} as TPutData
  ): any {
    return this.sendRequest(request.put(url).send(data), actionType);
  }

  public del<TDeleteData extends object>(
    url: string,
    actionType: string,
    data: TDeleteData = {} as TDeleteData
  ): any {
    return this.sendRequest(request.delete(url).send(data), actionType);
  }
  private sendRequest(
    agentRequest: request.SuperAgentRequest,
    actionType: string
  ): any {
    return (dispatch: ThunkDispatch<{}, {}, any>) => {
      dispatch(fetchingStarted());
      dispatch(cleanErrors());
      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTcxOTIsInVzZXJuYW1lIjoidHVsYWt1c3MiLCJleHAiOjE1NjU3OTQ0MzN9.fX9WQlst0tTvdlCNk11sSMjwbpAHIkFtKnek9lKGDWk";

      return agentRequest.set("authorization", `Token ${token}`).then(
        response => {
          dispatch(this.onFetchSuccess(actionType, response.body));
          dispatch(fetchingFinished);
          return Promise.resolve(response.body);
        },
        error => {
          dispatch(this.onFetchError(error.response));
          dispatch(fetchingFinished);
          return Promise.reject(error.response);
        }
      );
    };
  }
  private onFetchSuccess(type: string, response: request.Response) {
    return {
      payload: JSON.stringify(response),
      type
    };
  }

  private onFetchError(err: request.Response) {
    return {
      payload: err.body.errors,
      type: ERROR
    };
  }
}

export default new FetchHelper();
