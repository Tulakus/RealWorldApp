import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import { Article } from "./pages/article";
import { Header } from "./pages/header";
import { Home } from "./pages/home";
import Login from "./pages/login";
import { Profile } from "./pages/profile";
import Register from "./pages/register";
import { Settings } from "./pages/settings";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path={"/register"} component={Register} />
          <Route path={"/login"} component={Login} />
          <Route path={"/settings"} component={Settings} />
          <Route path={"/article/:slug"} component={Article} />
          <Route path={"/profile/:username/:favorited?"} component={Profile} />
          <Route component={Register} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
