import React, { Component } from 'react';

import styles from './styles.module.scss';
import classNames from "classnames";

import {Container, Row, Col, Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

interface Props{
  message : string;
  userName : string;
  isUser : boolean;
  isDriver : boolean
}

interface State {
  name : string

}


class Top extends Component<Props, State> {
  constructor(props){
    super(props);

    this.state = {
      name : ''
    }
  }

  componentWillMount(){
    if ( this.props.isDriver|| this.props.isUser){
      //Check if session storage info exists
      if(!sessionStorage.login_info || sessionStorage.login_info == null || sessionStorage.login_info == undefined){
         return window.location.href = '/';
       }
       var info = JSON.parse(sessionStorage.login_info);

      if(this.props.isUser){
        this.setState({
          name: info.User_name

        });
      } else{
        this.setState({
          name: info.Driver_name,
        });
      }

    }

  }


  render() {

    const {message, isUser, isDriver} = this.props;
    const {name} = this.state;

    return (
      <>
      <Navbar bg="dark" variant= "dark" expand="lg">
        <Navbar.Brand>UN-Acarreo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        { isUser || isDriver ?
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isUser?
              <>
              <Nav.Link href="/user/start">Inicio</Nav.Link>
              <Nav.Link href="/user/profile">Perfil</Nav.Link>
              </>
            :
              <>
              <Nav.Link href="/driver/start">Inicio</Nav.Link>
              <Nav.Link href="/driver/profile">Perfil</Nav.Link>
              </>
            }
            <Nav.Link href="/">Salir</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        : null}
      </Navbar>
      {/* <div className={classNames("row", styles.header)}>
        <a {...isUser ? {href:"/user/profile"} : isDriver ? {href:"/driver/profile"} : {href:""} } className={classNames("col-1",styles.header_button)}>
          {isUser || isDriver ? 
            <img src="/user.png" className= {classNames("rounded mx-auto d-block", styles.imgCon)} alt="..."></img>
          :null}
        </a>
        <div className={styles.text}>
          { isUser || isDriver ?
            "Bienvenido " + name
          :
            "Bienvenido"
          }
        </div>
        <a href = "/" className={classNames("col-1",styles.header_button)}>
<<<<<<< HEAD
          {isUser || isDriver ? 
            <img src="/logout.png" className= {classNames("rounded mx-auto d-block", styles.imgRight)} alt="..."></img>
          :
            null
          }
=======

            {isUser || isDriver ?
                <img src="/logout.png" className= {classNames("rounded mx-auto d-block", styles.imgRight)} alt="..."></img>
              :
                null
            }

>>>>>>> a094809927dc809440e7f7d720002e19d5091a6d
        </a>
      </div> */}
    </>
    )
  }
}

export default Top;
