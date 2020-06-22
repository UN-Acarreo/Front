import React, { Component } from 'react';

import Top from '../../components/top/index.jsx';
import Profile from '../../components/profile/index.jsx';


class ProfileDriver extends Component {
  render() {
    return (

      <div>
        <Top message = {"UNAcarreo"}
             isUser = {false}
             isDriver = {true}/>
        <Profile  isUser = {false}
                  isDriver = {true}/>
      
      </div>

    )
  }
}

export default ProfileDriver;
