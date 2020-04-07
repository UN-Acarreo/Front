import React, { Component } from 'react';

import styles from './styles.module.scss';


interface Props{
  message : string;
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
        <h1 className={styles.header_h1}>{message}</h1>
      </div>
    )
  }
}

export default Top;
