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
    statusList : [];

    inProgressList : [];
    reservedList : [];
    cancelledList : [];
    doneList : [];
    waitingList : [];

    activeList : [];

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

    currentIndex : number;

}

class HomeDriver extends Component {

  constructor(props){
    super(props);

    this.state = {
      haulagesList : [],
      statusList : ["In progress", "Reserved", "Cancelled", "Done", "Waiting for driver"],
      inProgressList : [],
      reservedList : [],
      cancelledList : [],
      doneList : [],
      waitingList : [],
      activeList : [],
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
      endDate : "",
      currentIndex : 0

    }

  }

  notifySuccess = (text) => toast.success(text, {containerId: 'notification'});
  notifyError = (text) => toast.error(text, {containerId: 'notification'});

  componentWillMount(){
    this.getHaulages();

  }

  async getHaulages(){

    var info = JSON.parse(sessionStorage.login_info);

    var url = URL+'/api/haulage/driver/list/'+ info.Id_driver;

    axios.get(url)
      .then( (response) => {
        console.log(response);

        var haulagesList = response.data.haulages;

        this.getFilterLists(haulagesList);

        this.setCurrentList();

        var initial = this.state.activeList[0];

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
    console.log( this.state.activeList);

    if(this.state.activeList.length == 0){
      this.notifyError('No existen servicios del estado seleccionado.');
      return;
    }

    var actualHaulage = this.state.activeList[index];

    var startDate = this.formatDate(new Date(actualHaulage.haulage.Date));

    var endDate = this.formatDate(new Date(actualHaulage.haulage.End_date));

    this.setState({

      currentIndex : index,
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

  handleStatusClick(index){

    const {inProgressList, reservedList, cancelledList, doneList, waitingList} = this.state;

    if(index == 0){
      this.setState({activeList : inProgressList}, function () {this.handleClick(0)});
      return;
    } else if(index == 1){
      this.setState({activeList : reservedList},function () {this.handleClick(0)});

      return;
    } else if(index == 2){
      this.setState({activeList : cancelledList},  function () {this.handleClick(0)});

      return;
    } else if(index == 3){
      this.setState({activeList : doneList},  function () {this.handleClick(0)});

      return;
    } else {
      this.setState({activeList : waitingList},  function () {this.handleClick(0)});

      return;
    }
  }

  getFilterLists(list){

    const inProgressList = list.filter(haulage => haulage.status.Status_description == "In progress");
    const reservedList = list.filter(haulage => haulage.status.Status_description == "Reserved");
    const cancelledList = list.filter(haulage => haulage.status.Status_description == "Cancelled");
    const doneList = list.filter(haulage => haulage.status.Status_description == "Done");
    const waitingList = list.filter(haulage => haulage.status.Status_description == "Waiting for driver");

    this.setState({
      inProgressList : inProgressList,
      reservedList : reservedList,
      cancelledList : cancelledList,
      doneList : doneList,
      waitingList : waitingList
    });
  }

  setCurrentList(){

    const {inProgressList, reservedList, cancelledList, doneList, waitingList} = this.state;
    console.log(inProgressList);

    if(inProgressList.length !== 0){
      console.log(1);

      this.setState({activeList : inProgressList});
      return;
    }else if(reservedList.length !== 0){
      console.log(2);
      this.setState({activeList : reservedList});
      return;
    }else if(cancelledList.length !== 0){
      console.log(3);
      this.setState({activeList : cancelledList});
      return;
    }else if(doneList.length !== 0){
      console.log(4);
      this.setState({activeList : doneList});
      return;
    } else {
      console.log(5);
      this.setState({activeList : waitingList});
      return;
    }

  }

  formatDate(date){
    return moment(date).format('YYYY MM DD hh:mm');
  }

  async completeService(){

    var url = URL+'/api/haulage/finish';

    var request = {Id_haulage: this.state.id_Haulage}

    axios.post(url,{request})
      .then( (response) => {

        console.log(response);
        this.notifySuccess('El servicio se ha completado correctamente.');
        this.getHaulages();

    })
      .catch(function (error) {
        console.log(error);
    })

  }

  render() {

    const { haulagesList, originLat, originLng, destinationLat, destinationLnt, id_Haulage, haulage_state, userName, description, weight, startDate, endDate,
            statusList, activeList, currentIndex} = this.state;

     return(
      <div>
        <Top message = {"UNAcarreo"}
             isUser = {false}
             isDriver = {true}/>

        <ToastContainer enableMultiContainer containerId={'notification'} position={toast.POSITION.TOP_RIGHT} />

        <Container fluid>
          <Row className={styles.row2}  style={{margin: '2em', marginLeft: '0em'}}>

            <DropdownButton variant="secondary" title="Servicios">
              {
              activeList.length != 0 ? activeList.map((row,index) => (
                <Dropdown.Item onClick = {() => this.handleClick(index)} key={row+index}>{"SERVICIO " + (index+1)}</Dropdown.Item>
              )) : <Dropdown.Item>{"NO HAY SERVICIOS"}</Dropdown.Item>
              }
            </DropdownButton>

            <DropdownButton variant="secondary" title="Estado"className={styles.drop}>
              {statusList.map((row,index) => (
                <Dropdown.Item onClick = {() => this.handleStatusClick(index)} key={row+index}>{
                  row === "In progress" ? "En progreso" : 
                  row === "Reserved" ? "Reservado" : 
                  row === "Cancelled" ? "Cancelado" : 
                  row === "Done" ? "Terminado" : 
                  row === "Waiting for driver" ? "En espera" : 
                  "Error"
                }</Dropdown.Item>
              ))}
            </DropdownButton>

          </Row>

          <Row>
            <Col sm={8} md={8} lg={8} xl={8}>
              <div className = {styles.test}  style={{ boxShadow: '-2px 2px 13px -7px rgba(0,0,0,0.75)', borderRadius: '20px'}}>
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
              {(haulage_state == "Done") ?

                null

              :

                <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                  <Button variant="success" onClick={()=>this.completeService()}>
                    COMPLETAR SERVICIO
                  </Button>
                </div>

              }

            </Col>

          </Row>


        </Container>

      </div>
    )
  }
}

export default HomeDriver;
