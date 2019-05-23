import * as React from "react";
import { Link } from "react-router-dom";
import * as request from "superagent";
import { ErrorList } from "../components/error-list";
import { IError } from "../interfaces/IError";
import { IUser } from "../interfaces/IUser";

interface IState {
  password?: string;
  email?: string;
  userName?: string;
  user?: IUser;
  errors?: IError;
}

export class Register extends React.Component<{}, IState> {
  public readonly state = {} as IState;
  constructor(props: Readonly<{}>) {
    super(props);
    this.register = this.register.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  public handleChange(e: any, id: string) {
    this.setState({ [id]: e.target.value });
  }
  public handleError(error: any) {
    if (error.response.statusCode === 422) {
      this.setState(error.response.body);
    }
  }
  public register(e: any) {
    e.preventDefault();
    request
      .post("https://conduit.productionready.io/api/users")
      .send({
        email: this.state.email,
        name: this.state.userName,
        password: this.state.password
      })
      .then(resp => this.setState({ errors: undefined, user: resp.body.user }))
      .catch(err => this.handleError(err));
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

              <ErrorList errors={this.state.errors} />

              <form onSubmit={this.register}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    onChange={e => this.handleChange(e, "userName")}
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
