import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import "./App.css";
import agentWrapper from "./helpers/agentWrapper";
import { getCurrentUserInfo } from "./helpers/apiHelper";
import { TOKEN } from "./helpers/authenticationMiddleware";
import { IUser } from "./interfaces/IUser";
import ArticlePage from "./pages/articlePage";
import { Header } from "./pages/header";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Settings from "./pages/settings";
import { browserHistory, IAppState } from "./store/rootReducer";

interface IAppProps {
  isAuthenticated: boolean;
  user: IUser | undefined;
}

class App extends React.Component<IAppProps & IMapDispatchToProps> {
  public componentWillMount() {
    const token = localStorage.getItem(TOKEN);
    if (!!token) {
      agentWrapper.Token = token;
      if (!!this.props.user) {
        this.props.getUserInfo();
      }
    }
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
    isAuthenticated: state.authentication.isLogged,
    user: state.authentication.user
  };
};

interface IMapDispatchToProps {
  getUserInfo: () => void;
}
export const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
  ownprops: any
): IMapDispatchToProps => {
  return {
    getUserInfo: () => dispatch(getCurrentUserInfo)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
