import React, { Component } from 'react';

import Top from '../../components/top/index.jsx';
import Profile from '../../components/profile/index.jsx';


class ProfileUser extends Component {
  render() {
    return (

      <div>
        <Top message = {"UNAcarreo"}
             isUser = {true}
             isDriver = {false}/>
        <Profile  isUser = {true}
                  isDriver = {false}/>
      
      </div>

    )
  }
}

export default ProfileUser;
