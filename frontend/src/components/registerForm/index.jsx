import React, { Component } from 'react';
import styles from './styles.module.scss';
import axios from 'axios';
const URL = 'http://localhost:3001'

interface Props{
  isDriver : boolean;
  isHome : boolean;

}

interface State {

}

class RegisterForm extends Component {
constructor(props){
    super(props);

    this.state = {
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      ciudad: '',
      contraseña: '',
      confirmar_contraseña: ''

      //
    }
  }

  handleChange = (e) =>{
    this.setState({ [e.target.id] : e.target.value});

  }

  sign_up(){
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
          }

          else{
            //show an error
          }
        })
  }


  render() {

    const {isDriver, isHome} = this.props;
    return (

      <div className={styles.container}>

       {isHome ?
       <div className = {styles.container_options}>
          <button className = {styles.container_buttondriver}>
            CONDUCTOR
          </button>
          <button className = {styles.container_buttonuser}>
            USUARIO
        </button>
      </div> : null}

      {!isHome?
        <form>

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
          <label  className = {styles.input}>Ciudad:</label>
          <input  type="text"
                  name="city"
                  class="form-control"
                  placeholder = "CIUDAD"
                  value={this.state.ciudad}
                  id='ciudad'
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

          <button  type="button" class="btn btn-dark">CONTINUAR REGISTRO</button> }
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

          <button type="button" class="btn btn-dark">REGISTRARSE</button> {/*Poner el boton de  Ingresar :v */}
      </form>
        }
      </div>
    )
  }
}

export default RegisterForm;
