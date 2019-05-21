import * as React from 'react';
import { ArticlePreview } from '../components/article-preview';
import { TagsList } from '../components/tag-list';
import { Pagination } from '../components/pagination';
import { Sidebar } from '../components/sidebar';
import { RouteComponentProps, Link } from 'react-router-dom';
import * as request from 'superagent';
import { IArticle } from '../interfaces/IArticle';
import { getDate } from '../helpers/helper';


const tags = [
    "programming", "javascript", "emberjs", "angularjs", "react", "mean", "node", "rails"
]

interface IMatchParams {
    tag: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {
}



interface IState {
    articles: IArticle[],
    tags: string[]
    articlesCount: number,
    tag: string,
    isFetchingData: boolean
}

export class Home extends React.Component<IProps, IState> {
    readonly state: IState = { articles: [], articlesCount: 0, tags: [], tag: "", isFetchingData: true }
    componentDidMount() {
        const all_articles = request
            .get('https://conduit.productionready.io/api/articles')
            .query({
                "limit": 10,
                "offset": 0
            });
        const tags = request
            .get('https://conduit.productionready.io/api/tags')

        Promise.all([all_articles, tags])
            .then(value => value.forEach(i => this.setState(i.body)))
            .then(() => this.setState({ isFetchingData: false }));
    }
    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevState.tag === this.state.tag) {
            return;
        }
        request.get('https://conduit.productionready.io/api/articles')
            .query({
                "limit": 10,
                "offset": 0,
                "tag": this.state.tag
            })
            .then(resp => this.setState(resp.body))
            .then(() => this.setState({ tag: this.state.tag, isFetchingData: false }));
    }
    handle(e: React.MouseEvent<HTMLElement>) {
        alert(e.target)
        this.setState({ tag: "", isFetchingData: true });
    }
    handle2 = (e: string) =>
        this.setState({ tag: e, isFetchingData: true })
    render() {
        let isActive = this.state.tag !== "";
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
                                <li className="nav-item" onClick={e => this.handle}>
                                    <a href="" className={isActive ? "nav-link" : "nav-link active"}  >Global Feed</a>
                                </li>
                                {this.state.tag !== "" && <li className="nav-item">
                                    <a className={isActive ? "nav-link active" : "nav-link"} href="/" onClick={e => e.preventDefault()} >{'#' + this.state.tag}</a>
                                </li>}

                            </ul>
                        </div>
                        {this.state.isFetchingData === true
                            ? <div>Loading content...</div>
                            : this.state.articles.length > 0 && this.state.articles.map(i =>
                                <ArticlePreview
                                    img={i.author.image}
                                    name={i.author.username}
                                    date={getDate(i.createdAt)}
                                    articleName={i.title}
                                    favoriteCount={i.favoritesCount}
                                    description={i.description}
                                    slug={i.slug}
                                    favorited={i.favorited}
                                />)}
                    </div>
                    <div className="col-md-3">
                        {
                            <Sidebar
                                title={'Popular Tags'}>

                                {this.state.isFetchingData === true
                                    ? <div>Loading content...</div>
                                    : <TagsList
                                        tags={this.state.tags}
                                        onClick={this.handle2} />}
                            </Sidebar>}
                    </div>

                </div>
            </div>
            <Pagination pages={Math.floor(this.state.articlesCount / 10)} />
        </div >
    }
}


