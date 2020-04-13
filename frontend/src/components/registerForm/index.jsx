import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';

import classNames from "classnames";
const URL = 'http://localhost:3001'

interface Props{
  isDriver :  boolean;
  isHome :    boolean;
}

interface State {

    nombre:               string,
    apellido:             string,
    email:                string,
    direccion:            string,
    cedula:               string,
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

class RegisterForm extends Component {
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

  changeForm(){
    this.setState({goToDriver : !this.state.goToDriver});
    this.setState({goToUser : !this.state.goToUser});
  }
  changeToVehicle(){
    if(this.state.goToDriver){
      this.setState({vehicle : true});
    }
  }
  handleChange = (e) =>{
    this.setState({ [e.target.id] : e.target.value});
  }
  registerVehicle(){
    var url;
    var request = { placa: this.state.placa, marca: this.state.marca, modelo: this.state.modelo,
                    year: this.state.year, capacidad: this.state.capacidad}
    axios.post(url, {request})
        .then(res =>{
            if(res.data.status == 'added'){
                //vehicle registered
                console.log("Registro Exitoso")
            }else{
                // error management
            }
        })
  }
  sign_up(){
    //this.changeToVehicle();
    if(this.state.contraseña != this.state.confirmar_contraseña){
      //show passwords dont match error
      return;

    }
    var url;
    this.props.isDriver ? url = URL+'driver-signup' : url = URL+'/api/client-signup';
    
    console.log(this.state)
    var request = {name: this.state.nombre, lastname: this.state.apellido, password: this.state.contraseña, 
      address: this.state.direccion,  email: this.state.email }
    axios.post(url, { request })
        .then(res => {
          if(res.data.status == 'added'){
            //user has been added
            console.log('User successfuly added');
            this.changeToVehicle();
          }else{
            //show an error
          }
        })
  }

