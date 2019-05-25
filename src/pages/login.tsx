import * as React from "react";
import { Link } from "react-router-dom";
import * as request from "superagent";
import { ErrorList } from "../components/error-list";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";

interface IState {
  password?: string;
  email?: string;
  user?: IUser;
  errors?: IError;
}

export class Login extends React.Component<{}, IState> {
  public readonly state = {} as IState;
  constructor(props: Readonly<{}>) {
    super(props);
    this.login = this.login.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  public handleChange(e: any, id: string) {
    this.setState({ [id]: e.target.value });
  }
  public login(e: any) {
    e.preventDefault();
    request
      .post("https://conduit.productionready.io/api/users/login")
      .send({
        user: { password: this.state.password, email: this.state.email }
      })
      .then(resp => this.setState({ errors: undefined, user: resp.body.user }))
      .catch(err => this.handleError(err));
  }
  public handleError(error: any) {
    if (error.response.statusCode === 422) {
      this.setState(error.response.body);
    }
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

              <ErrorList errors={this.state.errors} />

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
