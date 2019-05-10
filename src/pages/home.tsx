import * as React from 'react';
import { ArticlePreview } from '../components/article-preview';
import { TagsSidebar } from '../components/tags-sidebar';
import { RouteComponentProps, match } from 'react-router-dom';


const tags = [
    "programming", "javascript", "emberjs", "angularjs", "react", "mean", "node", "rails"
]

interface IMatchParams {
    tag: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {
}

export class Home extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return <div className="home-page">

            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="">{this.props.match.params.tag}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="">Global Feed</a>
                                </li>
                            </ul>
                        </div>

                        <ArticlePreview
                            img={"http://i.imgur.com/Qr71crq.jpg"}
                            name={"Eric Simons"}
                            date={"January 20th"}
                            articleName={"How to build webapps that scale"}
                            hearts={29}
                            description={"This is the description for the post."}
                        />

                        <ArticlePreview
                            img={"http://i.imgur.com/N4VcUeJ.jpg"}
                            name={"Albert Pai"}
                            date={"January 20th"}
                            articleName={"The song you won't ever stop singing. No matter how hard you try."}
                            hearts={32}
                            description={"This is the description for the post."}
                        />

                    </div>
                    <div className="col-md-3">
                        <TagsSidebar
                            tags={tags}
                        />
                    </div>

                </div>
            </div>

        </div>
    }
}