  render() {
    const {isDriver, isHome} = this.props;
    const {goToDriver, vehicle, goToUser} = this.state;

    return (

      <div className={styles.container}>

        {console.log(this.state.goToDriver, "Driver")}
        {console.log(this.state.goToUser, "User")}
       {isHome ?
       <div className = {styles.container_options}>
          <button className = {goToDriver ?  classNames(styles.button_driver) : classNames(styles.button_driver_active)} onClick = {() => this.changeForm()}>
            CONDUCTOR
          </button>
          <button className = {goToUser ?  classNames(styles.button_user) : classNames(styles.button_user_active)} onClick = {() => this.changeForm()}>
            USUARIO
        </button>
      </div> : null}

      {!isHome?
        <form>
          {vehicle?
          <div>
          <div class="form-group">
              <label  className = {styles.input}>Marca:</label>
              <input  type="text"
                      name="marca"
                      class="form-control"
                      placeholder = "MARCA"
                      value={this.state.marca}
                      id='marca'
                      onChange={this.handleChange}        
              />
          </div>
          <div class="form-group">
                <label  className = {styles.input}>Modelo:</label>
                <input  type="text"
                        name="modelo"
                        class="form-control"
                        placeholder = "MODELO"
                        value={this.state.modelo}
                        id='modelo'
                        onChange={this.handleChange}        
                />
            </div>
            <div class="form-group">
                <label  className = {styles.input}>Placa:</label>
                <input  type="text"
                        name="placa"
                        class="form-control"
                        placeholder = "PLACA"
                        value={this.state.placa}
                        id='placa'
                        onChange={this.handleChange}        
                />
            </div>
            <div class="form-group">
                <label  className = {styles.input}>Capacidad:</label>
                <input  type="text"
                        name="capacidad"
                        class="form-control"
                        placeholder = "CAPACIDAD"
                        value={this.state.capacidad}
                        id='capacidad'
                        onChange={this.handleChange}        
                />
            </div>
            <div class="form-group">
                <label  className = {styles.input}>Foto:</label>
                <input  type="text"
                        name="foto"
                        class="form-control"
                        placeholder = "FOTO"
                        value={this.state.foto}
                        id='foto'
                        onChange={this.handleChange}        
                />
            </div> 
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label className = {styles.input_check} for="exampleCheck1">Acepto los terminos y condiciones</label>
            </div>
            <div class="col-md-12 text-center">
                <button type="button" class="btn btn-dark" onClick={()=>this.registerVehicle()}>REGISTRAR VEHICULO</button>
            </div>
          </div> :
          <div>
          <div class="form-group" >
            <label  className = {styles.input}>Nombre:</label>
            <input  type="text"
                    name="name"
                    class="form-control"
                    placeholder = "NOMBRE"
                    value={this.state.nombre}
                    id='nombre'
                    onChange={this.handleChange}

            />
          </div>

          <div class="form-group" >
            <label  className = {styles.input}>Apellido:</label>
            <input  type="text"
                    name="lastname"
                    class="form-control"
                    placeholder = "APELLIDO"
                    value={this.state.apellido}
                    id='apellido'
                    onChange={this.handleChange}
            />
          </div>

          {isDriver ? 
          <div class="form-group" >
            <label  className = {styles.input}>Cedula:</label>
            <input  type="text"
                    name="cedula"
                    class="form-control"
                    placeholder = "CEDULA"
                    //value={this.state.apellido}
                    id='cedula'
                    onChange={this.handleChange}

            />
          </div> : null}
          

          <div class="form-group">
            <label  className = {styles.input}>E-Mail:</label>
            <input  type="text"
                    name="e-mail"
                    class="form-control"
                    placeholder = "E-MAIL"
                    value={this.state.email}
                    id='email'
                    onChange={this.handleChange}
            />
          </div>

          <div class="form-group">
            <label  className = {styles.input}>Direccion:</label>
            <input  type="text"
                    name="address"
                    class="form-control"
                    placeholder = "DIRECCION"
                    value={this.state.direccion}
                    id='direccion'
                    onChange={this.handleChange}
            />
          </div>

          <div class="form-group">
          <label  className = {styles.input}>Contraseña:</label>
          <input  type="password"
                  name="password"
                  class="form-control"
                  placeholder = "CONTRASEÑA"
                  value={this.state.contraseña}
                  id='contraseña'
                  onChange={this.handleChange}
          />
          </div>

          <div class="form-group">
          <label  className = {styles.input}>Confirmar Contraseña:</label>
          <input  type="password"
                  name="password"
                  class="form-control"
                  placeholder = "CONFIRMAR CONTRASEÑA"
                  value={this.state.confirmar_contraseña}
                  id='confirmar_contraseña'
                  onChange={this.handleChange}
          />
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
            <label className = {styles.input_check} for="exampleCheck1">Acepto los terminos y condiciones</label>
          </div>
          {!isDriver ?<button type="button" class="btn btn-dark" onClick={()=>this.sign_up()}>REGISTRARSE</button> :
            <button type="button" class="btn btn-dark" onClick={()=>this.sign_up()}>CONTINUAR REGISTRO</button>}
            </div>}
      </form> :

        <form>

          <div class="form-group">
            <label  className = {styles.input}>E-Mail:</label>
            <input  type="text"
                    name="e-mail"
                    class="form-control"
                    placeholder = "E-MAIL"
                    id='email'
            />
          </div>

          <div class="form-group">
          <label  className = {styles.input}>Contraseña:</label>
          <input  type="password"
                  name="password"
                  class="form-control"
                  placeholder = "CONTRASEÑA"
                  id='contraseña'
          />
          </div>

          <div class="col-md-12 text-center">
            
            <a {...goToDriver ? {href:"/api/driver/home"} : {href:"/api/user/home"}} className={classNames("btn btn-dark")} > INGRESAR</a>
          </div>

          <label className = {styles.label}>

            No tienes una cuenta? Registrate! : 

          </label>
  
          <div class="col-md-12 text-center">
          
            <a {...goToDriver ? {href:"/api/driver/register"} : {href:"/api/user/register"}} className={classNames("btn btn-dark")}>REGISTRARSE</a>
          </div>
          
      </form>
        }
      </div>
    )
  }
}

export default RegisterForm;
