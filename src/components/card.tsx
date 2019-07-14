import { boundMethod } from "autobind-decorator";
import * as React from "react";

export interface IProps {
  isEditing?: boolean;
  isAuthor?: boolean;
  img?: string;
  name?: string;
  date?: string;
  comment?: string;
  id?: number;
  slug: string;
  addComment?: (comment: string, slug: string) => void;
  deleteComment?: (id: number, slug: string) => void;
}

interface IState {
  comment: string;
  isEditing: boolean;
}
export class Card extends React.Component<IProps, IState> {
  public readonly state: IState = {
    comment: this.props.comment || "",
    isEditing: !!this.props.isEditing
  };

  @boundMethod
  public changeComment(comment: string) {
    this.setState({
      comment
    });
  }

  @boundMethod
  public addComment(e: any) {
    e.preventDefault();
    this.changeComment("");
    this.props.addComment!(this.state.comment, this.props.slug);
  }

  @boundMethod
  public deleteComment(e: any) {
    e.preventDefault();
    this.props.deleteComment!(this.props.id!, this.props.slug);
  }

  public render() {
    const card = (
      <div className="card">
        {this.state.isEditing ? (
          <form className="card comment-form">
            <div className="card-block">
              <textarea
                className="form-control"
                placeholder="Write a comment..."
                rows={3}
                onChange={e => this.changeComment(e.target.value)}
                value={this.state.comment}
              />
            </div>
            <div className="card-footer">
              <img src={this.props.img} className="comment-author-img" />
              <button
                className="btn btn-sm btn-primary"
                onClick={e => this.addComment(e)}
              >
                Post Comment
              </button>
            </div>
          </form>
        ) : (
          <div key={this.props.id}>
            <div className="card-block">
              <p className="card-text">{this.props.comment}</p>
            </div>
            <div className="card-footer">
              <a href="" className="comment-author">
                <img src={this.props.img} className="comment-author-img" />
              </a>
              &nbsp;
              <a href="" className="comment-author">
                {this.props.name}
              </a>
              <span className="date-posted">{this.props.date}</span>
              {this.props.isAuthor !== undefined && this.props.isAuthor && (
                <span className="mod-options">
                  <i
                    className="ion-trash-a"
                    onClick={e => this.deleteComment(e)}
                  />
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );

    return card;
  }
}
