import React, { Component } from 'react';

import Top from '../../components/top/index.jsx';
import HomeContainer from '../../components/homeContainer/index.jsx';



class StartDriver extends Component {
  render() {
    return (

      <div >
        <Top message = {"UNAcarreo"}
             isUser = {false}
             isDriver = {true}/>
        <HomeContainer  isDriver = {true}
                        isUser ={false}/>
      
      
      </div>

    )
  }
}

export default StartDriver;
