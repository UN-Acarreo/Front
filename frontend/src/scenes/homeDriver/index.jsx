import React, { Component } from 'react';

//import classNames from 'classnames';

import styles from './styles.module.css';

import Top from '../../components/top/index.jsx';
import MapContainer from '../../components/mapContainer/index.jsx';

const data = [
  {
    name: "Sydney",
    title: "Sydney",
    lat: -33.847927,
    lng: 150.6517938,
    id: 1
  },
  {
    name: "Melbourne",
    title: "Melbourne",
    lat: -37.9722342,
    lng: 144.7729561,
    id: 2
  },
  {
    name: "Perth",
    title: "Perth",
    lat: -31.9546904,
    lng: 115.8350292,
    id: 3
  }
];

class HomeDriver extends Component {
  render() {
     return(
      <div>
        <Top message = {"UNAcarreo"}
             isUser = {false}
             isDriver = {true}/>

            <div className = {styles.test}>

                <div class="btn-group-vertical" style={{  width: '50%' }}>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>SERVICIO 1</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>SERVICIO 2</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>SERVICIO 3</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>SERVICIO 4</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>SERVICIO 5</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>SERVICIO 6</button>
                </div>

                
                <MapContainer 
                 
                 />
                
            
        </div> 
            
      </div>
    )
  }
}

export default HomeDriver;
