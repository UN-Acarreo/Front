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
      this.setState({
        name: info.Driver_name,
        last_name : info.Driver_last_name,
        address : info.Driver_address,
        email : info.Driver_Email,
        phone : info.Driver_phone,
        identity_card : info.Identity_card
      });
    }

  }

  render() {

    const {isDriver, isUser} = this.props;
    const {name, last_name, address, email, phone, identity_card} = this.state;

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
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>PLACA</span>
          </div>

          <div className= {classNames(styles.title)} >MARCA:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>MARCA</span>
          </div>

          <div className= {classNames(styles.title)} >MODELO:</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>MODELO</span>
          </div>

          <div className= {classNames(styles.title)} >CAPACIDAD DE CARGA(KG):</div>
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>CAPACIDAD DE CARGA(KG)</span>
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
