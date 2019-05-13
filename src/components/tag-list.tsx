import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    tags: string[];
    onClick: (e: string) => void;
}

export class TagsList extends React.Component<IProps>{
    render() {
        return <div className="tag-list">
            {this.props.tags.map(i => <Link key={i} to="/" onClick={() => this.props.onClick(i)} className="tag-pill tag-default">{i}</Link>)}
        </div>
    }
} 