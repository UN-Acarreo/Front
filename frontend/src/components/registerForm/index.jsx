import React, { Component } from 'react';
import styles from './styles.module.scss';

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
      //
    }
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
                      
            />
          </div>

          <div class="form-group" >
            <label  className = {styles.input}>Apellido:</label>
            <input  type="text" 
                    name="lastname" 
                    class="form-control"
                    placeholder = "APELLIDO"
                      
            />
          </div>

          <div class="form-group">
            <label  className = {styles.input}>E-Mail:</label>
            <input  type="text" 
                    name="e-mail" 
                    class="form-control"
                    placeholder = "E-MAIL"
            />
          </div>

          <div class="form-group">
            <label  className = {styles.input}>Direccion:</label>
            <input  type="text" 
                    name="address" 
                    class="form-control"
                    placeholder = "DIRECCION"
            />
          </div>

          <div class="form-group">
          <label  className = {styles.input}>Ciudad:</label>
          <input  type="text" 
                  name="city" 
                  class="form-control"
                  placeholder = "CIUDAD"
          />
          </div>

          <div class="form-group">
          <label  className = {styles.input}>Contraseña:</label>
          <input  type="text" 
                  name="password" 
                  class="form-control"
                  placeholder = "CONTRASEÑA"
          />
          </div>

          <div class="form-group">
          <label  className = {styles.input}>Confirmar Contraseña:</label>
          <input  type="text" 
                  name="password" 
                  class="form-control"
                  placeholder = "CONFIRMAR CONTRASEÑA"
          />
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
            <label className = {styles.input_check} for="exampleCheck1">Acepto los terminos y condiciones</label>
          </div>

          {!isDriver ?<button type="button" class="btn btn-dark">REGISTRARSE</button> : 
          
          <button  type="button" class="btn btn-dark">CONTINUAR REGISTRO</button> }
      </form> : 

        <form>
        
          <div class="form-group">
            <label  className = {styles.input}>E-Mail:</label>
            <input  type="text" 
                    name="e-mail" 
                    class="form-control"
                    placeholder = "E-MAIL"
            />
          </div>

          <div class="form-group">
          <label  className = {styles.input}>Contraseña:</label>
          <input  type="text" 
                  name="password" 
                  class="form-control"
                  placeholder = "CONTRASEÑA"
          />
          </div>

          <button type="button" class="btn btn-dark">REGISTRARSE</button> 
      </form> 
        }
      </div>
    )
  }
}

export default RegisterForm;
