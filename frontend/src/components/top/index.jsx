import React, { Component } from 'react';

import styles from './styles.module.scss';
import classNames from "classnames";


interface Props{
  message : string;
  userName : string;
  isUser : boolean;
  isDriver : boolean
}

interface State {
  name : string
  
}


class Top extends Component<Props, State> {
  constructor(props){
    super(props);

    this.state = {
      name : ''
    }
  }

  componentWillMount(){
    if ( this.props.isDriver|| this.props.isUser){
       var info = JSON.parse(sessionStorage.login_info);
  
      if(this.props.isUser){
        this.setState({
          name: info.User_name
          
        });
      } else{
        this.setState({
          name: info.Driver_name,
        });
      }

    }

  }


  render() {
    
    const {message, isUser, isDriver} = this.props;
    const {name} = this.state;

    return (
      <div className={classNames("row", styles.header)}>
        <a {...isUser ? {href:"/user/profile"} : isDriver ? {href:"/driver/profile"} : {href:""} } className={classNames("col-1",styles.header_button)}>

            {isUser || isDriver ? 
                <img src="/user.png" className= {classNames("rounded mx-auto d-block", styles.imgCon)} alt="..."></img>
              :
                null
            }
            
        </a>
        <div className={styles.text}>

          { isUser || isDriver ?

              "Bienvenido " + name
            :
              "Bienvenido"
          }

        </div>

        <a href = "/" className={classNames("col-1",styles.header_button)}>

            {isUser || isDriver ? 
                <img src="/logout.png" className= {classNames("rounded mx-auto d-block", styles.imgRight)} alt="..."></img>
              :
                null
            }
            
        </a>
      </div>
    )
  }
}

export default Top;
