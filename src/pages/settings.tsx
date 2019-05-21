import * as React from 'react'
import * as request from 'superagent';
import { IUser } from '../interfaces/IUser';
import { ErrorList } from '../components/error-list';
import { IError } from '../interfaces/IError';

interface IState {
    password?: string;
    email?: string;
    userName?: string;
    user?: IUser;
    userBio?: string;
    userImage?: string;
    errors?: IError;
}
interface IProps {

}


export class Settings extends React.Component {
    readonly state = {} as IState;
    constructor(props: IProps) {
        super(props);
        this.updateSettings = this.updateSettings.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    handleChange(e: any, id: string) {
        this.setState({ [id]: e.target.value });

    }
    handleError(error: any) {
        if (error.response.statusCode === 401) {
            this.setState(error.response.body)
        } else {
            console.log(error.response.text);
        }
    }
    updateSettings(e: any) {
        e.preventDefault();
        request.put('https://conduit.productionready.io/api/user')
            .send({ password: this.state.password, email: this.state.email, name: this.state.userName, image: this.state.userImage, bio: this.state.userBio })
            .then(resp => this.setState({ errors: undefined, user: resp.body.user }))
            .catch(err => this.handleError(err));
    }
    render() {
        return <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form onSubmit={this.updateSettings}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control" type="text" placeholder="URL of profile picture" onChange={e => this.handleChange(e, "usarImage")} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Your Name" onChange={e => this.handleChange(e, "userName")} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea className="form-control form-control-lg" rows={8} placeholder="Short bio about you" onChange={e => this.handleChange(e, "userBio")} ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Email" onChange={e => this.handleChange(e, "email")} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="password" placeholder="Password" onChange={e => this.handleChange(e, "password")} />
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
    }
}