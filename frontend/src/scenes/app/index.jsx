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
import ProfileUser from "../../scenes/profileUser/index.jsx";
import ProfileDriver from "../../scenes/profileDriver/index.jsx";
import StartUser from "../../scenes/startUser/index.jsx";
import StartDriver from "../../scenes/startDriver/index.jsx";
import UserHaulages from "../../scenes/userHaulages/index.jsx";


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
            <Route exact path="/user/profile" component={ProfileUser}/>
            <Route exact path="/driver/profile" component={ProfileDriver}/>
            <Route exact path="/user/start" component={StartUser}/>
            <Route exact path="/driver/start" component={StartDriver}/>
            <Route exact path="/user/haulages" component={UserHaulages}/>
          </Switch>

       </div>
    )
  }
}

export default App;
