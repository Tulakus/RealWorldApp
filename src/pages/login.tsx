import * as React from 'react';
import { Link } from 'react-router-dom';
import * as request from 'superagent';
import { IUser } from '../interfaces/IUser';
import { ErrorList } from '../components/error-list';
import { IError } from '../interfaces/IError';

interface IState {
    password?: string;
    email?: string;
    user?: IUser;
    errors?: IError
}
interface IProps {

}
export class Login extends React.Component<IProps, IState>{
    readonly state = {} as IState;
    constructor(props: IProps) {
        super(props);
        this.login = this.login.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    handleChange(e: any, id: string) {
        this.setState({ [id]: e.target.value });
    }
    login(e: any) {
        e.preventDefault();
        request.post('https://conduit.productionready.io/api/users/login')
            .send({ password: this.state.password, email: this.state.email })
            .then(resp => this.setState({ errors: undefined, user: resp.body.user }))
            .catch(err => this.handleError(err));
    }
    handleError(error: any) {
        if (error.response.statusCode === 422) {
            this.setState(error.response.body)
        } else {
            console.log(error.response.text);
        }
    }
    render() {
        return <div className="auth-page">
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
                                <input className="form-control form-control-lg" type="text" onChange={e => this.handleChange(e, "email")} placeholder="Email" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg" type="password" onChange={e => this.handleChange(e, "password")} placeholder="Password" />
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
                                Sign up
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    }
}
