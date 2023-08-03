import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import ramenIcon from './ramen.png';
import {useLocation} from 'react-router-dom';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import {MagnifyingGlass} from "react-loader-spinner";
import PulseLoader from 'react-spinners/PulseLoader';

let YOUR_API_KEY = 'AIzaSyACWpiv3APsVVOtbK_rUE6zg8B2dadq3Fs';

// const ramenIcon = {url: "https://cdn3.iconfinder.com/data/icons/japan-23/64/ramen-noodles-food-soup-bowl-512.png",
//       scaledSize: new window.google.maps.Size(25,25)}

const MyMap = (mapTitle) => {
  const [map, setTheMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [restoList,setRestolist] = useState([]);
  const [restoMarker, setRestoMarker] = useState([]);
  const [cityCoords,setCityCoords] = useState([]);
  const [loading,setLoading] = useState(false)
  const location = useLocation();
  const markerArr = ['go'];
  let  restoPlaces=['eating']; // initialize array


  // ========== load list of restos based on user location =====
  useEffect(() => { 
      // const defPos = {lat: 45.5591827, lng: -73.7118733};
      // get position of user
      const loader = new Loader({
          apiKey: YOUR_API_KEY,
          libraries: ['places','marker'],
      })
      loader.load()
      .then(() => {
        const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));

        setPlacesService(placesService);
      })
      .then(()=>{
        let defPos;
        if(cityCoords.length === 0){
          // default values if cityCoords is empty
           defPos = {lat: 45.5591827, lng: -73.7118733};
        }else{
           defPos = {lat:cityCoords.lat,lng:cityCoords.lng};
        }
        // console.log('city is at: ',defPos);

        let mappy = new window.google.maps.Map(document.getElementById('map'), {
          center: defPos,
          zoom: 12
        })
        setTheMap(mappy);

        let marker = new window.google.maps.Marker({
            position: defPos,
            map: map,
            title: 'you are here',
            // icon: 'pin.png'
        });
        marker.setMap(mappy);
        // the is a googlemaps function, not a hook
      })
      .then(()=>{
        window.google.maps.event.trigger(map,'idle');
      })
  },[cityCoords]);

  // ========= load markers on to map =======
  useEffect(()=>{
    if(map){
        // for(let x = 0;x<restoMarker.length;x++){
        const markers = restoMarker.map((info,i)=>{
            let lat = info.lat;
            let lng = info.lng;
            let resto = info.resto;
         
            const markerIcon = {
              // url: ramenIcon,
              url: "https://cdn3.iconfinder.com/data/icons/japan-23/64/ramen-noodles-food-soup-bowl-512.png",
              scaledSize: new window.google.maps.Size(35,35),
            };

            let marker =  new window.google.maps.Marker(
            // {  position: {lat:lat,lng:lng},
            { position:{lat:info.lat,lng:info.lng},
              map: map,
              title: resto,
              icon: markerIcon,
            });
            marker.setMap(map); //this is a googlemaps api function, not a hook
            return marker;
        })
          new MarkerClusterer({markers,map});
          // marker.setMap(map);
        // }
        setLoading(false);
    }
  },[restoMarker])

// ========== default coordinates ======================

  // let rawPos = {lat: 46.04347772938561,lng:-73.82687055753087 };
  // let mtlPos = {lat: 45.5591827, lng: -73.7118733};
// let circlePos = {radius: 100,lat: 45.5591827, lng: -73.7118733,};// this should be same as user coordinates

// ===== google api call to search for restos =====
  function handleSearch(cityCoords) {
    setLoading(true);
    let request = {
      location: new window.google.maps.Circle(cityCoords),
      query: 'ramen',
    }
    placesService.textSearch(request,callback);
  }; // end of handleSearch()

    // placesService.nearbySearch(request,callback);
    // placesService.findPlaceFromQuery(request,callback);

// === callback function when api call succesful ====
  function callback(results,status,pagination){
    if (status === 'OK') {
      for (let x of results){ // populate list of restos
        if(x.name === 'KINTON RAMEN'){ // check for doubles
          let addr = 'KINTON RAMEN - '+ ramenAddy(x.formatted_address);
          if(!restoPlaces.includes(addr)){
              restoPlaces.push(addr);
            }
        }else if(x.name === 'Kumamoto Ramen'){// check for doubles
          let addr = 'Kumamoto Ramen - '+ ramenAddy(x.formatted_address);
           if(!restoPlaces.includes(addr)){
              restoPlaces.push(addr);
            }
        }else{
          if(!restoPlaces.includes(x.name)){
              restoPlaces.push(x.name);
          }
        }
        makeMarker(x);  
        // console.log(x.name);      
      }
      // let first = restoPlaces.shift();
      // let second  = markerArr.shift();
      //   setRestolist(restoPlaces);
      //   setRestoMarker(markerArr);

      if (pagination.hasNextPage) {// get next page of results, re-run callback
          pagination.nextPage();
      }else{ // if no more data, set hooks and re-load page
        setHooks();
      }
    }
  }; //end of callback();

