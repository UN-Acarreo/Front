/*global google*/
import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './styles.module.css';
import moment from 'moment';


import Top from '../../components/top/index.jsx';
import MapContainer from '../../components/mapContainer/index.jsx';
import ModalContainer from '../../components/modal/index.jsx';
import Modal from "react-bootstrap/Modal";
import Stepper from 'react-stepper-horizontal';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';

import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faArrowLeft, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
// IMPORT STYLES REACT-BOOTSTRAP
import {Container, Row, Col, Nav, Navbar, NavDropdown, Card, Button, Form } from 'react-bootstrap';

const URL = 'http://localhost:3001'

interface State {

    show : boolean;
    showStart : boolean;
    showEnd : boolean;
    showDescription: boolean;
    date : Date;
    time : Date;
    description : string;
    weight : string;
    start : {};
    end : {};
    formatedDate : {};
    formatedTime : {};
    edit : boolean;
    editDate : Date;
    editTime : Date;
    editDescription : string;
    editWeight : string;
    id_edit : number;
}

class HomeUser extends Component {

  constructor(props){
    super(props);

    this.modalElement = React.createRef();
    this.mapElement = React.createRef();
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);


    this.state = {
      show : true,
      showStart : false,
      showEnd : false,
      showDescription : false,
      date : new Date(),
      time : new Date(),
      description : "",
      weight: "",
      start : {},
      end : {},
      formatedDate : null,
      formatedTime : null,
      edit : false,
      editDate : {},
      editTime : {},
      editDescription : "",
      editWeight : "",
      id_edit : 0,
      //
      step: 0,
      startDate: new Date(),
      //formatedTime: null,
      time_v: new Date(),
      asignada: false
    }


  }

  //notification functions declaration
  notifySuccess = (text) => toast.success(text, {containerId: 'notification'});
  notifyWarning = (text) => toast.warning(text, {containerId: 'notification'});
  notifyError = (text) => toast.error(text, {containerId: 'notification'});
  notifyInfo = (text) => toast.info(text, {containerId: 'notification'});

  //Function used to check the request fields
  check_fields = async (data) => {
    for (const key of Object.keys(data)) {
      var field = data[key]
      if(key == 'Date') {
        if (field.Year === undefined) {
          return "No se ha asignado una fecha"
        }
        if (field.Hour === undefined) {
          return "No se ha asignado una hora de inicio"
        }

        // Check date after today
        var today = new Date()
        today.setSeconds(0)
        today.setMilliseconds(0)
        today.setMinutes(today.getMinutes() + 15)
        var inserted = new Date(parseInt(field.Year),parseInt(field.Month),parseInt(field.Day),parseInt(field.Hour),parseInt(field.Minute))
        if (inserted <= today) {
          return "La fecha y hora de la reserva debe ser al menos 15 minutos posterior al tiempo actual"
        }

      }
      if(key == 'Origin_coord' && field === undefined) {
        return "No se ha asignado una coordenada de origen"
      }
      if(key == 'Destination_coord' && field === undefined ) {
        return "No se ha asignado una coordenada de destino"
      }
      if(key == 'Description' && validator.isEmpty(field.trim())) {
        return "La descripción no puede esta vacia"
      }
      if(key == 'Weight' && (!validator.isNumeric(field) || parseInt(field) <= 0)) {
        return "El peso debe ser un número mayor a 0"
      }
      if(key == 'Id_user') {
      }
      if(key == 'Duration' && field == 0) {
        return "Error al calcular la duración"
      }
    }
    return true;
  }

  handleDate(){
    this.modalElement.current.openDateModal();
  }

  handleTimer(){
    this.modalElement.current.openTimerModal();
  }

  handleInfoModal(info){
    //the info from the assigned haulage
    this.modalElement.current.openInfoModal(info);
  }

  handleStart(){
    this.setState({showStart :true})

  }

  handleEnd(){

    this.setState({showEnd :true})
  }

  handleDescription(){

   this.modalElement.current.openDescriptionModal();
  }

  setDate = (date) =>{

    var newDate = {
      day : moment(date).format('DD'),
      month : (moment(date).month()).toString(),
      year : moment(date).year().toString()
    };



    var formatDate = moment(date).format('MMMM DD YYYY');

    this.setState({date :formatDate})
    this.setState({formatedDate :newDate})
    console.log("test" ,  newDate);

  }

  setTime = (time) =>{

    var newTime = {
      hour : moment(time).format('HH'),
      minute : moment(time).format('mm')
    };

    var formatTime = moment(time).format('HH mm');

    this.setState({time :formatTime})
    this.setState({formatedTime :newTime})
    console.log(newTime);

  }

  setDescription = (description) =>{

    this.setState({description :description})


  }

  setWeight = (weight) =>{

    this.setState({weight :weight})


  }

  setStart = (start) =>{

    this.setState({start :start})
  }

  setEnd = (end) =>{

    this.setState({end :end})
  }

  componentWillMount(){

    if(sessionStorage.haulage_info!= undefined){
      this.setState({edit : true});
      this.changeDefaultValues();
    }

  }

  changeDefaultValues(){
    var editHaulage = JSON.parse(sessionStorage.haulage_info);

    var editDate = new Date(editHaulage.date);
    console.log(editHaulage);
    this.setState({ editDate : editDate,
                    editTime : editDate,
                    editDescription : editHaulage.cargo.Description,
                    editWeight : editHaulage.cargo.Weight,
                    id_edit : editHaulage.Id_haulage
                  });

  }

  async search() {

    const {formatedDate , formatedTime, edit, id_edit} = this.state
    console.log(this.state.formatedDate);

    url = URL+'/api/haulage/create'

    var info = JSON.parse(sessionStorage.login_info);

    var url;

    try{

      console.log(url)
    }
    catch(err){

      return ;
    }

    //Calculate haualge duration
    var origin_latlng =  new google.maps.LatLng(parseFloat(this.state.start.lat), parseFloat(this.state.start.lng));
    var destination_latlng =  new google.maps.LatLng(parseFloat(this.state.end.lat), parseFloat(this.state.end.lng));
    var distance = google.maps.geometry.spherical.computeDistanceBetween(origin_latlng, destination_latlng);
    distance = distance/1000 // m to km
    var avg_speed = 35; // 35km/h is the average speed on Bogotá https://transport.opendatasoft.com/pages/trafico/
    var time = distance/avg_speed // time in hours
    var load_time = (1.253/60) * this.state.weight // aprox time loading the cargo on the vehicle 1.253 min/kg of cargo
    time = time + load_time
    time = time.toFixed(2)
    time = Math.round(time) == 0 ? 1 :  Math.round(time)
    //alert("distance: "+distance+ "  " +"time: "+time)

    var request = { Date:{Year:formatedDate.year, Month:formatedDate.month, Day:formatedDate.day, Hour:formatedTime.hour, Minute:formatedTime.minute},
                    Origin_coord: this.state.start.lat ? this.state.start.lat.toString() + "," + this.state.start.lng.toString() : undefined ,
                    Destination_coord: this.state.end.lat? this.state.end.lat.toString() + "," + this.state.end.lng.toString(): undefined,
                    Description: this.state.description,
                    Comments: "",
                    Weight: this.state.weight,
                    Duration: time,
                    Id_user: info.Id_user.toString(),
                    Id_haulage: !edit ? -1 : id_edit
                  }

    console.log(request);

    const valid_fields = await this.check_fields(request);
    if(valid_fields !== true){
      this.notifyWarning(valid_fields)
      return;
    }

    // Casting
    request.Date.Year = parseInt(request.Date.Year)
    request.Date.Month = parseInt(request.Date.Month)
    request.Date.Day = parseInt(request.Date.Day)
    request.Date.Hour = parseInt(request.Date.Hour)
    request.Date.Minute = parseInt(request.Date.Minute)
    request.Weight = parseInt(request.Weight)
    request.Duration = parseInt(request.Duration)
    request.Id_user = parseInt(request.Id_user)

    axios.post(url, {request})
        .then(res =>{
            if(res.data.status == 1){
                //vehicle registered
                console.log("Registro Exitoso")
                if(edit){

                  sessionStorage.removeItem('haulage_info');
                  this.notifySuccess('Su reserva se modifico con exito');
                  this.props.history.push("/user/haulages");

                  return;

                }

                this.notifySuccess('Su reserva ha sido asignada con exito')

                var vehicles_info = res.data.data;
                /*
                info = ""
                for (var i in res.data.data) {
                  info += "Vehiculo " + (parseInt(i)+1) + "\n"
                  info += "     Placa: " + res.data.data[i].Plate + "\n"
                  info += "     Marca: " + res.data.data[i].Brand + "\n"
                  info += "     Modelo: " + res.data.data[i].Model + "\n"
                  info += "     Conductor: " + res.data.data[i].Driver_name + " " + res.data.data[i].Driver_last_name + "\n"
                  info += "     Telefono: " + res.data.data[i].Driver_phone + "\n"
                }*/
                //alert(info)
                this.handleInfoModal(vehicles_info)
                this.setState({asignada: true})
                console.log(vehicles_info)
            }else{
                // error management
                this.notifyWarning(res.data.error)

            }
        }).catch((error) => {
          if (error.response) {

            console.log(error.response.data.error);
            this.notifyError('Ha ocurrido un error en el servidor')

          }
        })

  }

  ///############
  handleInputChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    });
}
  handleDateChange=(value, e)=>{
   this.setState({
      startDate: value
  })
  var date = value;
  var newDate = {
    day : moment(date).format('DD'),
    month : (moment(date).month()).toString(),
    year : moment(date).year().toString()
  };

  var formatDate = moment(date).format('MMMM DD YYYY');

  this.setState({date : formatDate})
  this.setState({formatedDate :newDate})
  console.log("test" ,  newDate);
}

  handleTimeChange = time => {
    this.setState({
      time_v: time
    });

    var newTime = {
      hour : moment(time).format('HH'),
      minute : moment(time).format('mm')
    };

    var formatTime = moment(time).format('HH mm');

    this.setState({time :formatTime})
    this.setState({formatedTime :newTime})
    console.log(newTime);


  };

  onClickNext(){
    if(this.state.step + 1 > 5){
       return
    }
    if(this.state.step + 1 == 1){
      console.log(this.state.formatedDate)
      if(this.state.formatedDate == null){
        return this.notifyWarning("Por favor selecciona una fecha")
      }
    }
    if(this.state.step + 1 == 2){
      if(this.state.formatedTime == null){
        return this.notifyWarning("Por favor selecciona una hora")
      }
    }

    if(this.state.step + 1 == 2){
      this.setState({showStart :true})
    }
    if(this.state.step + 1 == 3){
      this.setState({showEnd :true})
    }

    this.setState({step: this.state.step + 1})
  }
  onClickPrev(){
    if(this.state.step - 1 < 0){
      return
    }
    if(this.state.step - 1 == 2){
      this.setState({showStart :true})
    }
    if(this.state.step - 1 == 3){
      this.setState({showEnd :true})
    }
    this.setState({step: this.state.step - 1})
  }

  render() {
    const buttonStyle_a = {background: 'rgb(0, 123, 255)', width: 200, padding: 10, textAlign: 'center', color: 'white', fontWeight: 600, borderRadius: '4em',
                           marginTop: 32, marginLeft: 0, display: 'inline-block', cursor: 'pointer', margin: '1em'};

    const buttonStyle_a_s = {background: '#28a745', width: 200, padding: 10, textAlign: 'center', color: 'white', fontWeight: 600, borderRadius: '4em',
                           marginTop: 32, marginLeft: 0, display: 'inline-block', cursor: 'pointer', margin: '1em'};
    const buttonStyle = { background: 'rgb(0, 123, 255)', width: 200, padding: 10, textAlign: 'center', color: 'white', fontWeight: 600, borderRadius: '4em',
                           marginTop: 32, display: 'inline-block', cursor: 'pointer', margin: '1em'};
    const {show, showStart, showEnd, edit, editDate, editTime, editDescription, editWeight} = this.state;
     return(
      <>
      <Top message = {"UNAcarreo"}
             isUser = {true}
             isDriver = {false}/>
      <ToastContainer enableMultiContainer containerId={'notification'} position={toast.POSITION.TOP_RIGHT} />
      <ModalContainer ref = {this.modalElement}
                      onDateSelected = {this.setDate}
                      onTimeSelected = {this.setTime}
                      onDescriptionSaved = {this.setDescription}
                      onWeightSaved = {this.setWeight}
                      edit = {edit}
                      editDate = {editDate}
                      editTime = {editTime}
                      editDescription = {editDescription}
                      editWeight = {editWeight}/>
      <Container fluid>
      <div style={{marginTop: '3em', textAlign: 'center', marginBottom: '3em'}}>
      <Stepper style={{lineHeight: '2em'}}steps={ [{title: 'Elegir fecha'}, {title: 'Elegir hora'}, {title: 'Elegir origen'},
                        {title: 'Elegir destino'},  {title: 'Descripción y peso'},{title: 'Buscar servicio'}] } activeStep={ this.state.step }
               completeColor={'rgb(0, 123, 255)'} size={36}  completeBarColor={'rgb(0, 123, 255)'} circleFontSize={18}
                        />
      </div>
      {/*
        <Row style={{paddingTop: '10px'}}>
          <Col sm={1} md={2} lg={3} xl={3}>
          </Col>
          <Col sm={10} md={8} lg={6} xl={6}>
            <Navbar bg="lg" variant= "light" expand="sm">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{align: 'center'}}>

                  <Nav.Link onClick = {() => this.handleDate()} style={{color: 'black'}}>FECHA</Nav.Link>
                  <Nav.Link onClick = {() => this.handleTimer()} style={{color: 'black'}}>HORA</Nav.Link>
                  <Nav.Link onClick = {() => this.handleStart()} style={{color: 'black'}}>ORIGEN</Nav.Link>
                  <Nav.Link onClick = {() => this.handleEnd()} style={{color: 'black'}}>DESTINO</Nav.Link>
                  <Nav.Link onClick = {() => this.handleDescription()} style={{color: 'black'}}>DESCRIPCION</Nav.Link>
                  <Nav.Link onClick = {() => this.search()} style={{color: 'black'}}>BUSCAR</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        */}
      </Container>
      {this.state.step == 5 ?
        this.state.asignada == true ?
          <div style={{textAlign: 'center', marginTop: '6em'}}>
          <img src='/completed.svg' style={{height: '20em', border: 0}}/>
          <p style={{fontWeight: 600, textAlign: 'center', fontSize: 'xx-large', marginTop: '1em'}}>
          Tu acarreo ha sido reservado con éxito. <a href="/user/haulages" >Ir a tus reservas</a>
          </p>
          </div>
        :
          <div style={{textAlign: 'center', marginBottom: '3em'}}>
            <div style={ buttonStyle_a }  onClick={()=> this.onClickPrev() }><FontAwesomeIcon icon={faArrowLeft}  style={{marginRight: '1em'}}/>Atras</div>
            <div style={ buttonStyle_a_s }  onClick={()=> this.search() }>Solicitar servicio<FontAwesomeIcon icon={faCheckCircle} style={{marginLeft: '1em'}}/></div>
        </div>

        :
        <div style={{textAlign: 'center', marginBottom: '3em'}}>
          <div style={ buttonStyle_a }  onClick={()=> this.onClickPrev() }><FontAwesomeIcon icon={faArrowLeft} style={{marginRight: '1em'}}/>Atras</div>
          <div style={ buttonStyle } onClick={()=> this.onClickNext() }>Continuar<FontAwesomeIcon icon={faArrowRight} style={{marginLeft: '1em'}}/></div>
      </div>

      }

    <Row className="justify-content-center" style={{marginBottom: '3em', width: '100%'}}>

      {
      this.state.step == 0 ?
      <Col sm={5} md={5} lg={5} xl={5}>
        <Container fluid >
        <Card
          style={{margin: '0 auto', }}
          bg = "dark"
          text = "white"
          style={{ width: '100%', borderRadius: '20px',boxShadow: 'rgba(0, 0, 0, 0.75) -2px 2px 13px 0px',textAlign: 'center'}}
          className="mb-2"
        >
        <Card.Header style={{fontSize: '26px',fontWeight: '500', textAlign: 'center', marginBottom: '2em'}}>
        Elija una fecha
        </Card.Header>
        <Card.Body style={{height: '8em'}}>
        <DatePicker
              selected={ this.state.startDate }
              onChange={(value, e) => this.handleDateChange(value, e)}
            />
        </Card.Body>
        </Card>
        </Container>
        </Col>
        : null

      }
      {
      this.state.step == 1 ?
      <Col sm={5} md={5} lg={5} xl={5}>
        <Container fluid >
        <Card
          style={{margin: '0 auto'}}
          bg = "dark"
          text = "white"
          style={{ width: '100%', borderRadius: '20px',boxShadow: 'rgba(0, 0, 0, 0.75) -2px 2px 13px 0px',textAlign: 'center'}}
          className="mb-2"
        >
        <Card.Header style={{fontSize: '26px',fontWeight: '500', textAlign: 'center', marginBottom: '2em'}}>
        Elija una hora
        </Card.Header>
        <Card.Body style={{height: '8em'}}>
        <DatePicker
          selected={this.state.time_v}
          onChange={(value, e) => this.handleTimeChange(value, e)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />

        </Card.Body>
        </Card>
        </Container>
        </Col>
        : null
      }
      {
        this.state.step == 2 || this.state.step == 3 ?
      <div className = {styles.test} style={{width: '70%', height: '75%', margin: '0 auto',  marginBottom: '4em',
                       boxShadow: 'rgba(0, 0, 0, 0.75) -2px 2px 17px -5px', borderRadius: '20px',}} >
        <MapContainer
                      style={{borderRadius: '20px'}}
                      ref = {this.mapElement}
                      showStart = {showStart}
                      showEnd = {showEnd}
                      onStartSelected = {this.setStart}
                      onEndSelected = {this.setEnd}
                      edit = {edit}
        />
          </div>
        : null
      }

      {
        this.state.step == 4 ?
        <Col sm={5} md={5} lg={5} xl={5}>
          <Container fluid >
          <Card
            style={{margin: '0 auto'}}
            bg = "dark"
            text = "white"
            style={{ width: '100%', borderRadius: '20px',boxShadow: 'rgba(0, 0, 0, 0.75) -2px 2px 13px 0px',textAlign: 'center'}}
            className="mb-2"
          >
          <Card.Header style={{fontSize: '26px',fontWeight: '500', textAlign: 'center'}}>
         Completa la información
          </Card.Header>
          <Card.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control as="textarea" rows="3"  type="text" defaultValue = {this.state.description} name="description"
                         value={this.state.description} onChange={(e)=>this.handleInputChange(e)}  />

          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Peso(kg)</Form.Label>
            <Form.Control as="textarea" rows="3"  type="text" defaultValue = {this.state.weight} name="weight" type="number"
                          value= {this.state.weight} onChange={(e)=>this.handleInputChange(e)} />
          </Form.Group>

          </Card.Body>
          </Card>
          </Container>
          </Col>
        : null
      }

      </Row>

{/*
      <div className = {styles.test} >
        <MapContainer
                      ref = {this.mapElement}
                      showStart = {showStart}
                      showEnd = {showEnd}
                      onStartSelected = {this.setStart}
                      onEndSelected = {this.setEnd}
                      edit = {edit}
        />
      </div> */}
      </>
    )
  }
}

export default HomeUser;
