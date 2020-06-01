import React, { Component } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

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
class HomeContainer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    console.log(localStorage.getItem('user_id'))
    const {isDriver, isUser} = this.props;

    return(
      <>
      <Container fluid>
        <Row style={row_style}>
          <Col md={6}>
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
          </Col>
          <Col md={6}>
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
