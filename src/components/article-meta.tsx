import * as React from 'react';

export interface IProps {
    img?: string;
    name?: string;
    date?: string;
    hearts?: number;
    followers?: number;
}

export class ArticleMeta extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }
    render() {
        return <div className="article-meta">
            <a href=""><img src={this.props.img} /></a>
            <div className="info">
                <a href="" className="author">{this.props.name}</a>
                <span className="date">{this.props.date}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {this.props.name}
                <span className="counter">({!!this.props.followers && this.props.followers || 0})</span>
            </button>
            &nbsp;&nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp;
                Favorite Post
                            <span className="counter">({!!this.props.hearts && this.props.hearts || 0})</span>
            </button>
        </div>
    }
}