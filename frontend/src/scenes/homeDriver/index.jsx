import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './styles.module.css';

import Top from '../../components/top/index.jsx';
import MapContainer from '../../components/mapContainer/index.jsx';

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

                <div style={{ height: '100%', width: '50%' }}>
                <MapContainer />
                </div>
            
        </div> 
            
      </div>
    )
  }
}

export default HomeDriver;
