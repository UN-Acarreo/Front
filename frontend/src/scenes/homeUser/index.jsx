import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './styles.module.css';
import moment from 'moment';


import Top from '../../components/top/index.jsx';
import MapContainer from '../../components/mapContainer/index.jsx';
import ModalContainer from '../../components/modal/index.jsx';
import Modal from "react-bootstrap/Modal";

import axios from 'axios';



const URL = 'http://localhost:3001'

interface State {

    show : boolean;
    showStart : boolean;
    showEnd : boolean;
    showDescription: boolean;
    date : Date;
    time : Date;
    description : string;
    weight : string;
    start : {};
    end : {};
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
      showEnd : false,
      showDescription : false,
      date : new Date(),
      time : new Date(),
      description : "",
      weight: "",
      start : {},
      end : {},
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

  handleDescription(){
    
   this.modalElement.current.openDescriptionModal();
  }

  setDate = (date) =>{

    var formatDate = moment(date).format('MMMM DD YYYY'); 

    this.setState({date :formatDate})
    console.log(formatDate);
    
  }

  setTime = (time) =>{

    var formatTime = moment(time).format('hh mm'); 

    this.setState({time :formatTime})
    console.log(formatTime);
    
  }

  setDescription = (description) =>{

    this.setState({description :description})
    
    
  }

  setWeight = (weight) =>{

    this.setState({weight :weight})
    
    
  }

  setStart = (start) =>{
    
    this.setState({start :start})
  }

  setEnd = (end) =>{
    
    this.setState({end :end})
  }

  async search() {

    url = URL+'/api/haulage/create'

    var info = JSON.parse(sessionStorage.login_info);

    var url;

    try{
      
      console.log(url)
    }
    catch(err){
      
      return ;
    }

    var request = { Origin_coord: this.state.start.lat.toString(), Destination_coord: this.state.end.lat.toString(), Weight: this.state.weight, Description: this.state.description, Comments: this.state.description,
                    Date:{Year:moment(this.state.date).format('YYYY'), Month:moment(this.state.date).month().toString(), Day:moment(this.state.date).format('DD'), Hour:moment(this.state.date).format('hh'), Minute:moment(this.state.date).format('mm')}, 
                    
                    Id_user: info.Id_user.toString(), duration: "2"
                  } 
    
    console.log(request);


    axios.post(url, {request})
        .then(res =>{
            if(res.data.status == 1){
                //vehicle registered
                console.log("Registro Exitoso")
               
            }else{
                // error management
                console.error("Se produjo un error al registrar el vehiculo")
                
            }
        }).catch((error) => {
          if (error.response) {
            
            console.log(error.response.data.error);	
            }
        })
    
  }
    
  render() {

    const {show, showStart, showEnd} = this.state;

     return(
      <div>
        <Top message = {"UNAcarreo"}
             isUser = {true}
             isDriver = {false}/>
        
        <ModalContainer ref = {this.modalElement}
                        onDateSelected = {this.setDate}
                        onTimeSelected = {this.setTime}
                        onDescriptionSaved = {this.setDescription}
                        onWeightSaved = {this.setWeight}
                         />

            <div className = {styles.test}>

                <div class="btn-group-vertical" style={{  width: '50%' }}>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.handleDate()}>FECHA</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.handleTimer()}>HORA DE INICIO</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.handleStart()}>ORIGEN</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.handleEnd()}>DESTINO</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.handleDescription()}>DESCRIPCION</button>
                  <button type="button" class="btn btn-secondary" style={{  background: 'black' }} onClick = {() => this.search()}>BUSCAR</button>
                </div>

                <MapContainer
                              ref = {this.mapElement}
                              showStart = {showStart}
                              showEnd = {showEnd}
                              onStartSelected = {this.setStart}
                              onEndSelected = {this.setEnd}
                              />
            
        </div> 
            
      </div>
    )
  }
}

export default HomeUser;
