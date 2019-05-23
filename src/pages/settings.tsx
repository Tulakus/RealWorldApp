import * as React from "react";
import * as request from "superagent";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";

interface IState {
  password?: string;
  email?: string;
  userName?: string;
  user?: IUser;
  userBio?: string;
  userImage?: string;
  errors?: IError;
}

export class Settings extends React.Component<{}, IState> {
  public readonly state = {} as IState;
  constructor(props: Readonly<{}>) {
    super(props);
    this.updateSettings = this.updateSettings.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  public handleChange(e: any, id: string) {
    this.setState({ [id]: e.target.value });
  }
  public handleError(error: any) {
    if (error.response.statusCode === 401) {
      this.setState(error.response.body);
    }
  }
  public updateSettings(e: any) {
    e.preventDefault();
    request
      .put("https://conduit.productionready.io/api/user")
      .send({
        bio: this.state.userBio,
        email: this.state.email,
        image: this.state.userImage,
        name: this.state.userName,
        password: this.state.password
      })
      .then(resp => this.setState({ errors: undefined, user: resp.body.user }))
      .catch(err => this.handleError(err));
  }
  public render() {
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <form onSubmit={this.updateSettings}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      onChange={e => this.handleChange(e, "usarImage")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      onChange={e => this.handleChange(e, "userName")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      onChange={e => this.handleChange(e, "userBio")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      onChange={e => this.handleChange(e, "email")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      onChange={e => this.handleChange(e, "password")}
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right">
                    Update Settings
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
