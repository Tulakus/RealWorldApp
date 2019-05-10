import * as React from 'react';
import { ArticleMeta } from '../components/article-meta';

export interface IProps {
    isEditing?: boolean;
    isAuthor?: boolean;
    img?: string;
    name?: string;
    date?: string;
    title?: string;
    hearts?: number;
    followers?: number;
}

export class ArticleBanner extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
    }
    render() {
        return <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{this.props.title}</h1>
                    <ArticleMeta
                        followers={this.props.followers}
                        hearts={this.props.hearts}
                        img={this.props.img}
                        date={this.props.date}
                        name={this.props.name}
                    />
                </div>
            </div>
        </div>
    }
}