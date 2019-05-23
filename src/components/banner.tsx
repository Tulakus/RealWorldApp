import * as React from "react";

export interface IProps {
  title: string;
  children: React.ReactNode;
}

export class Banner extends React.Component<IProps> {
  public render() {
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.title}</h1>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
