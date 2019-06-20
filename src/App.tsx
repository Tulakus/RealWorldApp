import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ArticlePreview from "./pages/articlePreview";
import { Header } from "./pages/header";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Settings from "./pages/settings";
import { browserHistory, IAppState } from "./store/rootReducer";

interface IAppProps {
  isAuthenticated: boolean;
}

class App extends React.Component<IAppProps> {
  public render() {
    return (
      <ConnectedRouter history={browserHistory}>
        <Router>
          <Header isAuthenticated={this.props.isAuthenticated} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={"/register"} component={Register} />
            <Route path={"/login"} component={Login} />
            <Route path={"/settings"} component={Settings} />
            <Route path={"/article/:slug"} component={ArticlePreview} />
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

export const mapStateToProps = (state: IAppState, ownprops: any): IAppProps => {
  return {
    isAuthenticated: state.authentication.isLogged
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
