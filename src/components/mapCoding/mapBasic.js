import {useMemo,useState} from "react";
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import './mapApp.css';

export default function TheMap(){
	const {isLoaded} = useLoadScript({
		googleMapsApiKey: ""
	});

	if(!isLoaded){
		return <div>Loading...</div>;
	}else{
		return(
			<Map />
		);
	}
}

// function setGeo(){
// 	let pos = {
// 	   lat: 44,
// 	   lng: -80
// 	};
// 	if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(position => {
//          pos = {
//          lat: position.coords.latitude,
//          lng: position.coords.longitude
//          };
//          console.log('you are here: ',pos);
// 	      return setGeoPos(pos);
//       }, function(){
//       	console.log('you are NOT here: ',pos);
// 	      return pos;
//       });
	 
//    }
// }


function Map(){
	const [geoPos, setGeoPos] = useState();
	function setGeo(){
		if (navigator.geolocation) {
	   	navigator.geolocation.getCurrentPosition(position => {
		         let pos = {
			         lat: position.coords.latitude,
			         lng: position.coords.longitude
		         };
		         console.log('you are here: ',pos);
			      // setGeoPos(pos);
		      }, function(){
		      	let pos = {
					   lat: 44,
					   lng: -80
					};
		      	console.log('you are NOT here: ',pos);
			      // setGeoPos(pos);
		      }
	      );
		}
	}
	// const center= useMemo( ()=> ({lat: 44,lng: -80}), []);
	// console.log('geoset pos: ',geoPos);
	// const center= useMemo( ()=> (geoPos), []);
		setGeo();
		console.log('geoset pos: ',geoPos);
		const center= useMemo( ()=> (geoPos), []);
		return( 
			<GoogleMap
				zoom={10}
				center={center}
				mapContainerClassName="map-container"
			> 
				<Marker position={geoPos}/>
			</GoogleMap>
		);
	
}