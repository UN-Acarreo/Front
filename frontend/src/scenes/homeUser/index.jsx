import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './styles.module.css';

import Top from '../../components/top/index.jsx';
import MapContainer from '../../components/mapContainer/index.jsx';
import ModalContainer from '../../components/modal/index.jsx';
import Modal from "react-bootstrap/Modal";


interface State {

    show : boolean;
    showStart : boolean;
    showEnd : boolean;
}

class HomeUser extends Component {

  constructor(props){
    super(props);
    
    this.modalElement = React.createRef();
    this.mapElement = React.createRef();
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);


    this.state = {
      show : true,
      showStart : false,
      showEnd : false
      //
    }

    
  }

  handleDate(){
    this.modalElement.current.openDateModal();
  }

  handleTimer(){
    this.modalElement.current.openTimerModal();
  }

  handleStart(){
    this.setState({showStart :true})
    
  }

  handleEnd(){
    
    this.setState({showEnd :true})
  }
    
  render() {

    const {show, showStart, showEnd} = this.state;

     return(
      <div>
        <Top message = {"UNAcarreo"}
             isUser = {true}
             isDriver = {false}/>
        
        <ModalContainer ref = {this.modalElement}
                         />

            <div className = {styles.test}>

                <div class="btn-group-vertical" style={{  width: '50%' }}>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.handleDate()}>FECHA</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.handleTimer()}>HORA DE INICIO</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.handleStart()}>ORIGEN</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.handleEnd()}>DESTINO</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>DESCRIPCION</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }}>BUSCAR</button>
                </div>

                <MapContainer
                              ref = {this.mapElement}
                              showStart = {showStart}
                              showEnd = {showEnd}
                              
                              />
            
        </div> 
            
      </div>
    )
  }
}

export default HomeUser;
