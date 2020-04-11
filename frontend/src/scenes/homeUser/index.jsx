import React, { Component } from 'react';

import classNames from 'classnames';


import Top from '../../components/top/index.jsx';
import MapContainer from '../../components/mapContainer/index.jsx';

class HomeUser extends Component {
  render() {
     return(
    <div>
        <Top message = {"UNAcarreo"}/>
       
          
            <MapContainer />
        
       
      </div>
    )
  }
}

export default HomeUser;
