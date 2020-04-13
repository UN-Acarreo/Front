import React, { Component } from 'react';

import styles from './styles.module.scss';


interface Props{
  message : string;
  userName : string;
}

interface State {
  
}


class Top extends Component<Props, State> {
  constructor(props){
    super(props);

    this.state = {
      //
    }
  }


  render() {
    
    const {message} = this.props;

    return (
      <div className={styles.header}>
        <a href="/" className={styles.header_button}>{message}</a>
        <div className={styles.text}>
          Bienvenido usuario
        </div>
      </div>
    )
  }
}

export default Top;
