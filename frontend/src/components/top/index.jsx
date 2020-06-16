import React, { Component } from 'react';

import styles from './styles.module.scss';
import classNames from "classnames";

import {Container, Row, Col, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faHome, faTruck, faCircle, faUser, faSignOutAlt, faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Log from '../../log.js';

const URL = 'http://localhost:3001'

interface Props{
  message : string;
  userName : string;
  isUser : boolean;
  isDriver : boolean
}

interface State {
  notifications: [];
}
const faTrashStyle = {
  marginLeft: '10px',
  color:  'red'
}
const faCircleStyle = {
  fontSize: '0.5rem',
  marginBottom: '15px',
  color:  'white'
}

class Top extends Component<Props, State> {
  constructor(props){
    super(props);

    this.state = {
      notifications: []
    }
  }
  //notification functions declaration
  notifySuccess = (text) => toast.success(text, {containerId: 'notification'});
  notifyWarning = (text) => toast.warning(text, {containerId: 'notification'});
  notifyError = (text) => toast.error(text, {containerId: 'notification'});

  componentWillMount(){
    if ( this.props.isDriver|| this.props.isUser){
      //Check if session storage info exists
      if(!sessionStorage.login_info || sessionStorage.login_info == null || sessionStorage.login_info == undefined){
        return window.location.href = '/';
      }
      var info = JSON.parse(sessionStorage.login_info);
      if(this.props.isUser){
        var url = URL+'/api/user/notification/check/'+ info.Id_user;
      }else{
        var url = URL+'/api/driver/notification/check/'+ info.Id_driver;
      }
      axios.get(url)
        .then( (response) => {
          console.log(response)
          this.setState({ 
            notifications: response.data.data
          })
      })
        .catch(function (error) {
          console.log(error);
      })
        .then(function () {
          // always executed
      });
    }
  }

  deleteNotification(data){
    if(this.props.isUser){
      var urlDelete = URL+'/api/user/notification/delete/'+ data.Id_Notification_Type +  '/' + data.Id_user + '/' + data.Id_haulage;
      var urlGet = URL+'/api/user/notification/check/'+ data.Id_user;
    }else{
      var urlDelete = URL+'/api/driver/notification/delete/'+ data.Id_Notification_Type + '/' + data.Id_driver + '/' + data.Id_haulage;
      var urlGet = URL+'/api/driver/notification/check/'+ data.Id_driver;
    }
    axios.delete(urlDelete)
      .then( (response) => {
        axios.get(urlGet)
          .then( (response) => {
            console.log(response)
            this.setState({ 
              notifications: response.data.data
            })
        })
          .catch(function (error) {
            console.log(error);
        })
          .then(function () {
            // always executed
        });
    })
      .catch(function (error) {
        console.log(error);
    })
      .then(function () {
        // always executed
    });
  }

  render() {
    const messages = [
      'Se ha asignado un nuevo acarreo!',
      'El acarreo ha finalizado!',
      'El acarreo se ha cancelado!',
      'El acarreo ha iniciado!'
    ];
    const {message, isUser, isDriver} = this.props;
    const {notifications} = this.state;
    return (
      <Navbar bg="dark" variant= "dark">
        <Navbar.Brand>UN-Acarreo</Navbar.Brand>
        { isUser || isDriver ?
          <>
          <Nav className="mr-auto">
            {isUser?
              <>
              <Nav.Link href="/user/start" style={{fontSize: '1.5rem'}} ><FontAwesomeIcon icon={faHome} /></Nav.Link>
              <Nav.Link href="/user/haulages" style={{fontSize: '1.5rem'}} ><FontAwesomeIcon icon={faTruck} /></Nav.Link>
              <Nav.Link href="/user/profile" style={{fontSize: '1.5rem'}}><FontAwesomeIcon icon={faUser} /></Nav.Link>
              </>
            :
              <>
              <Nav.Link href="/driver/start" style={{fontSize: '1.5rem'}} ><FontAwesomeIcon icon={faHome} /></Nav.Link>
              <Nav.Link href="/driver/home" style={{fontSize: '1.5rem'}}><FontAwesomeIcon icon={faTruck} /></Nav.Link>
              <Nav.Link href="/driver/profile" style={{fontSize: '1.5rem'}}><FontAwesomeIcon icon={faUser} /></Nav.Link>
              </>
            }
            
            
              {notifications=="No tiene nuevas notificaciones" || notifications.length == 0?
                <NavDropdown style={{fontSize: '1.5rem'}} title=<FontAwesomeIcon icon={faBell} /> id="collasible-nav-dropdown">
                  <NavDropdown.Item style={{fontSize: '1.2rem'}}>No tiene notificaciones</NavDropdown.Item>
                </NavDropdown>
              :
                <NavDropdown style={{fontSize: '1.5rem'}} title={<><FontAwesomeIcon icon={faBell}/><FontAwesomeIcon style={faCircleStyle} icon={faCircle}/></>} id="collasible-nav-dropdown">
                {notifications.map((value, index) => {
                  return (<>
                    <NavDropdown.Item style={{fontSize: '1.2rem'}}>{messages[value.Id_Notification_Type-1]}<FontAwesomeIcon onClick={() => this.deleteNotification(value)} style={faTrashStyle}icon={faTrash} /></NavDropdown.Item>
                    <NavDropdown.Divider/></>
                  )
                })}
                </NavDropdown>
              }
          </Nav>
          <Nav>
            <Nav.Link href="/" style={{fontSize: '1.5rem'}}><FontAwesomeIcon icon={faSignOutAlt} /></Nav.Link>
          </Nav>
          </>
        : null}
      </Navbar>
    )
  }
}

export default Top;
