import * as React from "react";
import { connect } from "react-redux";
import {
  ISettingsnProps,
  mapDispatchToProps,
  mapStateToProps
} from "../reducers/settings";

interface IState {
  password?: string;
  email?: string;
  userName?: string;
  userBio?: string;
  userImage?: string;
}

class Settings extends React.Component<ISettingsnProps, IState> {
  public readonly state = {
    email: this.props.email,
    password: this.props.password,
    userBio: this.props.userBio,
    userImage: this.props.userImage,
    userName: this.props.userName
  } as IState;

  constructor(props: ISettingsnProps) {
    super(props);
    this.updateSettings = this.updateSettings.bind(this);
  }

  public handleChange(e: any, id: string) {
    this.setState({ [id]: e.target.value });
  }

  public updateSettings(e: any) {
    e.preventDefault();
    this.props.updateSettings({
      user: {
        bio: this.state.userBio,
        email: this.state.email,
        image: this.state.userImage,
        name: this.state.userName,
        password: this.state.password
      }
    });
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
                      onChange={e => this.handleChange(e, "userImage")}
                      value={this.state.userImage}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      onChange={e => this.handleChange(e, "userName")}
                      value={this.state.userName}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={8}
                      placeholder="Short bio about you"
                      onChange={e => this.handleChange(e, "userBio")}
                      value={this.state.userBio}
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
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
