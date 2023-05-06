import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
// import ramenIcon from './ramen.png';

let YOUR_API_KEY = process.env.REACT_APP_MAPS_KEY;

// const ramenIcon = {url: "https://cdn3.iconfinder.com/data/icons/japan-23/64/ramen-noodles-food-soup-bowl-512.png",
//       scaledSize: new window.google.maps.Size(25,25)}
let restoPlaces=['eating'];

const MyMap = () => {
  const [map, setTheMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [restoList,setRestolist] = useState([]);

  useEffect(() => {
    const defPos = {lat: 45.5591827, lng: -73.7118733};
    // get position of user

    const loader = new Loader({
      apiKey: YOUR_API_KEY,
      libraries: ['places','marker'],
    })
    loader.load()
    .then(() => {
    //   const map = new window.google.maps.Map(document.getElementById('map'), {
    //     // center: {lat: 45.5591827, lng: -73.7118733},
    //     center: defPos,
    //     zoom: 12
    //   })
      
    //   const marker1 = new window.google.maps.Marker({
    //     position: defPos,
    //     map: map,
    //     title: "blabalba",
    //   })

    // setTheMap(map);

    const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));

      setPlacesService(placesService);
      // console.log('setPlacesService: ',placesService);
    })
    .then(()=>{
        // handleSearch();
    })
    // handleSearch();
  }, []);


  let rawPos = {lat: 46.04347772938561,lng:-73.82687055753087 };
  let mtlPos = {lat: 45.5591827, lng: -73.7118733};
// let circlePos = {radius: 100,lat: 45.5591827, lng: -73.7118733,};// this should be same as user coordinates

  function handleSearch(circlePos,yn) {
    console.log(circlePos,yn);
    if(!yn){
      let circlePos = {radius: 100,lat: 45.5591827, lng: -73.7118733,};
    }
    let request = {
      location: new window.google.maps.Circle(circlePos),
      // location: new window.google.maps.LatLng(mtlPos),
      // location: new window.google.maps.LatLng(rawPos.lat,rawPos.lng),
      // location: mtlPos,
      // radius: 1000,
      query: 'ramen'
      // keyword: 'Ramen',
      // type: 'restaurant'
    }
    placesService.textSearch(request,callback);
    // placesService.nearbySearch(request,callback);
    // placesService.findPlaceFromQuery(request,callback);

    // function doSearch(request,callback){
    //   placesService.textSearch(request,callback);
    // }
    // placesService.textSearch({ query: 'ramen' }, (results, status) 

    function callback(results,status,pagination){
      const ramenIcon = {
        url: "https://cdn3.iconfinder.com/data/icons/japan-23/64/ramen-noodles-food-soup-bowl-512.png",
        scaledSize: new window.google.maps.Size(25,25)
      }
      
      if (status === 'OK') {
        // token = next_page_token.o;
        // console.log(results);
        // console.log(PlaceSearchPagination);
        for (let x of results){
          // console.log(x.name);
          // console.log(x.formatted_address);

          // put marker on map
          // let lati = x.geometry.location.lat();
          // let longi = x.geometry.location.lng();
          // let resto = new window.google.maps.Marker({
          //   position: {lat: lati, lng: longi},
          //   map: map,
          //   title: x.name,
          //   icon: ramenIcon
          // }) 

          // populate list of restos
          if(x.name === 'KINTON RAMEN'){ // check for doubles
            // console.log(x.formatted_address);
            let addr = 'KINTON RAMEN - '+ ramenAddy(x.formatted_address);
            // console.log(addr);
            checkDoubles(addr);
          }else if(x.name === 'Kumamoto Ramen'){
            let addr = 'Kumamoto Ramen - '+ ramenAddy(x.formatted_address);
            // console.log(addr);
            checkDoubles(addr);
          }else{
            // console.log(x.name);
            checkDoubles(x.name);
          }
          // console.log(getPostal(x.formatted_address));
        }
        let first = restoPlaces.shift();
        setRestolist(restoPlaces);

        // console.log(results[0].geometry.location.lat());
        // console.log(results[0].geometry.location.lng());
        if (pagination.hasNextPage) {// get next page of results
            // PlaceSearchPagination.nextPage();
            // pagination.nextPage();
        }
      }
    }; //end of callback();

    function checkDoubles(resto){
      // console.log('checkDouble ',resto);
      if(!restoPlaces.includes(resto)){
        // console.log('exists: ',resto)
        // console.log('adding: ',resto);
        restoPlaces.push(resto);
      }else{
        // restoPlaces.push(resto);
      }
    }

    function getPostal(address){
      let provpost = address.split(',');
      let pos = provpost[2].split(' ');
      let postal = pos[2]+' '+pos[3];
      return postal;
    }
    function ramenAddy(address){
      let addy = address.split(',');
      let street = addy[0];
      // console.log(street);
      let road = street.replace(/[0-9]/g,'').trim();
      return road;
    }
    // let first = restoPlaces.shift();
    // console.log('restoPlaces: ',restoPlaces);
    // console.log('restoList: ',restoList);
  };
  //end of handleSearch()

  function report(state){
    console.log(`Permission ${state}`)
  }

  let access;
  function checkAccess(){
    console.log(access);
      if(access === 'denied'){
        alert('You already denied location access. Refresh page and click again to accept location access.')
      }else{
        getUser();
      }
  }

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
            let yn = true;
            handleSearch(circlePos,yn)
          })
          .catch((error) =>{
            access = 'denied';
             console.log('my custom denied');
          });
  }

      
    

  return (
    <>
      {/*<div id="map" style={{ width: '0%', height: '0px' }}></div>*/}
      {/*{console.log('re-render')}*/}
      {/*{console.log(restoList)}*/}


      <div className="starBack">
          {/*<TheMap />*/}
        <div className="ratingLabel"> 
            <span>Select your restaurant</span>
            <h6 className="ratingComm">By clicking below, the app will access your location data to give you a list of restaurants for you to choose from</h6>
            <div class="restoBlock">
               <button onClick={checkAccess} type="button">Give me a list of ramen joints near me
               </button>
               <button onClick={handleSearch} type="button">No thanks. Just give me a list based on the city I'm in and I'll figure it out.
               </button>
            </div>
          <div id="restoSelect">
            <div class="ramenType">
              <select>
                {/*<option value="" />*/}
                  {restoList.map((restoNames,i) =>{
                    return <option key={i} value={restoNames} name="resto">{restoNames}
                    </option>
                  })}
              </select>
            </div>
          {/*  <div class="restoBlock">
               <button onClick={handleSearch} type="button">Find my restaurant
               </button>
            </div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMap;