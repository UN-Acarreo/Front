

/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";

const data = [
  {
    name: "Start",
    title: "Start",
    lat: 4.6097100,
    lng: -74.0817500,
    id: 1
  },
  {
    name: "Finish",
    title: "Finish",
    lat: 4.626820403668342,
    lng: -74.08089169311525,
    id: 2
  }
  
];


interface Props {

}

interface State {

    
    positionStart: {};
    positionEnd : {};

    latStart : string;
    lngStart : string;

    showStart : boolean;
    showEnd : boolean;
    
}

    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={props.center}
        defaultZoom={14}
      >
          {props.showStart ?
            <Marker
              
              title={"test"}
              name={"ehehe"}
              position={ {lat: 4.626820403668342,
              lng: -74.08089169311525}}
              draggable={true}
              onDragEnd={(e) => {

                    
                    console.log(e.latLng.lat(), e.latLng.lng());
                }}
            /> :
            null
          }
          
          {props.showEnd ?
            <Marker
              
              title={"test"}
              name={"ehehe"}
              position={ {lat: 4.642561609861135 ,
      lng: -74.07883175659181}}
              draggable={true}
              onDragEnd={(e) => {
                   


                   
                }}
            /> :
            null
          }
          

          
        
      </GoogleMap>
    ));


class Map extends Component {

  constructor(props){
    super(props);

    this.state = {
      positionStart: {lat: 4.626820403668342,
      lng: -74.08089169311525},
      positionEnd : {lat: 4.642561609861135 ,
      lng: -74.07883175659181},
      showStart : false,
      showEnd : false,
      latStart : "",
      lngStart : ""
    }
    
  }

  shouldComponentUpdate(nextProps) {
        return true;
    }

  handleStart(){
    this.setState({showStart :true})
    this.setState({showEnd :false})
  }

  handleEnd(){
    this.setState({showStart :false})
    this.setState({showEnd :true})
  }

  componentWillReceiveProps(props) {
    this.setState({ showStart: props.showStart })
    this.setState({ showEnd: props.showEnd })
  }

  test(e){
    console.log(e.latLng.lat(), e.latLng.lng());
    this.setState({latStart : e.latLng.lat() })
                    this.setState({lngStart : e.latLng.lng() })
  }
 
  render() {
    


    return (
      
      <div>
      {console.log(this.state.showStart)}
        {console.log(this.state.showEnd)}
        <GoogleMapExample
          center = { { lat:  4.6097100, lng: -74.0817500 } }
          containerElement={ <div style={{ height: `100%`, width: '100%' , position : 'absolute' }} /> }
          mapElement={ <div style={{ height: `100%`, width: '50%' , position : 'absolute' }} /> }
          showStart = {this.props.showStart}
          showEnd = {this.props.showEnd}
          
        />
      </div>
    );
  }
}

export default Map;
