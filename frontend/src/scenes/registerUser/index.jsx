import React, { Component } from 'react';

import Top from '../../components/top/index.jsx';
import RegisterForm from '../../components/registerForm/index.jsx';


class RegisterUser extends Component {
  render() {
    return (

      <div>
      <Top message = {"UNAcarreo"}/>
      
      <RegisterForm isDriver = {false}
                    isUser ={true}/>
      
      </div>

    )
  }
}

export default RegisterUser;
