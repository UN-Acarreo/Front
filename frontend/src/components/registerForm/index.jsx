import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import Log from '../../log.js';

// IMPORT STYLES REACT-BOOTSTRAP
import {Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';

import classNames from "classnames";

// Import Logger
const URL = 'http://localhost:3001'
const file = "registerForm"

const style_navtabs = {
  backgroundColor: 'black',
  color: 'white',
  width:  '100%'
}

const style_navitems = {
  width: '50%',
  textAlign: 'center'
}

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
    goToUser:             boolean,
    validateTerms:        boolean,
    url:                  string

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
      validateTerms: false,
      db_driver_id: null,
      url: "/api/driver/login",
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
  clientLogin(){
    this.setState({url : "/api/client/login"})
    this.changeForm()
  }
  driverLogin(){
    this.setState({url : "/api/driver/login"})
    this.changeForm()
  }
  changeToVehicle(){
    if(this.state.goToDriver){
      this.setState({vehicle : true});
    }
  }

  verifyTerms(){
    this.setState({validateTerms : !this.state.validateTerms})


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

//Function used to check the request fields (valid emails, valid field lengths and valid text fields)
check_fields = async (data) => {
    for (const key of Object.keys(data)) {
      var field = data[key]
      if((key == 'User_name' || key == 'Driver_name')
          && !validator.isAlpha(validator.blacklist(field, ' '))){
          return "El Nombre no es válido"
      }
      if((key == 'User_last_name' || key == 'Driver_last_name')
          && !validator.isAlpha(validator.blacklist(field, ' '))){
          return "El Apellido no es válido"
      }
      if((key == 'Identity_card') && !validator.isNumeric(field)){
        return "La Cédula no es válida"
      }
      if((key == 'Driver_phone') && !validator.isNumeric(field)){
        return "El Teléfono no es válido"
      }
      if((key == 'User_Email' || key == 'Driver_Email') && !validator.isEmail(field)){
        return "El E-Mail no es válido"
      }
      if((key == 'Payload_capacity') && !validator.isNumeric(field)){
        return "La capacidad de carga no es válida"
      }
      //length validation
      if(field.length == 0){
        if((key == 'Driver_password' || key == 'User_password')){
          return "La Contraseña no es válida"
        }
        if((key == 'Driver_address' || key == 'User_address')){
            return "La Dirección no es válida"
        }
        if((key == 'Plate')){
          return "La Placa no es válida"
        }
        if((key == 'Brand')){
          return "La Marca no es válida"
        }
        if((key == 'Model')){
          return "El Modelo no es válido"
        }
      }
    }
    return true;
  }


  async registerVehicle(){
    url = URL+'/api/vehicle/signup'
    var encoded;
    try{
      var encoded = await this.getBase64(this.state.foto);
      console.log(encoded)
    }
    catch(err){
      Log.error("No se pudo guardar la foto", file)
      this.notifyWarning('No se puede guardar la foto.')
      return ;
    }

    var url;
    var request = { Brand: this.state.marca, Model: this.state.modelo, Plate: this.state.placa, Payload_capacity: this.state.capacidad, Identity_card: this.state.cedula,
                    Photo: this.state.cedula, foto_data: encoded, db_driver_id: this.state.db_driver_id, Is_owner: true //change this if is owner or not!!!
                  }

    const valid_fields = await this.check_fields(request);

    if(valid_fields !== true){
      this.notifyWarning(valid_fields)
      return;
    }

    if ("Identity_card" in request) {
      request.Identity_card = parseInt(request.Identity_card)
    }

    if ("Payload_capacity" in request) {
      request.Payload_capacity = parseInt(request.Payload_capacity)
    }

    if ("db_driver_id" in request) {
      request.db_driver_id = parseInt(request.db_driver_id)
    }

    axios.post(url, {request})
        .then(res =>{
            if(res.data.status == 1){
                //vehicle registered
                Log.info("Registro de Vehiculo Exitoso", file)
                this.notifySuccess('Se ha registrado el vehículo correctamente.')
                window.location.href = '/'
            }else{
                Log.error("No se registro el Vehiculo", file)
                this.notifyError('Se ha producido un error al registrar el vehículo.')
            }
        }).catch((error) => {
          if (error.response) {
            Log.error(error.response.data.error, file)
            this.notifyError(error.response.data.error)

            console.log(error.response.data.error);

            }
        })
  }
  async login(){

    var request = { User_Email : this.state.email, User_password : this.state.contraseña}

    const valid_fields = await this.check_fields(request);
    if(valid_fields !== true){
      this.notifyWarning(valid_fields)
      return;
    }

    axios.post(URL+this.state.url, {request})
      .then(res=>{
        if(res.data.status == 1){

          Log.info("Login Exitoso", file)

          this.notifySuccess('Inicio de Sesion Exitoso.')
          if(this.state.goToDriver){
            sessionStorage.setItem('login_info', JSON.stringify(res.data.db_driver_id))
            sessionStorage.setItem('vehicle_info', JSON.stringify(res.data.vehicle_data))
            this.props.history.push("/driver/start")
          }else{
            sessionStorage.setItem('login_info', JSON.stringify(res.data.db_user_id))
            this.props.history.push("/user/start")
          }
        }else{
          this.notifyError('Credenciales Invalidas.')
        }
      }).catch((error) => {
        if (error.response) {
          Log.error(error.response.data.error, file)
          this.notifyError(error.response.data.error)
        }
      })
  }
  async sign_up(){

    var url;
    var request;

    if(this.state.validateTerms){
        if(this.props.isDriver){

      try{
        url = URL+'/api/driver/signup'
        var encoded = await this.getBase64(this.state.foto);

      }
      catch(err){
        Log.error("No se pudo guardar la foto", file)
        this.notifyWarning('No se puede guardar la foto.')
        return ;
      }

      request = {Driver_name: this.state.nombre, Driver_last_name: this.state.apellido, Identity_card: this.state.cedula,
                    Driver_phone: this.state.phone, Driver_Email: this.state.email, Driver_address: this.state.direccion,
                    Driver_password: this.state.contraseña, Driver_photo: this.state.cedula, foto_data: encoded }
    } else {

      url = URL+'/api/client/signup';
      request = {User_name: this.state.nombre, User_last_name: this.state.apellido, User_Email: this.state.email,
                  User_address: this.state.direccion, User_password: this.state.contraseña}

    }

    const valid_fields = await this.check_fields(request);

    if(valid_fields !== true){
      this.notifyWarning(valid_fields)
      return;
    }

    if ("Identity_card" in request) {
      request.Identity_card = parseInt(request.Identity_card)
    }

    if ("Driver_phone" in request) {
      request.Driver_phone = parseInt(request.Driver_phone)
    }

    if(this.state.contraseña != this.state.confirmar_contraseña){
      //show passwords dont match error
      this.notifyWarning('Las contraseñas no coinciden.')
      return;
    }

    axios.post(url, { request })
        .then(res => {
          if(res.data.status == 1){
            //user has been added
            Log.info("Usuario creado", file)
            this.notifySuccess('Se ha registrado el usuario correctamente.')
            if(this.props.isDriver)
            {
              this.setState({foto: '', db_driver_id: res.data.db_driver_id}) //Reset photo state and set the saved driver pk
              this.changeToVehicle();
            }
            else{
               window.location.href = '/'
            }

          }else{
            Log.error(res.data.error, file)
            this.notifyError('Se ha producido un error con los datos suministrados.')
          }
        }).catch((error) => {
          if (error.response) {
            Log.error(error.response.data.error, file)
            this.notifyError(error.response.data.error)
            }
        })
    } else {
      this.notifyWarning('Por favor aceptar términos y condiciones')
    }


  }

  render() {
    const {isDriver, isHome} = this.props;
    const {goToDriver, vehicle, goToUser} = this.state;
    /*var cond ='white'
    var cond_b = '#343a40'
    if(this.state.url == '/api/driver/login'){
      cond = '#343a40'
      cond_b = 'white'
      background-size: 70em !important;
background-position-x: 500px;
background-repeat: repeat-x;
    }*/
    return (
      <Container fluid className=""
       style={{paddingTop: '50px', backgroundImage: `url(${'./mov.svg'})` , backgroundSize: '70em', backgroundPositionX: '500px', backgroundRepeat: 'repeat-x'}}>
        <ToastContainer enableMultiContainer containerId={'notification'} position={toast.POSITION.TOP_RIGHT} />
        <Row className="justify-content-center" style= {{paddingBottom: '100px'}}>
          <Col md={6} lg={6} xl={5}>
            <Row className="justify-content-center" > {/*style={{border: "1px solid black"}}*/}
            {/*
              {isHome ?
                <ul className="nav nav-tabs" style={style_navtabs}>
                  <li class="nav-item" style={style_navitems}>
                    {goToDriver ?
                      <a class="nav-link active">CONDUCTOR</a>
                    :
                      <a class="nav-link" onClick= {() => this.driverLogin()}>CONDUCTOR</a>
                    }
                  </li>
                  <li class="nav-item" style={style_navitems}>
                    {goToUser ?
                      <a class="nav-link active"> USUARIO </a>
                    :
                      <a class="nav-link" onClick= {() => this.clientLogin()}>USUARIO</a>
                    }
                  </li>
                </ul>
              : null}*/}
              {!isHome?

                <Card
                  bg = "light"
                  text = "black"
                  style={{ width: '100%', borderRadius: '20px',boxShadow: 'rgba(0, 0, 0, 0.75) -2px 2px 13px 0px',textAlign: 'center'}}
                  className="mb-2"
                >
                <Card.Body>

                <form>
                  {vehicle?
                    <div>
                      <div class="form-group" className={styles.nice} style={{marginTop: '20px'}}>
                        <label  className = {styles.input}>Marca:</label>
                        <input
                          type="text"
                          name="marca"
                          class="form-control"
                          placeholder = "MARCA"
                          value={this.state.marca}
                          id='marca'
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group" className={styles.nice}>
                        <label  className = {styles.input}>Modelo:</label>
                        <input
                          type="text"
                          name="modelo"
                          class="form-control"
                          placeholder = "MODELO"
                          value={this.state.modelo}
                          id='modelo'
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group" className={styles.nice}>
                        <label  className = {styles.input}>Placa:</label>
                        <input
                          type="text"
                          name="placa"
                          class="form-control"
                          placeholder = "PLACA"
                          value={this.state.placa}
                          id='placa'
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group" className={styles.nice}>
                        <label  className = {styles.input}>Capacidad:</label>
                        <input
                          type="text"
                          name="capacidad"
                          class="form-control"
                          placeholder = "CAPACIDAD APROXIMADA (Kg)"
                          value={this.state.capacidad}
                          id='capacidad'
                          onChange={this.handleChange}
                        />
                      </div>
                      <label htmlFor="filePickervehi" style={{padding:"5px 10px", cursor: 'pointer',background: '#2196F3', color: 'white', borderRadius: '15px', marginTop: '2em'}}>
                        Seleccionar foto del vehiculo
                        </label>
                      <input  id="filePickervehi" class="form-group" type="file" name="photo" onChange= {this.selectPhoto} className={styles.nice} style={{visibility:"hidden"}}/>
                      <div class="col-md-12 text-center" style={{marginBottom: '20px'}}>
                          <button type="button" className= {classNames("btn btn-dark")} onClick={()=>this.registerVehicle()}>REGISTRAR VEHICULO</button>
                      </div>
                    </div>
                  :
                    <div>
                      <div class="form-group" style={{marginTop: '20px'}} className={styles.nice}>
                        <label  className = {styles.input}>Nombre:</label>
                        <input
                          type="text"
                          name="name"
                          class="form-control"
                          placeholder = "NOMBRE"
                          value={this.state.nombre}
                          id='nombre'
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group" className={styles.nice}>
                        <label  className = {styles.input}>Apellido:</label>
                        <input
                          type="text"
                          name="lastname"
                          class="form-control"
                          placeholder = "APELLIDO"
                          value={this.state.apellido}
                          id='apellido'
                          onChange={this.handleChange}
                        />
                      </div>
                      {isDriver ?
                        <div class="form-group" className={styles.nice}>
                          <label  className = {styles.input}>Cedula:</label>
                          <input
                            type="text"
                            name="cedula"
                            class="form-control"
                            placeholder = "CEDULA"
                            value={this.state.cedula}
                            id='cedula'
                            onChange={this.handleChange}
                          />
                        </div>
                      : null}
                      {isDriver ?
                        <div class="form-group" className={styles.nice}>
                          <label  className = {styles.input}>Telefono:</label>
                          <input
                            type="text"
                            name="phone"
                            class="form-control"
                            placeholder = "TELEFONO"
                            value={this.state.phone}
                            id='phone'
                            onChange={this.handleChange}
                          />
                        </div>
                      : null}
                      <div class="form-group" className={styles.nice}>
                        <label  className = {styles.input}>E-Mail:</label>
                        <input
                          type="text"
                          name="e-mail"
                          class="form-control"
                          placeholder = "E-MAIL"
                          value={this.state.email}
                          id='email'
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group" className={styles.nice}>
                        <label  className = {styles.input}>Direccion:</label>
                        <input
                          type="text"
                          name="address"
                          class="form-control"
                          placeholder = "DIRECCION"
                          value={this.state.direccion}
                          id='direccion'
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-group" className={styles.nice}>
                      <label  className = {styles.input}>Contraseña:</label>
                      <input
                        type="password"
                        name="password"
                        class="form-control"
                        placeholder = "CONTRASEÑA"
                        value={this.state.contraseña}
                        id='contraseña'
                        onChange={this.handleChange}
                      />
                      </div>
                      <div class="form-group" className={styles.nice}>
                        <label  className = {styles.input}>Confirmar Contraseña:</label>
                        <input
                          type="password"
                          name="password"
                          class="form-control"
                          placeholder = "CONFIRMAR CONTRASEÑA"
                          value={this.state.confirmar_contraseña}
                          id='confirmar_contraseña'
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="form-check" style={{marginTop: '1em'}}>
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={()=>this.verifyTerms()} />
                        <label className = {styles.input_check} for="exampleCheck1"> Acepto los terminos y condiciones</label>
                      </div>
                      {!isDriver ?
                        <div class="col-md-12 text-center">
                          <button type="button" class="btn btn-dark" onClick={()=>this.sign_up()} style={{marginBottom: '20px'}}>REGISTRARSE</button>
                        </div>
                      :
                        <div>
                          <div class="form-group" style={{marginTop: '1em', marginBottom: '0em'}}>
                          <label htmlFor="filePicker" style={{padding:"5px 10px", cursor: 'pointer',background: '#2196F3', color: 'white', borderRadius: '15px'}}>
                            Seleccionar foto de perfil
                            </label>
                            <input id="filePicker" type="file" name="photo" onChange= {this.selectPhoto} style={{visibility:"hidden"}} />
                          </div>
                          <div class="col-md-12 text-center">
                            <button type="button" class="btn btn-dark" onClick={()=>this.sign_up()} style={{marginBottom: '20px'}}>CONTINUAR REGISTRO</button>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </form>

                </Card.Body>
              </Card>
              :

              <Card

                bg = "light"
                text = "black"
                style={{ width: '100%', borderRadius: '20px',boxShadow: 'rgba(0, 0, 0, 0.75) -2px 2px 13px 0px',textAlign: 'center'}}
                className="mb-2"
              >
                <Card.Header style={{fontSize: '26px',fontWeight: '500', textAlign: 'center'}}>
                Bienvenido - {this.state.url == '/api/driver/login' ? "Conductor" : "Usuario"}
                </Card.Header>
                <Card.Body>

                <form>
                  <div class="form-group" style={{marginTop: '30px', margin: '0 auto', width: '60%'}}>
                    <label  className = {styles.input} >E-Mail:</label>
                    <input
                      type="text"
                      name="e-mail"
                      class="form-control"
                      placeholder = "E-MAIL"
                      value = {this.state.email}
                      id='email'
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="form-group" style={{margin: '0 auto', marginTop: '30px', marginBottom: '2em',width: '60%'}}>
                    <label  className = {styles.input} >Contraseña:</label>
                    <input
                      type="password"
                      name="password"
                      class="form-control"
                      placeholder = "CONTRASEÑA"
                      value={this.state.contraseña}
                      id='contraseña'
                      onChange={this.handleChange}
                    />
                  </div>
                  <div class="col-md-12 text-center">

                    {/*<button type="button" class="btn btn-dark" onClick={()=>this.login()}>INGRESAR</button> */}
                    <Button style={{fontWeight: 500, marginBottom: '1em'}} variant= "success"
                      onClick={()=>this.login()}>
                      INGRESAR
                    </Button>
                    { goToUser ?
                      <p style={{fontSize: '13px', fontWeight: 500, cursor: 'pointer', color: '#098df5'}} onClick= {() => this.driverLogin()}>Ir al inicio de conductor</p>
                        :
                      <p style={{fontSize: '13px', fontWeight: 500, cursor: 'pointer', color: '#098df5'}} onClick= {() => this.clientLogin()}>Ir al inicio de usuario</p>
                    }

                  </div>
                  <hr/>
                  <label className = {styles.label} style={{marginTop: '0em'}}>¿No tienes una cuenta? Registrate! </label>
                  <div class="col-md-12 text-center" style={{paddingBottom: '20px', marginTop: '-2em'}}>
                    <a {...goToDriver ? {href:"driver/signup"} : {href:"/user/signup"}} className={classNames("btn btn-secondary")} style={{ fontWeight: 500}}>
                    REGISTRARSE
                    </a>
                  </div>
                </form>
                </Card.Body>
              </Card>

              }

            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default withRouter(RegisterForm);
