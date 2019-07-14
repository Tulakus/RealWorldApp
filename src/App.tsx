import { boundMethod } from "autobind-decorator";
import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import agentWrapper from "./helpers/agentWrapper";
import { TOKEN } from "./helpers/authenticationMiddleware";
import ArticleEditor from "./pages/article-editor";
import ArticlePage from "./pages/article-page";
import { Header } from "./pages/header";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Settings from "./pages/settings";
import { IAppProps, mapDispatchToProps, mapStateToProps } from "./reducers/app";
import { browserHistory } from "./store/rootReducer";

class App extends React.Component<IAppProps> {
  public componentWillMount() {
    const token = localStorage.getItem(TOKEN);
    if (!!token) {
      agentWrapper.Token = token;
      if (!this.props.user) {
        this.getInfo();
      }
    }
  }

  @boundMethod
  public getInfo() {
    this.props.getUserInfo();
  }

  public render() {
    return (
      <ConnectedRouter history={browserHistory}>
        <Router>
          <Header
            isAuthenticated={this.props.isAuthenticated}
            userName={
              (!!this.props.user && this.props.user.username) || undefined
            }
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home isAuthenticated={this.props.isAuthenticated} />
              )}
            />
            <Route path={"/register"} component={Register} />
            <Route path={"/login"} component={Login} />
            <Route path={"/settings"} component={Settings} />
            <Route path={"/article/:slug"} component={ArticlePage} />
            <Route path={"/editor/:slug?"} component={ArticleEditor} />
            <Route
              path={"/profile/:username/:favorited?"}
              component={Profile}
            />
            <Route component={Settings} />
          </Switch>
        </Router>
      </ConnectedRouter>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
