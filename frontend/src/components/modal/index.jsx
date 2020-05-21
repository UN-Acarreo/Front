import React, { Component } from 'react';

import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";


interface Props {

}

interface State {

    show : boolean;
    startDate:  Date;
    isTimer : boolean;
    isDate : boolean;
}

class ModalContainer extends Component {
  
constructor(props){
    super(props);

    this.state = {
      show : false,
      startDate: new Date(),
      isTimer : false,
      isDate : false
    }
    
  }
  
  handleClose(){
    this.setState({show :false})
  }

  openDateModal(){

    this.setState({isDate :true})
    this.setState({show :true})
  }

  openTimerModal(){

    this.setState({isDate :false})
    this.setState({show :true})
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    
      const {show, isDate} = this.state;

      
    return (
      
     
      <>
       {console.log(this.state.startDate)}
        <Modal show={show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
          <Modal.Body>

            {isDate ? 
            
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              /> : 

              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            
            }
            
          
          </Modal.Body>
          <Modal.Footer>This is the footer</Modal.Footer>
        </Modal>
      </>
      
    );
  }
}

export default ModalContainer;
