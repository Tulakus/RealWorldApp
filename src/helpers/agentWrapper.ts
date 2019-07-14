import { ThunkDispatch } from "redux-thunk";
import * as request from "superagent";
import { cleanErrors, ERROR } from "../reducers/errorHandler";
import { fetchingFinished, fetchingStarted } from "../reducers/loader";

class AgentWrapper {
  // tslint:disable-next-line:variable-name
  private _token: string = "";
  set Token(token: string) {
    console.log("token: " + token);
    this._token = token;
  }

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

      return agentRequest
        .set("authorization", this._token === "" ? "" : `Token ${this._token}`)
        .then(
          response => {
            dispatch(this.onFetchSuccess(actionType, response.body));
            dispatch(fetchingFinished);
            return Promise.resolve(response.body);
          },
          error => {
            // tslint:disable-next-line:no-debugger
            debugger;
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
      payload: this.transformErrors(err),
      type: ERROR
    };
  }

  private transformErrors(response: request.Response) {
    console.log(response);

    if (!!response.body && response.body.hasOwnProperty("errors")) {
      return response.body.errors;
    } else {
      return response.error;
    }
  }
}

export default new AgentWrapper();
