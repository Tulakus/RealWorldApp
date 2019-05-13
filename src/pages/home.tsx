import * as React from 'react';
import { ArticlePreview } from '../components/article-preview';
import { TagsList } from '../components/tag-list';
import { Pagination } from '../components/pagination';
import { Sidebar } from '../components/sidebar';

import { RouteComponentProps, Link } from 'react-router-dom';
import * as request from 'superagent';


const tags = [
    "programming", "javascript", "emberjs", "angularjs", "react", "mean", "node", "rails"
]

interface IMatchParams {
    tag: string;
}

interface IProps extends RouteComponentProps<IMatchParams> {
}

interface IArticle {
    title: string,
    slug: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    tagList: string[],
    description: string,
    author: {
        username: string,
        bio: null,
        image: string,
        following: boolean
    },
    favorited: boolean,
    favoritesCount: number
}

interface IState {
    articles: IArticle[],
    tags: string[]
    articlesCount: number,
    tag: string,
    isLoading: boolean
}

export class Home extends React.Component<IProps, IState> {
    readonly state: IState = { articles: [], articlesCount: 0, tags: [], tag: "", isLoading: true }
    componentDidMount() {
        var all_articles = request
            .get('https://conduit.productionready.io/api/articles')
            .query({
                "limit": 10,
                "offset": 0
            })
        //.then(resp => this.setState(resp.body));

        var tags = request
            .get('https://conduit.productionready.io/api/tags')
        //.then(resp => this.setState(resp.body));

        Promise.all([all_articles, tags])
            .then(value => value.forEach(i => this.setState(i.body)))
            .then(() => this.setState({ isLoading: false }));
        //this.setState({ isLoading: false });
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
            .then(() => this.setState({ tag: this.state.tag, isLoading: false }));
    }
    handle(e: React.MouseEvent<HTMLElement>) {
        alert(e.target)
        this.setState({ tag: "", isLoading: true });
    }
    handle2 = (e: string) =>
        this.setState({ tag: e, isLoading: true })
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
                                <li className="nav-item" onClick={e => this.handle}>
                                    <a href="" className="nav-link active" >Global Feed</a>
                                </li>
                                {this.state.tag !== "" && <li className="nav-item">
                                    <a className="nav-link active" href="/" onClick={e => e.preventDefault()} >{this.state.tag}</a>
                                </li>}

                            </ul>
                        </div>
                        {this.state.isLoading === true
                            ? <div>Loading content...</div>
                            : this.state.articles.length > 0 && this.state.articles.map(i =>
                                <ArticlePreview
                                    img={i.author.image}
                                    name={i.author.username}
                                    date={getDate(i.createdAt)}
                                    articleName={i.title}
                                    hearts={i.favoritesCount}
                                    description={i.description}
                                />)}
                    </div>
                    <div className="col-md-3">
                        {
                            <Sidebar
                                title={'Popular Tags'}>

                                {this.state.isLoading === true
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


const getDate = (date: string) => {
    const tempDate = new Date(date);
    const a = tempDate.toLocaleDateString("en-us", {
        month: 'long',
        day: 'numeric'
    })
    return `${a}th`
}