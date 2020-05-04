import React, { Component } from 'react';

import Top from '../../components/top/index.jsx';
import RegisterForm from '../../components/registerForm/index.jsx';

class Home extends Component {

  componentWillMount(){
    localStorage.clear();
    sessionStorage.clear();
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
