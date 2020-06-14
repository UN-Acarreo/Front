import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './styles.module.css';

import Top from '../../components/top/index.jsx';
import HomeContainer from '../../components/homeContainer/index.jsx';
import {ButtonGroup , Button} from "react-bootstrap";
import HaulageMap from '../../components/haulageMap/index.jsx';
import RatingModal from '../../components/RatingModal/RatingModal.js';
import axios from 'axios';
import {Container, Row, Col, Nav, Navbar, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component'
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';


const URL = 'http://localhost:3001';

interface State {


    haulagesList : [];

    id_Haulage : string;
    haulage_state : string;
    description : string;
    driver : string;
    originLat : number;
    originLng : number;
    destinationLat : number;
    destinationLnt : number;
    userName : string;
    weight : string;
    startDate : string;
    endDate : string;

}

class HomeDriver extends Component {

  constructor(props){
    super(props);

    this.state = {
      haulagesList : [],
      id_Haulage : "",
      haulage_state : "",
      description : "",
      driver : "",
      originLat : 4.623312804563147,
      originLng : -74.08423908996583,
      destinationLat : 4.645812467426614,
      destinationLnt : -74.07539852905275,
      userName : "",
      weight : "",
      startDate : "",
      endDate : ""
      
    }

  }

  componentWillMount(){
    this.getHaulages();

  }

  async getHaulages(){

    var info = JSON.parse(sessionStorage.login_info);

    var url = URL+'/api/haulage/driver/list/'+ info.Id_driver;

    

    axios.get(url)
      .then( (response) => {
        console.log(response);

        var initial = response.data.haulages[0];

        var startDate = this.formatDate(new Date(initial.haulage.Date));

        var endDate = this.formatDate(new Date(initial.haulage.End_date));

        this.setState({ haulagesList : response.data.haulages,
                        originLat : initial.route.Origin_coord.split(',')[0],
                        originLng : initial.route.Origin_coord.split(',')[1],
                        destinationLat : initial.route.Destination_coord.split(',')[0],
                        destinationLnt : initial.route.Destination_coord.split(',')[1],
                        id_Haulage : initial.haulage.Id_haulage,
                        haulage_state : initial.status.Status_description,
                        userName : initial.user.User_last_name + " " + initial.user.User_name,
                        description : initial.cargo.Description,
                        weight : initial.cargo.Weight + " kg",
                        startDate : startDate,
                        endDate : endDate

        });

    })
      .catch(function (error) {
        console.log(error);
    })
      .then(function () {
        // always executed
    });
    
  }

  handleClick(index){
    console.log( this.state.haulagesList);

    var actualHaulage = this.state.haulagesList[index];

    var startDate = this.formatDate(new Date(actualHaulage.haulage.Date));

    var endDate = this.formatDate(new Date(actualHaulage.haulage.End_date));

    this.setState({
      
      originLat : actualHaulage.route.Origin_coord.split(',')[0],
      originLng : actualHaulage.route.Origin_coord.split(',')[1],
      destinationLat : actualHaulage.route.Destination_coord.split(',')[0],
      destinationLnt : actualHaulage.route.Destination_coord.split(',')[1],
      id_Haulage : actualHaulage.haulage.Id_haulage,
      haulage_state : actualHaulage.status.Status_description,
      userName : actualHaulage.user.User_last_name + " " + actualHaulage.user.User_name,
      description : actualHaulage.cargo.Description,
      weight : actualHaulage.cargo.Weight + " kg",
      startDate : startDate,
      endDate : endDate
    })

  }

  formatDate(date){
    return moment(date).format('YYYY MM DD hh:mm');
  }

  render() {

    const {haulagesList, originLat, originLng, destinationLat, destinationLnt, id_Haulage, haulage_state, userName, description, weight, startDate, endDate} = this.state;

     return(
      <div>
        <Top message = {"UNAcarreo"}
             isUser = {false}
             isDriver = {true}/>

            
        <Container fluid>
          <Row className={styles.row2}>
            <DropdownButton variant="secondary" title="Servicios" style={{width: '100%'}}>
              {haulagesList.map((row,index) => (
                <Dropdown.Item onClick = {() => this.handleClick(index)} key={row+index}>{"SERVICIO " + (index+1)}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Row>

          <Row>
            <Col sm={8} md={8} lg={8} xl={8}>
              <div className = {styles.test}>
              <HaulageMap origin = {{lat:  parseFloat(originLat), lng:parseFloat(originLng)}}
                          destination = {{lat:  parseFloat(destinationLat), lng: parseFloat(destinationLnt)}}/>
              </div>
            </Col>
            <Col sm={4} md={4} lg={4} xl={4}>
              <div className= {classNames(styles.title)} >NUMERO DE LA RESERVA:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{id_Haulage}</span>
              </div>

              <div className= {classNames(styles.title)} >ESTADO:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{haulage_state}</span>
              </div>

              <div className= {classNames(styles.title)} >CLIENTE:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{userName}</span>
              </div>

              <div className= {classNames(styles.title)} >DESCRIPCION:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{description}</span>
              </div>

              <div className= {classNames(styles.title)} >PESO DE LA CARGA:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{weight}</span>
              </div>

              <div className= {classNames(styles.title)} >FECHA DE INICIO:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{startDate}</span>
              </div>

              <div className= {classNames(styles.title)} >FECHA LIMITE:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{endDate}</span>
              </div>
            </Col>

          </Row>
          

        </Container>
            
      </div>
    )
  }
}

export default HomeDriver;
