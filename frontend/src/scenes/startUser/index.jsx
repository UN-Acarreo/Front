import React, { Component } from 'react';

import Top from '../../components/top/index.jsx';
import HomeContainer from '../../components/homeContainer/index.jsx';



class StartUser extends Component {
  render() {
    return (

      <div >
        <Top message = {"UNAcarreo"}
             isUser = {true}
             isDriver = {false}/>
        <HomeContainer  isDriver = {false}
                        isUser ={true}/>
      
      
      </div>

    )
  }
}

export default StartUser;
