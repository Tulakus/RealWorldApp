import * as React from "react";
import { Link } from "react-router-dom";
import { createLoader } from "./loader";

interface IProps {
  tags: string[];
  onClick: (e: string) => void;
  loading: boolean;
}

export class TagsList extends React.Component<IProps> {
  public render() {
    return (
      <div className="tag-list">
        {this.props.loading
          ? createLoader()
          : this.props.tags.map(i => (
              <Link
                key={i}
                to="/"
                onClick={() => this.props.onClick(i)}
                className="tag-pill tag-default"
              >
                {i}
              </Link>
            ))}
      </div>
    );
  }
}
