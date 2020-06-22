import React, { Component } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


import classNames from "classnames";

// IMPORT STYLES REACT-BOOTSTRAP
import {Container, Row, Col, Nav } from 'react-bootstrap';

interface Props{
  isDriver :  boolean;
  isUser :    boolean;
}

const row_style = {
  paddingTop: "40px",
  paddingBottom: "100px"
}

const URL = 'http://localhost:3001'

class HomeContainer extends Component {

  constructor(props){
    super(props);
  }

  notifyError = (text) => toast.error(text, {containerId: 'notification'});

  async goToHaulages (){

    var info = JSON.parse(sessionStorage.login_info);;

    var url = URL+'/api/haulage/user/list/'+ info.Id_user;
    axios.get(url)
      .then( (response) => {
        //Sort the array so it stays consistent since rated haulages are returned last by database

          this.checkHaulages(response.data.haulages );
          
          
    })
      .catch(function (error) {
        console.log(error);
    })
      .then(function () {
        // always executed
    });

  }

  checkHaulages(list){
    if(list != null){
      
      this.props.history.push("/user/haulages");
      
    } else{
      
      this.notifyError('No existen reservas, por favor crear una reserva nueva.');
      
    }
  }

  render() {
    console.log(localStorage.getItem('user_id'))
    const {isDriver, isUser} = this.props;

    return(
      <>
      <ToastContainer enableMultiContainer containerId={'notification'} position={toast.POSITION.TOP_RIGHT} />
      <Container fluid>
        <Row style={row_style} style={{fontWeight: 600}}>
          <Col md={6}>
            {isUser ?
              <>
                <a href="/user/home">
                  <img src="/mapImg.png"  className= {classNames("rounded mx-auto d-block", styles.imgCon)} alt="..."></img>
                </a>
                <div className= {classNames("d-flex justify-content-center mt-5", styles.text)}>
                  PROGRAMAR
                </div>
                <div className= {classNames("d-flex justify-content-center ", styles.text)}>
                  UNA
                </div>
                <div className= {classNames("d-flex justify-content-center ", styles.text)}>
                  RESERVA
                </div>
              </>
            :
              <>
                <a href="/driver/home">
                  <img src="/mapImg.png" className= {classNames("rounded mx-auto d-block", styles.imgCon)} alt="..."></img>
                </a>
                <div className= {classNames("d-flex justify-content-center mt-5", styles.text)}>
                  CONSULTAR
                </div>
                <div className= {classNames("d-flex justify-content-center ", styles.text)}>
                  SERVICIOS
                </div>
                <div className= {classNames("d-flex justify-content-center ", styles.text)}>
                  DISPONIBLES
                </div>
              </>
            }
          </Col>
          <Col md={6}>
            <a  onClick = {() => this.goToHaulages()} className= {classNames(styles.goTo)}>
            {/*  <img src="/reservation.jpg" className= {classNames("rounded mx-auto d-block", styles.imgCon)} alt="..."></img> */}
             <img src="/trucks.png" className= {classNames("rounded mx-auto d-block", styles.imgCon)} style={{maxHeight: '14em'}} alt="..."></img>
            </a>
            
              <div className= {classNames("d-flex justify-content-center mt-5", styles.text)}>
                MIS RESERVAS
              </div>
            
              
          </Col>
        </Row>
      </Container>
      {/* <div className= {classNames("container-fluid d-flex h-100 flex-column", styles.home)}>
        <div class="row h-100">
          <div className= {classNames("col-6", styles.leftCon)}>
            <a href="/user/profile">
              <img src="/mapImg.png" className= {classNames("rounded mx-auto d-block", styles.imgCon)} alt="..."></img>
            </a>
            {isUser ?
              <>
                <div className= {classNames("d-flex justify-content-center mt-5", styles.text)}>
                  PROGRAMAR
                </div>
                <div className= {classNames("d-flex justify-content-center ", styles.text)}>
                  UNA
                </div>
                <div className= {classNames("d-flex justify-content-center ", styles.text)}>
                  RESERVA
                </div>
              </>
            :
              <>
                <div className= {classNames("d-flex justify-content-center mt-5", styles.text)}>
                  CONSULTAR
                </div>
                <div className= {classNames("d-flex justify-content-center ", styles.text)}>
                  SERVICIOS
                </div>
                <div className= {classNames("d-flex justify-content-center ", styles.text)}>
                  DISPONIBLES
                </div>
              </>
            }
          </div>
          <div class="col-6">
            <a {...isDriver ? {href:"/driver/home"} : {href:"/user/home"}}>
              <img src="/reservation.jpg" className= {classNames("rounded mx-auto d-block", styles.imgCon)} alt="..."></img>
            </a>
            {isUser ?
              <div className= {classNames("d-flex justify-content-center mt-5", styles.text)}>
                MIS RESERVAS
              </div>
            :
              <div className= {classNames("d-flex justify-content-center mt-5", styles.text)}>
                MIS SERVICIOS
              </div>
            }
          </div>
        </div>
      </div> */}
      </>
    )
  }
}

export default HomeContainer;
