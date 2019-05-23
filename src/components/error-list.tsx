import * as React from "react";
import { IError } from "../interfaces/IError";

interface IProps {
  errors: IError | undefined;
}
export class ErrorList extends React.Component<IProps> {
  public render() {
    if (!this.props.errors) {
      return null;
    }

    const errors: React.ReactNode[] = [];
    Object.entries(this.props.errors).forEach(([errorName, errorValue]) => {
      errors.push(<li>{errorName + " " + errorValue}</li>);
    });

    return <ul className="error-messages">{errors}</ul>;
  }
}
