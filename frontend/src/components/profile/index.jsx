import React, { Component } from 'react';

import styles from './styles.module.css';
import axios from 'axios';

import classNames from "classnames";


interface Props{
  isDriver :  boolean;
  isUser :    boolean;
}

interface State {

    name:                 string,
    last_name:            string,
    address:              string,
    email:                string,
    phone:                string,
    identity_card:        string,

}

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      last_name: '',
      address: '',
      email: '',
      phone: '',
      identity_card: ''
      
    }
  }

  componentWillMount(){
    
    var info = JSON.parse(sessionStorage.login_info);

    console.log(this.props.isUser);
    
    if(this.props.isUser){
      this.setState({
        name: info.User_name,
        last_name : info.User_last_name,
        address : info.User_address,
        email : info.User_Email
      });
    } else {

      var vehicle_info = JSON.parse(sessionStorage.vehicle_info);

      this.setState({
        name: info.Driver_name,
        last_name : info.Driver_last_name,
        address : info.Driver_address,
        email : info.Driver_Email,
        phone : info.Driver_phone,
        identity_card : info.Identity_card,
        Plate: vehicle_info.Vehicles[0].Plate,
        Brand: vehicle_info.Vehicles[0].Brand,
        Model: vehicle_info.Vehicles[0].Model,
        Payload_capacity: vehicle_info.Vehicles[0].Payload_capacity
      });
    }

  }

  render() {

    const {isDriver, isUser} = this.props;
    const {name, last_name, address, email, phone, identity_card, Plate, Brand, Model, Payload_capacity} = this.state;

    return (
    <div>
      {console.log(this.state.name)}
      <div class="d-flex flex-row">
        <div class="col-4">
          
            <img src="/mapImg.png" alt="..." class="rounded mx-auto d-block w-25"></img>
          
          
        </div>
        

        <div class="col-4 justify-content-center">

          <div className= {classNames(styles.title)} >NOMBRE:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{name}</span>
          </div>

          <div className= {classNames(styles.title)} >APELLIDO:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{last_name}</span>
          </div>

          <div className= {classNames(styles.title)} >EMAIL:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}> {email}</span>
          </div>

          <div className= {classNames(styles.title)} >DIRECCIÓN:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{address}</span>
          </div>

          <div className= {classNames(styles.title)} >CIUDAD:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>BOGOTA</span>
          </div>

          {isDriver?
          <>
          <div className= {classNames(styles.title)} >CEDULA:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{identity_card}</span>
          </div>
          
          <div className= {classNames(styles.title)} >TELEFONO:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{phone}</span>
          </div> </> : null}
        </div>
        
        {isDriver ? 

        <div class="col-4 justify-content-center">

          
          <div className= {classNames(styles.title)} >PLACA:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
          <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{Plate}</span>
          </div>

          <div className= {classNames(styles.title)} >MARCA:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{Brand}</span>
          </div>

          <div className= {classNames(styles.title)} >MODELO:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
          <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{Model}</span>
          </div>

          <div className= {classNames(styles.title)} >CAPACIDAD DE CARGA(KG):</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
          <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{Payload_capacity}</span>
          </div>

          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <img src="/truckImg.png" alt="..." class="img-thumbnail w-75"></img>
          </div>

        </div> : null}

      </div>

      
    
    
    </div> 
    
    );
  }
}

export default Profile;
