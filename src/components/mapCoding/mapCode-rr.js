import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '20%'
};

let pos = {
   lat: 45.66,
   lng: -72.8
};
// if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//          pos = {
//          lat: position.coords.latitude,
//          lng: position.coords.longitude
//          };
//       });
//    }
export class MapContainer extends Component {
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
  apiKey: process.env.REACT_APP_MAPS_KEY
})(MapContainer);


// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import { useMemo } from "react";
// import "./mapApp.css";

/* Note: This example requires that you consent to location sharing when
* prompted by your browser. If you see the error "Geolocation permission
* denied.", it means you probably did not give permission for the browser * to locate you. */
// let pos;
// let map;
// let bounds;
// let infoWindow;
// let currentInfoWindow;
// let service;
// let infoPane;
// export default function TheMap() {
//    console.log('mapCode');
//    const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    // googleMapsApiKey: process.env.REACT_APP_MAPS_KEY


  // });
  // const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

   // Initialize variables
   // bounds = new google.maps.LatLngBounds();
   // infoWindow = new google.maps.InfoWindow;
   // currentInfoWindow = infoWindow;
   /* TODO: Step 4A3: Add a generic sidebar */
   // infoPane = document.getElementById('panel');
   // const handleApiLoaded = (map, maps) => {
   // Try HTML5 geolocation
      // if (navigator.geolocation) {
      //    navigator.geolocation.getCurrentPosition(position => {
      //       pos = {
      //       lat: position.coords.latitude,
      //       lng: position.coords.longitude
      //       };
      //    });
         // const map = new google.maps.Map(document.getElementById("map"), {
         //        zoom: 8,
         //        center: pos,
         // });
     // }

     // const geocoder = new google.maps.Geocoder();
     // geocoder.geocode({location:pos})
     // .then((response) =>{
     //     if(response.results[0]){
     //        console.log(response.results[0]);
     //     }
     // });
//    }
   
//   return(
//        <div className="App">
//       {!isLoaded ? (
//         <h1>Loading...</h1>
//       ) : (
//         <GoogleMap
//           mapContainerClassName="map-container"
//           center={center}
//           zoom={10}
//         >
//          <Marker position={{ lat: 18.52043, lng: 73.856743 }} />
//          </GoogleMap>
//       )}
//     </div>
//   );
// }
