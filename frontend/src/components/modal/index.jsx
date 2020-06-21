import React, { Component } from 'react';

import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { InputGroup, FormGroup, FormControl, Button,Form} from 'react-bootstrap';



import "react-datepicker/dist/react-datepicker.css";


interface Props {

}

interface State {

    show : boolean;
    startDate:  Date;
    time:  Date;
    isTimer : boolean;
    isDate : boolean;
    isDescription : Boolean;
    isInfo : Boolean;
}

class ModalContainer extends Component {

constructor(props){
    super(props);

    this.state = {
      show : false,
      startDate: new Date(),
      time: new Date(),
      isTimer : false,
      isDate : false,
      isDescription : false,
      isInfo: false,
      info: null
    }

  }

  handleClose(){
    this.setState({show :false, isInfo: false})
  }

  openInfoModal(info){
    this.setState({show :true, isInfo: true, info: info , isDescription: false, isTimer: false, isDate: false})
  }

  openDateModal(){

    this.setState({isDate :true})

    this.setState({isTimer :false})
    this.setState({isDescription :false})
    this.setState({show :true})
  }

  openTimerModal(){

    this.setState({isTimer :true})

    this.setState({isDate :false})
    this.setState({isDescription :false})
    this.setState({show :true})
  }

  openDescriptionModal(){
    this.setState({isDescription:true})

    this.setState({isDate :false})
    this.setState({isTimer :false})
    this.setState({show :true})
  }

  handleChange = date => {



    this.setState({
      startDate: date
    });
  };

  handleTimeChange = time => {
    this.setState({
      time: time
    });


  };



  handleDateChange=(value, e)=>{
   this.setState({
      startDate: value
  });

  this.props.onDateSelected(value);
  }

  handleTimeChange=(value, e)=>{
   this.setState({
      time: value
  });

  this.props.onTimeSelected(value);
  }

  save(){

    const value = this.myDescription.value;
    const value2 = this.myWeight.value;

    this.props.onDescriptionSaved(value);
    this.props.onWeightSaved(value2);

    this.handleClose();
  }





  render() {
    const URL = 'http://localhost:3001'
    const {show, isDate,isTimer, isDescription} = this.state;
    
    return (
      <>
        <Modal show={show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
            {isDate ?
              <Modal.Title>Elija una Fecha</Modal.Title>
            :null}
            {isTimer ?
              <Modal.Title>Elija una Hora</Modal.Title>
            :null}
            {isDescription ?
              <Modal.Title>Informacion General</Modal.Title>
            : null}
            {
              this.state.isInfo ?
              <Modal.Title>Informacion de tu acarreo</Modal.Title>
              :null}
          </Modal.Header>
          <Modal.Body>
            {isDate ?
            <>
            
              <DatePicker
                    selected={ this.state.startDate }
                    onChange={(value, e) => this.handleDateChange(value, e)}
                  />
              <Button variant="primary" onClick = {() => this.handleClose()}>Guardar</Button>
            
            </>
                
            :null}
            {isTimer ?

            <>
              <DatePicker
                selected={this.state.time}
                onChange={(value, e) => this.handleTimeChange(value, e)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
              <Button variant="primary" onClick = {() => this.handleClose()}>Guardar</Button>

            </>  
            :null}
            {isDescription ?
              <>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control as="textarea" rows="3" ref={ref => { this.myDescription = ref; }} type="text"/>
                    
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Peso(kg)</Form.Label>
                  <Form.Control as="textarea" rows="3" ref={ref => { this.myWeight = ref; }} type="text"/>
                </Form.Group>

                <Button variant="primary" onClick = {() => this.save()}>Guardar</Button>
              </>
            : null}
            {
              this.state.isInfo ?
              <>
              {this.state.info.map(function(vehicle, i){
                let num = parseInt(i+1)
                return(
                <div key={i} style={{marginTop: '3em'}}>
                <img src={URL+vehicle.vehicle_photo} style={{marginRight: '3em', float: 'right', width: '30%'}} />
                <li >{"Vehículo: "+num}</li>
                <li >{"Placa: "+vehicle.Plate}</li>
                <li >{"Marca: "+vehicle.Brand}</li>
                <li >{"Modelo: "+vehicle.Model}</li>
                <li >{"Conductor: "+vehicle.Driver_name + " "+ vehicle.Driver_last_name}</li>
                <li >{"Teléfono: "+vehicle.Driver_phone}</li>
                </div>
              )
              })
              }
              <Button variant="primary" onClick = {() => this.handleClose()} style={{marginTop: '3em'}}>Cerrar</Button>
              </>
              : null
            }
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalContainer;
