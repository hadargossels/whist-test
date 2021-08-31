import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Admin from './components/Admin/Admin';
import Stats from './components/Stats/Stats';
import Home from './components/Home/Home';

const router = (
  <Router>
  <Switch>
     <Route exact path="/" component={App}/>
     <Route exact path="/Home" component={Home}/>
     <Route exact path="/Admin" component={Admin}/>
     <Route exact path="/Stats" component={Stats}/>
  </Switch>
  </Router>
)

ReactDOM.render(
  router,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
