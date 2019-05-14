import * as React from 'react';
import { RouteComponentProps, match } from 'react-router-dom';
import { ArticlePreview, IProps } from '../components/article-preview';

interface IMatchParams {
    username: string;
}

interface Props extends RouteComponentProps<IMatchParams> {
}

class Profile extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return <div className="profile-page">

            <div className="user-info">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" />
                            <h4>{this.props.match.params.username}</h4>
                            <p>
                                Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games
                            </p>
                            <button className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-plus-round"></i>
                                &nbsp;
                                Follow Eric Simons
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item">
                                    <a className="nav-link active" href="">My Articles</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="">Favorited Articles</a>
                                </li>
                            </ul>
                        </div>

                        <ArticlePreview
                            img={"http://i.imgur.com/Qr71crq.jpg"}
                            name={"Eric Simons"}
                            date={"January 20th"}
                            articleName={"How to build webapps that scale"}
                            description={"This is the description for the post."}
                            hearts={29}
                            slug={"slug"}
                        />
                    </div>

                </div>
            </div>

        </div>
    }
}

export { Profile }