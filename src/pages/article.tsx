import * as React from 'react';
import { Card } from '../components/card';
import { ArticleBanner } from '../components/article-banner';
import { ArticleMeta } from '../components/article-meta';
import * as request from 'superagent';
import { RouteComponentProps } from 'react-router'
import { IComment } from '../interfaces/IComment';
import { IArticle } from '../interfaces/IArticle';
import { getDate } from '../helpers/helper';

interface IProps {
    slug: string
}

interface IState {
    article: IArticle;
    comments: IComment[];
}
export class Article extends React.Component<RouteComponentProps<IProps>> {
    readonly state: IState = {} as IState;

    componentDidMount() {

        const articleRequest = request.get(`https://conduit.productionready.io/api/articles/${this.props.match.params.slug}`);
        const articleCommentsRequest = request.get(`https://conduit.productionready.io/api/articles/${this.props.match.params.slug}/comments`);

        Promise.all([articleRequest, articleCommentsRequest]).then(value => value.forEach(i => this.setState(i.body)))

    }
    render() {
        const article = this.state.article;
        return <div className="article-page">
            {!!article && <ArticleBanner
                img={article.author.image}
                title={article.title}
                name={article.author.username}
                date={getDate(article.createdAt)}
                followers={article.favorited}
                hearts={article.favoritesCount}
            />}

            <div className="container page">

                <div className="row article-content">
                    <div className="col-md-12">
                        {!!article && article.body}
                    </div>
                </div>

                <hr />

                <div className="article-actions">
                    {!!article && <ArticleMeta
                        img={article.author.image}
                        name={article.author.username}
                        date={getDate(article.createdAt)}
                        followers={article.favorited}
                        hearts={article.favoritesCount}
                    />}
                </div>

                <div className="row">

                    <div className="col-xs-12 col-md-8 offset-md-2">
                        <div>Sign in or sign up to add comments on this article.</div>
                        {!!this.state.comments && this.state.comments.map(comment => <Card
                            img={comment.author.image}
                            comment={comment.body}
                            name={comment.author.username}
                            date={getDate(comment.createdAt)}
                        />)}

                        {/*TODO : add this
                        <Card
                            isEditing={true}
                            img={"http://i.imgur.com/Qr71crq.jpg"}
                        />
                        <Card
                            img={"http://i.imgur.com/Qr71crq.jpg"}
                            comment={"With supporting text below as a natural lead-in to additional content."}
                            name={"Jacob Schmidt"}
                            date={"Dec 29th"}
                            isAuthor={true}
                        />*/}

                    </div>

                </div>

            </div>

        </div>
    }
}