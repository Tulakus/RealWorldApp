import { boundMethod } from "autobind-decorator";
import * as React from "react";
import { connect } from "react-redux";
import { ISettingsRequest } from "../helpers/apiHelper";
import {
  ISettingsnProps as ISettingsProps,
  mapDispatchToProps,
  mapStateToProps
} from "../reducers/settings";

interface IState {
  password?: string;
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
}

class Settings extends React.Component<ISettingsProps, IState> {
  public readonly state: IState = {
    bio: this.props.bio,
    email: this.props.email,
    image: this.props.image,
    password: undefined,
    username: this.props.username
  };

  @boundMethod
  public handleChange(e: any, id: string) {
    this.setState({ [id]: e.target.value });
  }

  @boundMethod
  public updateSettings(e: any) {
    e.preventDefault();
    const settings: ISettingsRequest = {
      user: {
        bio: this.state.bio,
        email: this.state.email,
        image: this.state.image,
        name: this.state.username
      }
    };
    if (!!this.state.password) {
      settings.user.password = this.state.password;
    }
    this.props.updateSettings(settings);
  }

  @boundMethod
  public logout() {
    this.props.logout();
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
                      onChange={e => this.handleChange(e, "image")}
                      value={this.state.image}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      onChange={e => this.handleChange(e, "username")}
                      value={this.state.username}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      onChange={e => this.handleChange(e, "bio")}
                      value={this.state.bio}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      onChange={e => this.handleChange(e, "email")}
                      value={this.state.email}
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
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <hr />
              <button
                className="btn btn-lg btn-outline-danger pull-xs-left"
                onClick={e => this.logout()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