//==== parse data to isolate postal code ====
    function getPostal(address){
      let provpost = address.split(',');
      let pos = provpost[2].split(' ');
      let postal = pos[2]+' '+pos[3];
      return postal;
    }
//=== parse data to isolate address ====
    function ramenAddy(address){
      let addy = address.split(',');
      let street = addy[0];
      // console.log(street);
      let road = street.replace(/[0-9]/g,'').trim();
      return road;
    };

//==== set coordiantes for resto markers =====
    function makeMarker(restoDetails){
          let restObj = {};
          restObj.lat = restoDetails.geometry.location.lat();
          restObj.lng = restoDetails.geometry.location.lng();
          restObj.resto = restoDetails.name;
          markerArr.push(restObj);
    }
// ====== put resto data into Hooks, re-load page ====
    function setHooks(){
      let first = restoPlaces.shift();
      let second  = markerArr.shift();
      // console.log('loaded: ',restoPlaces);
        setRestolist(restoPlaces);
        setRestoMarker(markerArr);
        setLoading(false);
    }

// ==== check if user has denied geolocation access ====
  let access;
  function checkAccess(){
    console.log(access);
      if(access === 'denied'){
        alert('You already denied location access. Refresh page and click again to accept location access.')
      }else{
        getUser();
      }
  }

//======  get geolocation of user =======
  function getUser(){
        new Promise(function(resolve,reject){
            navigator.geolocation.getCurrentPosition(resolve,reject);
          })
         .then((response)=>{
            let geoloc = {
                     lat: response.coords.latitude,
                     lng: response.coords.longitude
                   };

             return geoloc;
          })
          .then((geoloc)=>{
            let circlePos = {radius: 100, lat: geoloc.lat, lng: geoloc.lng};
            handleSearch(circlePos)
          })
          .catch((error) =>{
            access = 'denied';
             console.log('my custom denied');
          });
  }

  // ======= city coordinates + radius search to populate resto menu ==========
  const getCity = ((selection)=>{
    let city = selection.target.value;
    let userCity;
    console.log('city is: ',city);
    switch(city){
      case 'Montreal':
        userCity = {radius: 100,lat: 45.5041905839693, lng:-73.57431928743786};
        break;
      case 'Toronto': 
        userCity = {radius: 10000,lat: 43.655739842049236, lng: -79.38374061036242};
        break;
      case 'Vancouver':
        userCity = {radius: 100,lat: 49.280956827935505, lng:-123.12243738369997};
        break;
      case 'Ottawa':
        userCity = {radius: 100,lat: 45.41982910818854, lng: -75.70019586916331};
        break;
      default:
        userCity = {radius: 100,lat: 45.5041905839693, lng:-73.57431928743786};//default is Montreal
    }
    setCityCoords(userCity);
  })

  // === change title depending report or rating page =====
  let searchTitle, restoComm, listComm;
  if(location.pathname === '/report'){
    searchTitle = 'Select your restaurant';
    restoComm = 'By clicking below, the app will access your location data to give you a list of restaurants nearest to you'
    listComm = 'If you would rather not give your location data, choose your city and find your restaurant in the list';
  }else{
    searchTitle = 'Find the best ramen closest to you';
    restoComm = 'By clicking below, the app will access your location data to give you ramen rankings nearest to you'
    listComm = 'If you would rather not give your location data, choose your city to find the top bowl of ramen of the city';
  }


  return (
    <>
      <div className="starBack">
        <div className="ratingLabel"> 
            <span>{searchTitle}</span>
            <div className="restoLocate">
              <div className="restoBlock">
                <h6 className="ratingComm">{restoComm}
                {/*By clicking below, the app will access your location data to give you a list of restaurants nearest to you*/}
                </h6>
                   <button onClick={checkAccess} type="button">Find restaurants nearest to me
                   </button>
              </div>
              <div className="restoBlock">
                <h6 className="ratingComm">{listComm}
                {/*If you would rather not give your location data, choose your city and find your restaurant in the list*/}
                </h6>
                <select onChange={getCity}>
                  <option></option>
                  <option value='Montreal' name='city'>Montreal</option>
                  <option value='Toronto' name='city'>Toronto</option>
                  <option value='Vancouver' name='city'>Vancouver</option>
                  <option value='Ottawa' name='city'>Ottawa</option>
                </select>
               <button onClick={()=>handleSearch(cityCoords)} type="button">FIND RESTAURANTS
               </button>
              </div>
            </div>
          <div id="restoSelectBlock">
            {/*<div className="selectResto">*/}
              <div className="loadSpinner">
               {loading ?
                  <PulseLoader
                        color="#fff"
                        size={10}
                        loading={loading}
                        id="loadProg"
                      />
                    : <div></div>
                }
              </div>
              <div className="selectResto">
                <select className="select-color form-select form-select-lg mb-3 " aria-label="Default select example">
                      {restoList.map((restoNames,i) =>{
                        return <option key={i} value={restoNames} name="resto">{restoNames}
                        </option>
                      })}
                </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMap;