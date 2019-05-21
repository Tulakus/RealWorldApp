import { IError } from "../interfaces/IError";
import * as React from 'react';

interface IProps {
    errors: IError | undefined;
}
export class ErrorList extends React.Component<IProps>{
    render() {
        if (!this.props.errors) {
            console.log(!this.props.errors)
            return null;
        }

        var errors = [];
        for (var error_name in this.props.errors!) {
            errors.push(<li>{error_name + " " + this.props.errors[error_name]}</li>);
        }

        return <ul className="error-messages">
            {errors}
        </ul>

    }
}