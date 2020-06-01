
/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";


interface Props {

}

interface State {


    positionStart: {};
    positionEnd : {};

    routeStart: {};
    routeEnd : {};

    latStart : string;
    lngStart : string;

    showStart : boolean;
    showEnd : boolean;

    directions : Array;

}

    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={props.center}
        defaultZoom={14}
      >
          {props.showStart ?
            <Marker

              icon= {{url: "http://mt.google.com/vt/icon?psize=25&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=50&text=%E2%80%A2"}}
              title={"test"}
              name={"ehehe"}
              //position={ {lat: 4.626820403668342, lng: -74.08089169311525}}
              position={{lat: props.startMarkerPos.lat, lng: props.startMarkerPos.lng }}
              draggable={true}
              onDragEnd={(e) => {
                    props.onStartMarkerChange(e)
                    //console.log(e.latLng.lat(), e.latLng.lng());
                }}
            /> :
            null
          }

          {props.showEnd ?
            <Marker

              //icon= {{url: "http://maps.google.com/mapfiles/ms/icons/orange.png"}}
              icon= {{url: "http://mt.google.com/vt/icon?psize=25&font=fonts/Roboto-Bold.ttf&color=ff135C13&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=50&text=%E2%80%A2"}}
              title={"test"}
              name={"eheheb"}
              //position={ {lat: 4.642561609861135 ,lng: -74.07883175659181}}
              position={{lat: props.endMarkerPos.lat, lng: props.endMarkerPos.lng }}
              draggable={true}
              onDragEnd={(e) => {
                props.onEndMarkerChange(e)
                }}
            /> :
            null
          }

          <DirectionsRenderer
          directions={props.direction}
        />
      </GoogleMap>
    ));


class HaulageMap extends Component {

  constructor(props){
    super(props);

    this.state = {
      positionStart: {lat: 4.626820403668342, lng: -74.08089169311525},
      positionEnd : {lat: 4.642561609861135 ,  lng: -74.07883175659181},
      routeStart: {lat: 4.626820403668342, lng: -74.08089169311525},
      routeEnd : {lat: 4.642561609861135 ,  lng: -74.07883175659181},
      showStart : false,
      showEnd : false,
      directions : null,
      executed_directions: false
    }

  }
/*
  shouldComponentUpdate(nextProps) {
        return true;
    }*/

  componentWillMount() {
    const directionsService = new google.maps.DirectionsService();

    console.log(this.state.routeStart);

    const origin = this.state.routeStart;
    const destination = this.state.routeEnd;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  componentDidUpdate(prevProps) {
    //check if the new props are the same current coords
    if(this.props.origin.lat == prevProps.origin.lat && this.props.origin.lng == prevProps.origin.lng &&
       this.props.destination.lat == prevProps.destination.lat && this.props.destination.lng == prevProps.destination.lng){
      console.log('avoided')
      console.log(this.props)
      return; //avoid infinite loop
    }

    console.log(this.state.routeStart);

    const directionsService = new google.maps.DirectionsService();

    const origin = this.state.routeStart;
    const destination = this.state.routeEnd;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
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
    this.setState({ routeStart: props.origin })
    this.setState({ routeEnd: props.destination })
  }

  handleStartMarkerChange(e){
    console.log('start changed: ')
    console.log(e.latLng.lat(), e.latLng.lng());
    var newPos = {lat: e.latLng.lat(), lng: e.latLng.lng()}
    this.setState({positionStart: newPos})
    this.props.onStartSelected(newPos)

  }

  handleEndMarkerChange(e){
    console.log('destination changed')
    console.log(e.latLng.lat(), e.latLng.lng());
    var newPos = {lat: e.latLng.lat(), lng: e.latLng.lng()}
    this.setState({positionEnd: newPos})
    this.props.onEndSelected(newPos)
  }

  render() {


    return (
      <div>

        <GoogleMapExample
          center = { { lat:  4.6097100, lng: -74.0817500 } }
          containerElement={ <div style={{ height: '100%', width: '100%' , overflow: 'hidden'}} /> }
          mapElement={ <div style={{ height: '100%', width: '100%' , position : 'absolute' }} /> }
          showStart = {this.props.showStart}
          showEnd = {this.props.showEnd}
          startMarkerPos = {this.state.positionStart}
          endMarkerPos = {this.state.positionEnd}
          onStartMarkerChange={(e)=>this.handleStartMarkerChange(e)}
          onEndMarkerChange={(e)=>this.handleEndMarkerChange(e)}
          direction = {this.state.directions}
        />
      </div>
    );
  }
}

export default HaulageMap;
