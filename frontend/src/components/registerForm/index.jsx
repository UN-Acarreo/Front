import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    phone:                string,
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
      phone:'',
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
      goToUser: false,
      db_driver_id: null

      //
    }
  }
  //notification functions declaration
  notifySuccess = (text) => toast.success(text, {containerId: 'notification'});
  notifyWarning = (text) => toast.warning(text, {containerId: 'notification'});
  notifyError = (text) => toast.error(text, {containerId: 'notification'});

  changeForm(){
    this.setState({goToDriver : !this.state.goToDriver});
    this.setState({goToUser : !this.state.goToUser});
  }
  changeToVehicle(){
    if(this.state.goToDriver){
      this.setState({vehicle : true});
    }
  }
  getBase64(file) {
   return new Promise(function(resolve) {
     var reader = new FileReader();
     reader.onloadend = function() {
       resolve(reader.result)
     }
     reader.readAsDataURL(file);
   })
 }

  handleChange = async(e) =>{
    this.setState({ [e.target.id] : e.target.value});
  }

  selectPhoto = (e)=> {
      console.log(e.target.files[0])
      this.setState({foto:e.target.files[0]});
    }


  async registerVehicle(){
    url = URL+'/api/vehicle/signup'
    var encoded = await this.getBase64(this.state.foto);

    var url;
    var request = { Plate: this.state.placa, Brand: this.state.marca, Model: this.state.modelo, Payload_capacity: this.state.capacidad, Identity_card: this.state.cedula,
                    Photo: this.state.cedula, foto_data: encoded, db_driver_id: this.state.db_driver_id, Is_owner: true //change this if is owner or not!!!
                  }
    axios.post(url, {request})
        .then(res =>{
            if(res.data.status == 1){
                //vehicle registered
                console.log("Registro Exitoso")
                this.notifySuccess('Se ha registrado el vehículo correctamente.')
            }else{
                // error management
                this.notifyError('Se ha producido un error al registrar el vehículo.')
            }
        }).catch((error) => {
          if (error.response) {
            this.notifyError(error.response.data.error)
            console.log(error.response.data.error);	
            }
        })
  }
  async sign_up(){
    //this.changeToVehicle();
    if(this.state.contraseña != this.state.confirmar_contraseña){
      //show passwords dont match error
      this.notifyWarning('Las contraseñas no coinciden.')
      return;
    }
    var url;
    if(this.props.isDriver){
      try{
        url = URL+'/api/driver/signup'
        var encoded = await this.getBase64(this.state.foto);
        console.log(encoded)
      }
      catch(err){
        return console.log(err)
      }


    var request = {Driver_name: this.state.nombre, Driver_last_name: this.state.apellido, Driver_password: this.state.contraseña,
                   Driver_address: this.state.direccion,  Driver_Email: this.state.email, Identity_card: this.state.cedula,
                   Driver_photo: this.state.cedula, foto_data: encoded,
                   Driver_phone: this.state.phone }
    }
    else{
      url = URL+'/api/client/signup';
      var request = {User_name: this.state.nombre, User_last_name: this.state.apellido, User_password: this.state.contraseña,
                     User_address: this.state.direccion,  User_Email: this.state.email }
    }
    //console.log(this.state)

    axios.post(url, { request })
        .then(res => {
          if(res.data.status == 1){
            //user has been added
            console.log('User successfuly added');
            this.notifySuccess('Se ha registrado el usuario correctamente.')
            if(this.props.isDriver)
            {
              this.setState({foto: '', db_driver_id: res.data.db_driver_id}) //Reset photo state and set the saved driver pk
              this.changeToVehicle();
            }

          }else{
            //show an error
            this.notifyError('Se ha producido un error con los datos suministrados.')
            console.log(res.data.error);

          }
        }).catch((error) => {
          if (error.response) {
            this.notifyError(error.response.data.error)
            console.log(error.response.data.error);	
            }
        })
  }

  render() {
    const {isDriver, isHome} = this.props;
    const {goToDriver, vehicle, goToUser} = this.state;

    return (

      <div className={styles.container}>
      <ToastContainer enableMultiContainer containerId={'notification'} position={toast.POSITION.TOP_RIGHT} />
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
                        placeholder = "CAPACIDAD APROXIMADA (Kg)"
                        value={this.state.capacidad}
                        id='capacidad'
                        onChange={this.handleChange}
                />
            </div>
              <input  class="form-group" type="file" name="photo" onChange= {this.selectPhoto} />
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
                    value={this.state.cedula}
                    id='cedula'
                    onChange={this.handleChange}

            />
          </div>  : null}

          {isDriver ?
          <div class="form-group" >
            <label  className = {styles.input}>Telefono:</label>
            <input  type="text"
                    name="phone"
                    class="form-control"
                    placeholder = "TELEFONO"
                    value={this.state.phone}
                    id='phone'
                    onChange={this.handleChange}

            />
          </div>  : null}


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
            <label className = {styles.input_check} for="exampleCheck1"> Acepto los terminos y condiciones</label>
          </div>
          {!isDriver ?<button type="button" class="btn btn-dark" onClick={()=>this.sign_up()}>REGISTRARSE</button> :
            <div>
            <input  class="form-group" type="file" name="photo" onChange= {this.selectPhoto} />
            <button type="button" class="btn btn-dark" onClick={()=>this.sign_up()}>CONTINUAR REGISTRO</button>
            </div>}
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

            <a {...goToDriver ? {href:"/driver/home"} : {href:"user/home"}} className={classNames("btn btn-dark")} > INGRESAR</a>
          </div>

          <label className = {styles.label}>

            No tienes una cuenta? Registrate! :

          </label>

          <div class="col-md-12 text-center">

            <a {...goToDriver ? {href:"driver/signup"} : {href:"/user/signup"}} className={classNames("btn btn-dark")}>REGISTRARSE</a>
          </div>

      </form>
        }
      </div>
    )
  }
}

export default RegisterForm;
