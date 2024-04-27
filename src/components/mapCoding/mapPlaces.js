import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
// import ramenIcon from './ramen.png';
import {useLocation} from 'react-router-dom';



let YOUR_API_KEY = process.env.REACT_APP_MAPS_KEY;

// const ramenIcon = {url: "https://cdn3.iconfinder.com/data/icons/japan-23/64/ramen-noodles-food-soup-bowl-512.png",
//       scaledSize: new window.google.maps.Size(25,25)}
let restoPlaces=['eating'];

const MyMap = (mapTitle) => {
  const [map, setTheMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [restoList,setRestolist] = useState([]);
  const [restoMarker, setRestoMarker] = useState([]);
  const location = useLocation();

// ==== update page to see map and markers of restos =====
  // useEffect(() => {
    // const defPos = {lat: 45.5591827, lng: -73.7118733};
    // get position of user
    // const loader = new Loader({
    //   apiKey: YOUR_API_KEY,
    //   libraries: ['places','marker'],
    // })
    // loader.load()
    // .then(() => {
    //     let defPos;
    //     if(restoMarker.length === 0){
    //       defPos = {lat: 45.5591827, lng: -73.7118733};
    //     }else{
    //       defPos = restoMarker[0];
    //     }
    //     const map = new window.google.maps.Map(document.getElementById('map'), {
    //       center: defPos,
    //       zoom: 12
    //     })

        // const defPos = {lat: 45.5591827, lng: -73.7118733};
  //       const marker1 = new window.google.maps.Marker({
  //         position: defPos,
  //         map: map,
  //         title: restoMarker[1],
  //         }
  //       )

  //       console.log(restoMarker);
  //   })
  // },[restoMarker]);
    // setTheMap(map);

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
      // console.log('setPlacesService: ',placesService);
    })
    .then(()=>{
        const defPos = {lat: 45.5591827, lng: -73.7118733};
       const map = new window.google.maps.Map(document.getElementById('map'), {
          center: defPos,
          zoom: 12
        })
      

    //     handleSearch();
      // setRestolist([]);
    })
    // handleSearch();
  }, []);

// ========== default coordinates ======================


  let rawPos = {lat: 46.04347772938561,lng:-73.82687055753087 };
  let mtlPos = {lat: 45.5591827, lng: -73.7118733};
// let circlePos = {radius: 100,lat: 45.5591827, lng: -73.7118733,};// this should be same as user coordinates

// === functions to get user loc / list restos ===============

  function handleSearch(userCity) {
    console.log('city is at: ',userCity);
    restoPlaces=['eating'];


    let request = {
      location: new window.google.maps.Circle(userCity),
      query: 'ramen'
    }
    placesService.textSearch(request,callback);
  }; // end of handleSearch()

    // placesService.nearbySearch(request,callback);
    // placesService.findPlaceFromQuery(request,callback);
  function callback(results,status,pagination){
    // const ramenIcon = {
    //   url: "https://cdn3.iconfinder.com/data/icons/japan-23/64/ramen-noodles-food-soup-bowl-512.png",
    //   scaledSize: new window.google.maps.Size(25,25)
    // }
    // use above to for ramen icons as marker
     

    if (status === 'OK') {

      for (let x of results){
        // populate list of restos
        
        if(x.name === 'KINTON RAMEN'){ // check for doubles
          let addr = 'KINTON RAMEN - '+ ramenAddy(x.formatted_address);
          // checkDoubles(addr);
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
              // makeMarker(x);
          }
        }
      }
      let first = restoPlaces.shift();
      // console.log(restoPlaces);
      if (pagination.hasNextPage) {// get next page of results
          // pagination.nextPage();
      }
    }
  }; //end of callback();


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
    };

    function makeMarker(restoDetails){
      let lat = restoDetails.geometry.location.lat();
      let lng = restoDetails.geometry.location.lng();
          const marker = new window.google.maps.Marker({
            position: {lat,lng},
            // map: map,
            title: restoDetails.name,
            // icon: 'pin.png'
            label: 'restoDetais'
          })
          let markerLL = [{lat,lng},restoDetails.name];
          console.log(markerLL);
          setRestoMarker(markerLL);
      // })
      // setRestoMarker(markerLL);
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
            handleSearch(circlePos)
          })
          .catch((error) =>{
            access = 'denied';
             console.log('my custom denied');
          });
  }

  let userCity;
  const getCity = ((selection)=>{
    let city = selection.target.value;
    console.log('city is: ',city);
    switch(city){
      case 'Montreal':
        userCity = {radius: 100,lat: 45.5041905839693, lng:-73.57431928743786};
        break;
      case 'Toronto': 
        userCity = {radius: 100,lat: 43.655739842049236, lng: -79.38374061036242};
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
  })

  let searchTitle = 'Select your restaurant';

  let pathname = location.pathname;


  if(pathname === '/report'){ 
  return (
    <>
      <div className="starBack">
        <div className="ratingLabel"> 
            <span>{searchTitle}</span>
            <div className="restoLocate">
              <div className="restoBlock">
                <h6 className="ratingComm">By clicking below, the app will access your location data to give you a list of restaurants nearest to you</h6>
                   <button onClick={checkAccess} type="button">Ramen joints near me
                   </button>
              </div>
              <div className="restoBlock">
                <h6 className="ratingComm">If you would rather not give your location data, choose your city and find your restaurant in the list</h6>
                <select onChange={getCity}>
                  <option></option>
                  <option value='Montreal' name='city'>Montreal</option>
                  <option value='Toronto' name='city'>Toronto</option>
                  <option value='Vancouver' name='city'>Vancouver</option>
                  <option value='Ottawa' name='city'>Ottawa</option>
                </select>
               <button onClick={()=>handleSearch(userCity)} type="button">GO
               </button>
              </div>
            </div>
          <div id="restoSelectBlock">
            <div className="selectResto">
              <select className="select-color form-select form-select-lg mb-3 " aria-label="Default select example">
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
  )
  }else if(pathname = '/report'){
    return(
      <>
        {/*<div id="map">
          <span>geomap</span>
        </div>*/}
        {/*{console.log('re-render')}*/}
        {/*{console.log(restoList)}*/}
       
        <div className="starBack">
            {/*<TheMap />*/}
          <div className="ratingLabel"> 
              <span>{searchTitle}</span>
              <div className="restoLocate">
                <div className="restoBlock">
                  <h6 className="ratingComm">By clicking below, the app will access your location data to give you a list of restaurants nearest to you</h6>
                     <button onClick={checkAccess} type="button">Ramen joints near me
                     </button>
                </div>
                <div className="restoBlock">
                  <h6 className="ratingComm">If you would rather not give your location data, choose your city and find your restaurant in the list</h6>
                  <select onChange={getCity}>
                    <option></option>
                    <option value='Montreal' name='city'>Montreal</option>
                    <option value='Toronto' name='city'>Toronto</option>
                    <option value='Vancouver' name='city'>Vancouver</option>
                    <option value='Ottawa' name='city'>Ottawa</option>
                  </select>
                 <button onClick={()=>handleSearch(userCity)} type="button">GO
                 </button>
                </div>
              </div>
            <div id="restoSelectBlock">
              <div className="selectResto">
                <select className="select-color form-select form-select-lg mb-3 " aria-label="Default select example">
                  {/*<option value="" />*/}
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
  }

};

export default MyMap;