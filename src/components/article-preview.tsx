import * as React from "react";
import { Link } from 'react-router-dom';

export interface IProps {
    img: string;
    name: string;
    date: string;
    articleName: string;
    description: string;
    hearts: number;
    slug: string;
}

export class ArticlePreview extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props)
    }
    render() {
        return <div className="article-preview">
            <div className="article-meta">
                <Link to={`/profile/${this.props.name}`}><img src={this.props.img} /></Link>
                <div className="info">
                    <Link to={`/profile/${this.props.name}`} className="author">{this.props.name}</Link>
                    <span className="date">{this.props.date}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {this.props.hearts}
                </button>
            </div>
            <Link to={`/article/${this.props.slug}`} className="preview-link">
                <h1>{this.props.articleName}</h1>
                <p>{this.props.description}</p>
                <span>Read more...</span>
            </Link>
        </div>
    }
}