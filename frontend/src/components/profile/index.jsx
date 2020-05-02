import React, { Component } from 'react';

import styles from './styles.module.css';
import axios from 'axios';

import classNames from "classnames";


interface Props{
  isDriver :  boolean;
  isUser :    boolean;
}

interface State {

    nombre:               string,
    apellido:             string,
    email:                string,
    direccion:            string,
    cedula:               string,
    phone:                number,
    ciudad:               string,
    contraseña:           string,
    confirmar_contraseña: string,
    placa:                string,
    marca:                string,
    modelo:               string,
    capacidad:            string,
    foto:                 string,
    goToDriver:           boolean,
    vehicle:              boolean,
    goToUser:             boolean

}

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      cedula: '',
      ciudad: '',
      contraseña: '',
      confirmar_contraseña: '',
      placa: '',
      marca: '',
      modelo: '',
      capacidad: '',
      foto: '',
      goToDriver: true,
      vehicle: false,
      goToUser: false

      //
    }
  }

  render() {

    const {isDriver, isUser} = this.props;

    return (
     
    
    <div>
    {console.log(isDriver)} 
    {console.log(isUser)} 
      <div class="d-flex flex-row">
        <div class="col-4">
          
            <img src="/mapImg.png" alt="..." class="rounded mx-auto d-block w-25"></img>
          
          
        </div>
        

        <div class="col-4 justify-content-center">
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>NOMBRE</span>
          </div>

          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>APELLIDO</span>
          </div>

          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>E-MAIL</span>
          </div>

          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>DIRECCION</span>
          </div>

          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>CIUDAD</span>
          </div>

          {isDriver?
          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>CEDULA</span>
          </div> : null}
        </div>
        
        {isDriver ? 

        <div class="col-4 justify-content-center">

          

          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>PLACA</span>
          </div>

          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>MARCA</span>
          </div>

          <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
            <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>MODELO</span>
          </div>

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
