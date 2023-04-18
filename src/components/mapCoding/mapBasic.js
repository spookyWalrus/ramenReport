import {useState,useEffect} from "react";
import {GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import './mapApp.css';

// NOTE:  for 'Marker' component to work in production mode, where 'StrictMode' rendering in index.js is not present,  replace the component 'MarkerF' as 'Marker'. Import 'Marker' instead of 'MarkerF' 

let info = []; 

export default function TheMap(){
	let pos = [ 
		{ lat: 45.5591827, lng: -73.7118733}, 
		'H2W 1V6'
	]; // default position value on first render

	const [userCoord, setUserCoord] = useState(pos);
	const {isLoaded} = useLoadScript({
		googleMapsApiKey: "AIzaSyACWpiv3APsVVOtbK_rUE6zg8B2dadq3Fs",
	}); // key value should be set as env.value for production

	useEffect(()=>{
		let infos = [];
		new Promise(function(resolve,reject){
				navigator.geolocation.getCurrentPosition(resolve,reject);
			})
			.then((response)=>{
				let user = {
				         lat: response.coords.latitude,
				         lng: response.coords.longitude
			         };
	         infos[0] = user;
	         return getPostal(user);
	      })
	      .then(postal=>{
	      	infos[1] = postal;
	      	setUserCoord(infos);
	      })
	      .catch(error =>{
	      	console.log(error);
	      })
	},[]);

	if(!isLoaded){
		return <div>Loading...</div>
	}
	return (
			<Mappy coords={userCoord}/> 
		);
}

function getPostal(xy){
		let lat = xy.lat;
		let long = xy.lng;
       // return fetch('https://geocode.maps.co/reverse?lat='+lat+'&lon='+long,
		// return fetch('https://www.zipcodeapi.com/rest/v2/CA/js-YzBlb6N1vXDayQwRz8I6g2JpF4WmQ0NINBO6lKN9V1ozoO03tDTVh3ApALCfh9ux/city-postal-codes.json/Rawdon/QC',
		return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyACWpiv3APsVVOtbK_rUE6zg8B2dadq3Fs',
        {  method: 'post',
       })
        .then(res => {
            if(res.ok){ // check for succesful credentials
              return res.json()
            }
        })
        .then(data =>{
        		let postalcode;
        		let elements = data.results[0].address_components;
        		for(const key in elements){
        			if(elements[key].types[0] === 'postal_code'){
        				postalcode =  elements[key].long_name;
        			};
        		}
        		return postalcode;
        })
        .catch((error) => {
            console.log(error);
        })
  }

const Mappy = ({coords})=>{
	let lalo = coords[0];
	let postal = coords[1];
	
	return( 
		<div>
			<div>
				<p>You are somewhere around this postal code:
					<span><h4>{postal}</h4></span>
				</p>
			</div>
			<GoogleMap
				zoom={10}
				center={lalo}
				mapContainerClassName="map-container"
			> 
				<MarkerF position={lalo} />
			</GoogleMap>
		</div>
	);
}