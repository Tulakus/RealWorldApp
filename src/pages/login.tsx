import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ErrorList } from "../components/error-list";
import {
  ILoginProps,
  mapDispatchToProps,
  mapStateToProps
} from "./../reducers/login";

class Login extends React.Component<ILoginProps, {}> {
  constructor(props: ILoginProps) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  public handleChange(e: any, key: string) {
    this.props.changeValue(key, e.target.value);
  }
  public login(e: any) {
    e.preventDefault();
    this.props.login(this.props.email, this.props.password);
  }
  public render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to={"/register"}>Need an account?</Link>
              </p>
              <ErrorList errors={this.props.errors} />
              <p>tady jsou props - {this.props.email}</p>
              <form onSubmit={this.login}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    onChange={e => this.handleChange(e, "email")}
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    onChange={e => this.handleChange(e, "password")}
                    placeholder="Password"
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Sign in
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
)(Login);
