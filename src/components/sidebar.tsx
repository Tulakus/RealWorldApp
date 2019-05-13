import * as React from 'react';

interface IProps {
    title: string
}

export class Sidebar extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return <div className="sidebar">
            <p>Popular Tags</p>
            {this.props.children}
        </div>
    }
} 