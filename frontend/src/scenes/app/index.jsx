import React, { Component } from 'react';

import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import RegisterUser from "../../scenes/registerUser/index.jsx";
import RegisterDriver from "../../scenes/registerDriver/index.jsx";
import Home from "../../scenes/home/index.jsx";
import HomeUser from "../../scenes/homeUser/index.jsx";
import HomeDriver from "../../scenes/homeDriver/index.jsx";


class App extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/user/signup" component={RegisterUser}/>
            <Route exact path="/driver/signup" component={RegisterDriver}/>
            <Route exact path="/user/home" component={HomeUser}/>
            <Route exact path="/driver/home" component={HomeDriver}/>
          </Switch>

       </div>
    )
  }
}

export default App;
