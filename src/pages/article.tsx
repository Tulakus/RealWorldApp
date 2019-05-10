import * as React from 'react';
import { Card } from '../components/card';
import { ArticleBanner } from '../components/article-banner';
import { ArticleMeta } from '../components/article-meta';



export class Article extends React.Component {
    render() {
        return <div className="article-page">
            <ArticleBanner
                img={"http://i.imgur.com/Qr71crq.jpg"}
                title={"How to build webapps that scale"}
                name={"Jacob Schmidt"}
                date={"January 20th"}
                followers={10}
                hearts={29}
            />
            <div className="container page">

                <div className="row article-content">
                    <div className="col-md-12">
                        <p>
                            Web development technologies have evolved at an incredible clip over the past few years.
                        </p>
                        <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                        <p>It's a great solution for learning how other frameworks work.</p>
                    </div>
                </div>

                <hr />

                <div className="article-actions">
                    <ArticleMeta
                        followers={10}
                        hearts={29}
                        img={"http://i.imgur.com/Qr71crq.jpg"}
                        date={"January 20th"}
                        name={"Eric Simons"}
                    />
                </div>

                <div className="row">

                    <div className="col-xs-12 col-md-8 offset-md-2">
                        <Card
                            isEditing={true}
                            img={"http://i.imgur.com/Qr71crq.jpg"}
                        />

                        <Card
                            img={"http://i.imgur.com/Qr71crq.jpg"}
                            comment={"With supporting text below as a natural lead-in to additional content."}
                            name={"Jacob Schmidt"}
                            date={"Dec 29th"}
                        />

                        <Card
                            img={"http://i.imgur.com/Qr71crq.jpg"}
                            comment={"With supporting text below as a natural lead-in to additional content."}
                            name={"Jacob Schmidt"}
                            date={"Dec 29th"}
                            isAuthor={true}
                        />

                    </div>

                </div>

            </div>

        </div>
    }
}