import React, { Component } from 'react';

import Top from '../../components/top/index.jsx';
import RegisterForm from '../../components/registerForm/index.jsx';

class LoginUser extends Component {
  render() {
    return (

      <div>
      <Top message = {"UNAcarreo"}/>
      
      <RegisterForm isDriver = {false}
                    isHome ={false}/>
      
      </div>

    )
  }
}

export default LoginUser;
