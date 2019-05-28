import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ErrorList } from "../components/error-list";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";
import {
  IRegistrationProps,
  mapDispatchToProps,
  mapStateToProps
} from "../reducers/register";

interface IState {
  password?: string;
  email?: string;
  userName?: string;
  user?: IUser;
  errors?: IError;
}

class Register extends React.Component<IRegistrationProps, {}> {
  public readonly state = {} as IState;
  constructor(props: IRegistrationProps) {
    super(props);
    this.registration = this.registration.bind(this);
  }
  public handleChange(e: any, key: string) {
    this.props.changeValue(key, e.target.value);
  }
  public registration(e: any) {
    e.preventDefault();
    this.props.registration(
      this.props.username,
      this.props.password,
      this.props.email
    );
  }
  public render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to={"/login"}>Have an account?</Link>
              </p>

              <ErrorList errors={this.props.errors} />

              <form onSubmit={this.registration}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    onChange={e => this.handleChange(e, "username")}
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
                  Sign up
                </button>
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
)(Register);
