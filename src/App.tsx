import React, { Component } from 'react';
import { Header } from './pages/header';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { Profile } from './pages/profile';

import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path={"/register"} component={Register} />
          <Route path={"/login"} component={Login} />
          <Route path={"/article/:id"} component={Profile} />
          <Route path={"/profile/:username"} component={Profile} />
          <Route component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
