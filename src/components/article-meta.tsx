import * as React from "react";
import { getDate } from "../helpers/helper";

export interface IProps {
  img?: string;
  userName: string;
  date: string;
}

export class ArticleMeta extends React.Component<IProps> {
  public render() {
    return (
      <div className="article-meta">
        <a href="">
          <img src={this.props.img} />
        </a>
        <div className="info">
          <a href="" className="author">
            {this.props.userName}
          </a>
          <span className="date">{getDate(this.props.date)}</span>
        </div>
        {this.props.children}
      </div>
    );
  }
}
