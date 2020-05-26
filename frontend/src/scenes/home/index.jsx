import React, { Component } from 'react';

import Top from '../../components/top/index.jsx';
import RegisterForm from '../../components/registerForm/index.jsx';

class Home extends Component {

  componentWillMount(){
    sessionStorage.clear();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }

  render() {
    return(
    <div>
        <Top message = {"UNAcarreo"}
             isUser = {false}
             isDriver = {false}/>
        
        <RegisterForm isDriver = {false}
                      isHome ={true}/>
      
      </div>
    )
  }
}

export default Home;
