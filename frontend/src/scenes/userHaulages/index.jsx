import React, { Component } from 'react';

import classNames from 'classnames';

import styles from './styles.module.css';

import Top from '../../components/top/index.jsx';
import HomeContainer from '../../components/homeContainer/index.jsx';
import {ButtonGroup , Button} from "react-bootstrap";
import HaulageMap from '../../components/haulageMap/index.jsx';

import axios from 'axios';

const URL = 'http://localhost:3001'

const lotList = [{number:1} , {number:2} , {number:3}, {number:4} ];

interface Props {

}

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
    
}


class UserHaulages extends Component {

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
    }

  }

  componentWillMount(){
    this.getHaulages();

    
  }
  
  async getHaulages (){
    
    var info = JSON.parse(sessionStorage.login_info);;
    
    var url = URL+'/api/haulage/user/list/'+ info.Id_user;
    axios.get(url)
      .then( (response) => {
        this.setState({ haulagesList :response.data.haulages,
                        originLat : response.data.haulages[0].route.Origin_coord.split(',')[0],
                        originLng : response.data.haulages[0].route.Origin_coord.split(',')[1],
                        destinationLat : response.data.haulages[0].route.Destination_coord.split(',')[0],
                        destinationLnt : response.data.haulages[0].route.Destination_coord.split(',')[1]})

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

    this.setState({
      id_Haulage : index,
      haulage_state : actualHaulage.status.Status_description,
      description : actualHaulage.cargo.Description,
      driver : actualHaulage.vehicles[0].driver.Driver_name,
      originLat : actualHaulage.route.Origin_coord.split(',')[0],
      originLng : actualHaulage.route.Origin_coord.split(',')[1],
      destinationLat : actualHaulage.route.Destination_coord.split(',')[0],
      destinationLnt : actualHaulage.route.Destination_coord.split(',')[1]
    })
     
  }

  render() {

    const {haulagesList, id_Haulage, haulage_state,description,driver, originLat, originLng, destinationLat, destinationLnt} = this.state;

    return (
      <>
          <Top message = {"UNAcarreo"}
             isUser = {true}
             isDriver = {false}/>
          
          
          <div className = {styles.test}>

            <div class="btn-group-vertical" style={{  width: '50%' }}>
              {haulagesList.map((row,index) => (
                                    <button type="button" className= {classNames("btn btn-secondary", styles.button_haulage)}  key = {index} onClick = {() => this.handleClick(index)}>{"RESERVA " + (index+1)}</button>
                                ))}
                  
            </div>

            <div class="col-4 justify-content-center">

              <div className= {classNames(styles.title)} >NUMERO DE LA RESERVA:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{id_Haulage}</span>
              </div>

              <div className= {classNames(styles.title)} >ESTADO:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{haulage_state}</span>
              </div>

              <div className= {classNames(styles.title)} >DESCRIPCION:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{description}</span>
              </div>

              <div className= {classNames(styles.title)} >CONDUCTOR:</div>
              <div className= {classNames("d-flex justify-content-center", styles.profileText)}>
                <span className={classNames("input-group-text w-75 p-3", styles.textBox)}>{driver}</span>
              </div>

              <HaulageMap origin = {{lat:  parseFloat(originLat), lng:parseFloat(originLng)}}
                          destination = {{lat:  parseFloat(destinationLat), lng: parseFloat(destinationLnt)}}/>

            </div>

          
          </div>
          
      </>
    )
  }
}

export default UserHaulages;
