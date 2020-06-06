import React, { Component } from 'react';

import Top from '../../components/top/index.jsx';
import RegisterForm from '../../components/registerForm/index.jsx';

class RegisterDriver extends Component {
  componentWillMount(){
    sessionStorage.clear();
  }
  render() {
    return (

      <div>
        <Top message = {"UNAcarreo"}
             isUser = {false}
             isDriver = {false}/>
        
        <RegisterForm isDriver = {true}
                      isUser ={false}/>
      
      </div>

    )
  }
}

export default RegisterDriver;
