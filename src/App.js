import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Survey from './components/Survey';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div className="App-header">
            <Link to={'/'} className=""> <img src={logo} className="App-logo" alt="logo" /></Link>
            <h1>Welcome to React</h1>
          </div>
          <nav className="">
            <ul className="">
              <li><Link to={'/'} className=""> Home </Link></li>
            </ul>
          </nav>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/survey/:slug' component={Survey} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
