import * as React from "react";

export interface IProps {
    isEditing?: boolean;
    isAuthor?: boolean;
    img?: string;
    name?: string;
    date?: string;
    comment?: string;
}

export class Card extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }
    render() {
        const a = <div className="card">
            {
                this.props.isEditing === true ?
                    <form className="card comment-form">
                        <div className="card-block">
                            <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                        </div>
                        <div className="card-footer">
                            <img src={this.props.img} className="comment-author-img" />
                            <button className="btn btn-sm btn-primary">
                                Post Comment
                    </button>
                        </div>
                    </form>
                    :
                    <div>
                        <div className="card-block">
                            <p className="card-text">{this.props.comment}</p>
                        </div>
                        <div className="card-footer">
                            <a href="" className="comment-author">
                                <img src={this.props.img} className="comment-author-img" />
                            </a>
                            &nbsp;
                        <a href="" className="comment-author">{this.props.name}</a>
                            <span className="date-posted">{this.props.date}</span>
                            {this.props.isAuthor !== undefined && this.props.isAuthor &&
                                <span className="mod-options">
                                    <i className="ion-edit"></i>
                                    <i className="ion-trash-a"></i>
                                </span>
                            }

                        </div>
                    </div>
            }
        </div>

        return a;
    }
}