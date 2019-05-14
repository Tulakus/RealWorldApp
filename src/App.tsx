import React, { Component } from 'react';
import { Header } from './pages/header';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Profile } from './pages/profile';
import { Home } from './pages/home';
import { Settings } from './pages/settings';
import { Article } from './pages/article';

import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
          <Route path={"/profile/:username"} component={Profile} />
          <Route component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
