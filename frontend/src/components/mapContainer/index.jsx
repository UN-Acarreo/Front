import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';


const mapStyles = {
  width: '100%',
  height: '100%',
 
};

const containerStyle = {
  position: 'absolute',  
  width: '50%',
  height: '100%',
  right: '0'
  
};

export class MapContaier extends Component {
  render() {
    return (

      
        <Map
          containerStyle={containerStyle}
          google={this.props.google}
          zoom={15}
          style={mapStyles}
          initialCenter={{
          lat: 4.624335,
          lng: -74.063644
        }}
      />
      
      
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCucq5tSydL5-_BuHtXWj_AAhlToFoFCLw'
})(MapContaier);