import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './styles.module.css';

import Top from '../../components/top/index.jsx';
import MapContainer from '../../components/mapContainer/index.jsx';

class HomeUser extends Component {
  render() {
     return(
      <div>
        <Top message = {"UNAcarreo"}
             isUser = {true}
             isDriver = {false}/>

            <div className = {styles.test}>

                <div class="btn-group-vertical" style={{  width: '50%' }}>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>FECHA</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>HORA DE INICIO</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>ORIGEN</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>DESTINO</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>DESCRIPCION</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>BUSCAR</button>
                </div>

                <MapContainer />
            
        </div> 
            
      </div>
    )
  }
}

export default HomeUser;
