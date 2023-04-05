import React, { Component } from 'react';
import { Map, GoogleApiWrapper,Geocoder } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '20%'
};

let pos = {
   lat: 45.5591827,
   lng: -73.7118733
};

function setGeo(pos){
   if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(position => {
            pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
         });
         console.log('you are here: ',pos);
   }else{
      console.log('by default you are here: ',pos);
   }
}

export default class MapContainer extends Component {
   setGeo(pos);
  render() {
         return (
            <div style={mapStyles}>
               <Map
                 google={this.props.google}
                 zoom={12}
                 style={mapStyles}
                  initialCenter={ 
                     pos
                 }
               />
            </div>
         );
   }
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer);

