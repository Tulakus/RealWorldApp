import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    tags: string[]
}

export class TagsSidebar extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return <div className="sidebar">
            <p>Popular Tags</p>

            <div className="tag-list">
                {this.props.tags.map(i => <Link to={`/`} key={i} href="" className="tag-pill tag-default">{i}</Link>)}
            </div>
        </div>
    }
} 