import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import ReactStars from 'react-rating-stars-component'
import Modal from "react-bootstrap/Modal";

class RatingModal extends Component {

  constructor(props){
    super(props);

    this.state = {
      show: false
    }
  }

  handleClose(){ //closes the rating modal
    this.setState({show: false})
  }

  componentDidMount(){
    this.setState({show: this.props.show})
  }

  componentDidUpdate(prevProps) {
    if(this.props.show != prevProps.show && this.props.show != this.state.show){
        this.setState({show: this.props.show})
    }
    else{
      return
    }
    /*
    if(this.props.show == prevProps.show && this.props.show == this.state.show){
      console.log('equ')
      return
    }*/

  }




  render() {
    const Puntuality = this.props.rating.Puntuality;
    const Cargo_state = this.props.rating.Cargo_state;
    const Customer_support = this.props.rating.Customer_support;
    const Comments = this.props.rating.Comments;
    return(
      <div>
      <Modal show={this.state.show} onHide={()=>this.handleClose()}>
       <Modal.Header closeButton>
         <Modal.Title>Calificación del servicio</Modal.Title>
       </Modal.Header>
       <Modal.Body style={{margin: '1em'}}>
      <div   style={{marginBottom: '1em'}}>Puntualidad:
       <ReactStars count={5}  edit={false} value={Puntuality} size={24} half={false} color2={'#ffd700'} />
      </div>

       <div  style={{marginBottom: '1em'}}>Estado de los paquetes:
       <ReactStars count={5}  edit={false}value={Cargo_state} size={24} half={false} color2={'#ffd700'} />
       </div>

       <div  style={{marginBottom: '1em'}}>Atención al cliente:
       <ReactStars count={5}  edit={false} value={Customer_support} size={24} half={false} color2={'#ffd700'} />
       </div>

      <div  style={{marginBottom: '1em'}}>Comentarios adicionales:
      <div><textarea  type="text" name="name" style={{width: '70%'}} rows={2} value={Comments} disabled/></div>
       </div>

        </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={()=>this.handleClose()}>
           Cerrar
         </Button>
       </Modal.Footer>
     </Modal>
      </div>
    )
  }

}

export default RatingModal;
