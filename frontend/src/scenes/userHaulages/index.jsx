import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './styles.module.css';

import Top from '../../components/top/index.jsx';
import HomeContainer from '../../components/homeContainer/index.jsx';
import {ButtonGroup , Button} from "react-bootstrap";
import HaulageMap from '../../components/haulageMap/index.jsx';
import RatingModal from '../../components/RatingModal/RatingModal.js';
import axios from 'axios';
import {Container, Row, Col, Nav, Navbar, NavDropdown, Dropdown, DropdownButton, Card,Badge,ListGroup  } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component'
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

const URL = 'http://localhost:3001'

const lotList = [{number:1} , {number:2} , {number:3}, {number:4} ];


interface Props {

}

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

}


class UserHaulages extends Component {

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
      rating: null,
      vehicles: null,


      //used to set the rating
      show_rating_modal : false,
      Puntuality: 0,
      Cargo_state: 0,
      Customer_support: 0,
      Comments: "",
      //used to see the assigned rating
      show_assigned_rating: false,
      current_index: 0
    }

  }

  componentWillMount(){
    this.getHaulages();

  }

  //notification functions declaration
  notifySuccess = (text) => toast.success(text, {containerId: 'notification'});
  notifyWarning = (text) => toast.warning(text, {containerId: 'notification'});
  notifyError = (text) => toast.error(text, {containerId: 'notification'});
  notifyInfo = (text) => toast.info(text, {containerId: 'notification'});

  async getHaulages (){

    var info = JSON.parse(sessionStorage.login_info);;

    var url = URL+'/api/haulage/user/list/'+ info.Id_user;
    axios.get(url)
      .then( (response) => {
        console.log(response)

        //Sort the array so it stays consistent since rated haulages are returned last by database
        response.data.haulages.sort((a, b) => a.Id_haulage - b.Id_haulage);

        var haulagesList = response.data.haulages;

        this.getFilterLists(haulagesList);
        this.setCurrentList();


        var initial = this.state.activeList[0];

        var name = this.state.activeList[0].vehicles[0].driver.Driver_name;
        this.setState({ haulagesList :response.data.haulages,
                        originLat : initial.route.Origin_coord.split(',')[0],
                        originLng : initial.route.Origin_coord.split(',')[1],
                        destinationLat : initial.route.Destination_coord.split(',')[0],
                        destinationLnt : initial.route.Destination_coord.split(',')[1],
                        id_Haulage : response.data.haulages[0].Id_haulage,
                        haulage_state : initial.status.Status_description,
                        description : initial.cargo.Description,
                        driver :name,
                        rating : initial.rating,
                        vehicles:  initial.vehicles

        })

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

    if(this.state.activeList.length == 0){
      this.notifyError('No existen servicios del estado seleccionado.');
      return;
    }

    var actualHaulage = this.state.activeList[index];

    this.setState({
      current_index: index,
      id_Haulage : actualHaulage.Id_haulage,
      haulage_state : actualHaulage.status.Status_description,
      description : actualHaulage.cargo.Description,
      driver : actualHaulage.vehicles[0].driver.Driver_name,
      originLat : actualHaulage.route.Origin_coord.split(',')[0],
      originLng : actualHaulage.route.Origin_coord.split(',')[1],
      destinationLat : actualHaulage.route.Destination_coord.split(',')[0],
      destinationLnt : actualHaulage.route.Destination_coord.split(',')[1],
      rating: actualHaulage.rating,
      show_assigned_rating: false,
      show_rating_modal: false,
      vehicles: actualHaulage.vehicles
    })

  }

  handleClose(){ //closes the rating modal
    this.setState({show_rating_modal: false})
  }

  openRatingModal(){ //opens the rating modal
    this.setState({show_rating_modal: true})
  }

  openAssignedRatingModal(){ //shows the assigned rating
    this.setState({show_assigned_rating: true})
  }

  PuntualityChanged = (newRating) => {
    this.setState({Puntuality: newRating})
  }

  Cargo_stateChanged = (newRating) => {
      this.setState({Cargo_state: newRating})
  }

  Customer_supportChanged = (newRating) => {
      this.setState({Customer_support: newRating})
  }

  handleCommentsChange = (event) => {
      this.setState({Comments:event.target.value})
    };

  cancelService(){
    var url = URL+'/api/haulage/cancel';
    var request = {Id_haulage: this.state.id_Haulage,
                   vehicles: this.state.vehicles,
                  }

    axios.post(url, {request})
      .then( (response) => {
        console.log(response)
        var actualHaulage = this.state.haulagesList[this.state.current_index];
        actualHaulage.rating = response.data.info;
        //upadte the haulage with the new canceled status
        this.setState({haulage_state: "Cancelado"})

        this.notifySuccess(response.data.message);
        this.getHaulages();
    })
      .catch(function (error) {
        console.log(error);
        this.notifyError("Se ha producido un error al cancelar el servicio");
    })
  }

  send_rating(){
    console.log(this.state)
    var url = URL+'/api/haulage/rate';
    var body = {Id_haulage: this.state.id_Haulage,
                Puntuality: this.state.Puntuality,
                Cargo_state: this.state.Cargo_state,
                Customer_support: this.state.Customer_support,
                Comments: this.state.Comments
                }
    axios.post(url, body)
      .then( (response) => {
        console.log(response)
        var actualHaulage = this.state.haulagesList[this.state.current_index];
        actualHaulage.rating = response.data.info; //upadte the haulage with the new rating
        //upadte the haulage with the new rating and reset the rating state
        this.setState({show_rating_modal: false, show_assigned_rating: false,
                       rating: response.data.info, Puntuality: 0,
                       Cargo_state: 0, Customer_support: 0, Comments: ""})

        this.notifySuccess(response.data.message)
    })
      .catch(function (error) {
        console.log(error);
        this.notifyError("Se ha producido un error al calificar el servicio");
    })
      .then(function () {
        // always executed
    });
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



  render() {


    const {haulagesList, id_Haulage, haulage_state,description,driver, originLat, originLng, destinationLat, destinationLnt, statusList, activeList,} = this.state;
    return (
      <>
        <Top message = {"UNAcarreo"}
          isUser = {true}
          isDriver = {false}/>
        <ToastContainer enableMultiContainer containerId={'notification'} position={toast.POSITION.TOP_RIGHT} />
        <Container fluid>
          <Row className={styles.row2} style={{margin: '2em', marginLeft: '0em'}}>
            <DropdownButton variant="secondary" title="Reservas" >
              {activeList.map((row,index) => (
                <Dropdown.Item onClick = {() => this.handleClick(index)} key={row+index}>{"RESERVA " + (index+1)}</Dropdown.Item>
              ))}
            </DropdownButton>

            <DropdownButton variant="secondary" title="Estado"className={styles.drop}>
              {statusList.map((row,index) => (
                <Dropdown.Item onClick = {() => this.handleStatusClick(index)} key={row+index}>{row}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Row>
          <Row>
            <Col sm={7} md={7} lg={7} xl={7}>
              <div className = {styles.test} style={{ boxShadow: 'rgba(0, 0, 0, 0.75) -2px 2px 17px -5px', borderRadius: '20px', maxWidth: '95%'}}>
              <HaulageMap origin = {{lat:  parseFloat(originLat), lng:parseFloat(originLng)}}
                          destination = {{lat:  parseFloat(destinationLat), lng: parseFloat(destinationLnt)}}/>
              </div>
            </Col>
            <Col sm={5} md={5} lg={5} xl={5}>

            <Card
              bg={'dark'}
              text={'white'}
              style={{ width: '100%', marginRight: '3em', borderRadius: '20px',boxShadow: 'rgba(0, 0, 0, 0.75) -2px 2px 13px 0px'}}
              className="mb-2"
            >
            <Card.Header style={{fontSize: '26px',fontWeight: '500'}}>Información del servicio </Card.Header>
             <Card.Body>
              <div className= {classNames(styles.cont)}><span style={{color:'#2196F3'}}>NUMERO DE LA RESERVA:</span>
              {" #"+id_Haulage}
              </div>

                {/*<div className= {classNames("d-flex justify-content-center", styles.profileText)}>
              </Badge>
              <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{id_Haulage}</span>
              </div>*/}

              <div className= {classNames(styles.cont)} > <span style={{color:'white'}}>ESTADO:</span>
              {"  "}{haulage_state}
              </div>
              {/*
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{haulage_state}</span>
              </div>*/}

              <div className= {classNames(styles.cont)} style={{marginBottom: '1em'}} ><span style={{color:'white'}}>DESCRIPCION:</span>
               {"  "}{description}
              </div>
            {/*  <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{description}</span>
              </div>*/}


              {this.state.vehicles ? this.state.vehicles.map((vehicle,index) => (
                <div className= {classNames(styles.cont)} >
                <hr/>
                <div  style={{marginBottom: '0.5em'}}>
                <span style={{color:'#2196F3'}}>CONDUCTOR ASIGNADO {index+1}: </span>
                 {" "+vehicle.driver.Driver_name}
                </div>
                <p>Teléfono: {vehicle.driver.Driver_phone}</p>
                {/* <img key={index} src={URL+vehicle.driver.Driver_photo} width='20%'  height='20%' />*/}
                  <p>
                  <img  style={{marginRight: '1em'}} key={vehicle.vehicle.Photo}
                        src={URL+vehicle.vehicle.Photo} width='20%'  height='20%' />
                  <Badge variant="secondary" style={{marginLeft: '1em'}}>Placa: {vehicle.vehicle.Plate}</Badge>
                  <Badge variant="secondary" style={{marginLeft: '1em'}}>Marca: {vehicle.vehicle.Brand}</Badge>
                  <Badge variant="secondary" style={{marginLeft: '1em'}}>Modelo: {vehicle.vehicle.Model}</Badge>
                  </p>


                 </div>
              )) : null
              }

              {/*
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{driver}</span>
              </div>*/}
              <Card.Footer style={{display: 'flex', padding: '0.5em'}}>
              {this.state.rating == null || this.state.rating == "El servicio no ha sido calificado" && haulage_state == "Done" ?
              <>
              <div className= {styles.line} style={{margin:'0.5em', marginTop: '1em',marginLeft: '0'}}>
                <Button variant="primary" onClick={()=>this.openRatingModal()}>
                  Calificar el servicio
                </Button>
              </div>
              </>
               :haulage_state == "Done" ?
               <>
               <div className= {styles.line} style={{margin:'0.5em', marginTop: '1em', marginLeft: '0'}}>
                 <Button variant="primary" onClick={()=>this.openAssignedRatingModal()}>
                   Ver calificación asignada
                 </Button>
               </div>
               <RatingModal show={this.state.show_assigned_rating} rating={this.state.rating} />
               </>

               :

               null
             }

             {haulage_state =="Reserved" ?
             
              <div className= {styles.line} style={{margin:'0.5em', marginTop: '1em'}}>
                <Button variant="secondary" onClick={()=>this.cancelService()}>
                  Cancelar el servicio
                </Button>
              </div> : 

              null
             
             }

             
          </Card.Footer>
       </Card.Body>
     </Card>



          <Modal show={this.state.show_rating_modal} onHide={()=>this.handleClose()}>
           <Modal.Header closeButton>
             <Modal.Title>Calificar el servicio</Modal.Title>
           </Modal.Header>
           <Modal.Body style={{margin: '1em'}}>
          <div   style={{marginBottom: '1em'}}>Puntualidad:
           <ReactStars count={5}  onChange={this.PuntualityChanged} value={this.state.Puntuality} size={24} half={false} color2={'#ffd700'} />
          </div>

           <div  style={{marginBottom: '1em'}}>Estado de los paquetes:
           <ReactStars count={5}  onChange={this.Cargo_stateChanged}  value={this.state.Cargo_state} size={24} half={false} color2={'#ffd700'} />
           </div>

           <div  style={{marginBottom: '1em'}}>Atención al cliente:
           <ReactStars count={5}  onChange={this.Customer_supportChanged}  value={this.state.Customer_support} size={24} half={false} color2={'#ffd700'} />
           </div>

          <div  style={{marginBottom: '1em'}}>Comentarios adicionales:
          <div><textarea  type="text" name="name" style={{width: '70%'}} rows={2} value={this.state.Comments} onChange={this.handleCommentsChange}/></div>
           </div>

            </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={()=>this.handleClose()}>
               Cerrar
             </Button>
             <Button variant="primary" onClick={()=>this.send_rating()}>
               Enviar calificación
             </Button>
           </Modal.Footer>
         </Modal>

            </Col>
          </Row>

        </Container>

      </>
    )
  }
}

export default UserHaulages;
