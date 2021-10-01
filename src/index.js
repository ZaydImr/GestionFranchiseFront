import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Franchise from './Components/Franchise';
import Agent from './Components/Agent';
import Error from './Components/Error';
import Account from './Components/Account';
import Footer from './Components/Footer';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'

ReactDOM.render(
  
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/administrateur' component={Admin} />
        <Route path='/agent' component={Agent} />
        <Route path='/franchise'  component={Franchise}  />
        <Route path='/account' component={Account} />
        <Route path='*' component={Error} />
      </Switch>
    </Router>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
