import React, { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import ramenIcon from "./ramen.png";
import { useLocation } from "react-router-dom";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import PulseLoader from "react-spinners/PulseLoader";
// import restoFile from '../../json/restoFile.json';
// import loopData from '../../json/json2DB.js';

let YOUR_API_KEY = process.env.REACT_APP_MAPS_KEY;
// const ramenIcon = {url: "https://cdn3.iconfinder.com/data/icons/japan-23/64/ramen-noodles-food-soup-bowl-512.png",
//       scaledSize: new window.google.maps.Size(25,25)}

const MyMap = (mapTitle) => {
  const [map, setTheMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [restoList, setRestolist] = useState([]);
  const [restoMarker, setRestoMarker] = useState([]);
  const [cityCoords, setCityCoords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [restoNumb, setRestoNumb] = useState("");
  const location = useLocation();
  const markerArr = ["go"];
  let restoPlaces = ["eating"]; // initialize array
  let refCoords = useRef();
  let isClose;

  // ========== load list of restos based on user location =====
  useEffect(() => {
    // const defPos = {lat: 45.5591827, lng: -73.7118733};
    // get position of user
    const loader = new Loader({
      apiKey: YOUR_API_KEY,
      libraries: ["places", "marker"],
    });
    loader
      .load()
      .then(() => {
        const placesService = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );

        setPlacesService(placesService);
      })
      .then(() => {
        let defPos;
        if (cityCoords.length === 0) {
          // default values if cityCoords is empty
          defPos = { lat: 45.5591827, lng: -73.7118733 };
          console.log("using default position");
        } else {
          defPos = { lat: cityCoords.lat, lng: cityCoords.lng };
        }
        let mappy = new window.google.maps.Map(document.getElementById("map"), {
          center: defPos,
          zoom: 12,
        });
        setTheMap(mappy);

        let marker = new window.google.maps.Marker({
          position: defPos,
          map: map,
          title: "you are here",
          // icon: 'pin.png'
        });

        marker.setMap(mappy);
        // the is a googlemaps function, not a hook
      })
      .then(() => {
        window.google.maps.event.trigger(map, "idle");
      });
    console.log("setting new map: ", cityCoords);
  }, [cityCoords]);

  // ========= load markers on to map =======
  useEffect(() => {
    if (map) {
      // for(let x = 0;x<restoMarker.length;x++){
      const markers = restoMarker.map((info, i) => {
        let lat = info.lat;
        let lng = info.lng;
        let resto = info.resto;

        const markerIcon = {
          // url: ramenIcon,
          url: "https://cdn3.iconfinder.com/data/icons/japan-23/64/ramen-noodles-food-soup-bowl-512.png",
          scaledSize: new window.google.maps.Size(35, 35),
        };

        let marker = new window.google.maps.Marker(
          // {  position: {lat:lat,lng:lng},
          {
            position: { lat: info.lat, lng: info.lng },
            map: map,
            title: resto,
            icon: markerIcon,
          }
        );
        marker.setMap(map); //this is a googlemaps api function, not a hook
        marker.addListener("click", () => {
          // console.log('marker click');
          map.setZoom(16);
          map.setCenter(marker.getPosition());

          // console.log('marker got clicked, set as: ',marker.title);
          setRestoMenu(marker.title);
          // console.log(marker.internalPosition.lat());
          // console.log(marker.internalPosition.lng());
        });
        return marker;
      });
      new MarkerClusterer({ markers, map });
      // marker.setMap(map);
      // }
      // restoNumb = restoPlaces.length;
      // resultsMessage = "`Number of results: ${restoNumb}`"
      setLoading(false);
      // if(restoNumb.length < 1){
      //   resultsMessage = 'blorg'
      // }else {
      //    console.log('restoNumb: ',restoNumb);
      //   resultsMessage = "`Number of results: ${restoNumb}`";
      // }
    }
  }, [restoMarker]);

  // ===== google api call to search for restos =====
  function handleSearch(coords) {
    console.log("coords are: ", coords);
    let lat = coords.lat;
    let lng = coords.lng;
    let radius = coords.radius;
    if (coords.length === 0) {
      alert("please pick a city");
    } else {
      setLoading(true);
      let request = {
        // location: new window.google.maps.Circle(cityCoords),
        location: { lat, lng },
        // radius: radius,
        query: "ramen",
      };
      isClose = coords.closeSearch;
      placesService.textSearch(request, callback);
    }
  }

  // === callback function when api call succesful ====
  function callback(results, status, pagination) {
    if (status === "OK") {
      console.log("isCLose? ", isClose);
      for (let x of results) {
        // populate list of restos
        // console.log("resto api results resto: ", x.name);
        // console.log("resto api results, address: ", x.formatted_address);
        let resultRestos = {
          name: x.name,
        };
        if (!restoPlaces.includes(x.name)) {
          restoPlaces.push(x.name);
        }
        makeMarker(x);
      }

      // console.log('is close search? ',cityCoords);
      // if(cityCoords.closeSearch === 0){
      //   setHooks();
      // }else{
      if (pagination.hasNextPage && isClose === false) {
        // get next page of results, re-run callback
        console.log("getting next page");
        pagination.nextPage();
      } else if (isClose === true) {
        setHooks();
      } else {
        setHooks();
      }

      // }
    }
  } //end of callback();

  //==== set coordiantes for resto markers =====
  function makeMarker(restoDetails) {
    let restObj = {};
    restObj.lat = restoDetails.geometry.location.lat();
    restObj.lng = restoDetails.geometry.location.lng();
    restObj.resto = restoDetails.name;
    markerArr.push(restObj);
  }
  // ====== put resto data into Hooks, re-load page ====
  function setHooks() {
    let first = restoPlaces.shift();
    let second = markerArr.shift();
    // console.log('loaded: ',restoPlaces);
    setRestolist(restoPlaces);
    setRestoMarker(markerArr);
    let total = restoPlaces.length;
    console.log("resto total: ", total);
    setRestoNumb("Number of results: " + total);
  }

  // ==== check if user has denied geolocation access ====
  let access;
  function checkAccess() {
    if (access === "denied") {
      alert(
        "You already denied location access. Refresh page and click again to accept location access."
      );
    } else {
      getUser();
    }
  }

  //======  get geolocation of user =======
  function getUser() {
    let userPos;
    new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
      .then((response) => {
        let geoloc = {
          lat: response.coords.latitude,
          lng: response.coords.longitude,
        };
        return geoloc;
      })
      .then((geoloc) => {
        userPos = {
          radius: 200,
          lat: geoloc.lat,
          lng: geoloc.lng,
          closeSearch: true,
        };
        setCityCoords(userPos);
        return userPos;
      })
      .then((userPos) => {
        refCoords = userPos;
        handleSearch(refCoords);
      })
      .then(() => {
        let cityPicker = document.getElementById("cityPicker");
        cityPicker.value = "none";
      })
      .catch((error) => {
        access = "denied";
        console.log("location error denied");
      });
  }

  // ======= city coordinates + radius search to populate resto menu ==========
  const getCity = (selection) => {
    let city = selection.target.value;
    let userCity;
    console.log("city is: ", city);
    switch (city) {
      case "Montreal":
        userCity = {
          radius: 10000,
          lat: 45.5041905839693,
          lng: -73.57431928743786,
          closeSearch: false,
        };
        break;
      case "Toronto":
        userCity = {
          radius: 10000,
          lat: 43.655739842049236,
          lng: -79.38374061036242,
          closeSearch: false,
        };
        break;
      case "Vancouver":
        userCity = {
          radius: 10000,
          lat: 49.280956827935505,
          lng: -123.12243738369997,
          closeSearch: false,
        };
        break;
      case "Ottawa":
        userCity = {
          radius: 10000,
          lat: 45.41982910818854,
          lng: -75.70019586916331,
          closeSearch: false,
        };
        break;
      // default:
      // userCity = {radius: 200,lat: 45.5041905839693, lng:-73.57431928743786};//default is Montreal
      // userCity = alert('please select a city');
    }

    setCityCoords(userCity);
  };

  // ====== match resto list with resto Marker on click
  function setRestoMenu(title) {
    let menu = document.getElementById("restoSelect");
    menu.value = title;
  }

  //====== center map to selected resto
  function setFocusMarker() {
    let restoVal = document.getElementById("restoSelect").value;
    // console.log("resto selected: ", restoVal);
    let title = restoMarker.filter((obj, i) => obj.resto === restoVal);
    let restoValPosition = { lat: title[0].lat, lng: title[0].lng };

    map.setCenter(restoValPosition);
    map.setZoom(17);
  }

  // === change title depending report or rating page =====
  let searchTitle, restoComm, listComm, resultsMessage;
  if (location.pathname === "/report") {
    searchTitle =
      "Search and find your restaurant, complete rating section below";
    restoComm = "Within 200m";
    listComm = "Within 10km of downtown";
  } else {
    searchTitle = "Find the best ramen closest to you";
    restoComm =
      "By clicking below, the app will access your location data to give you ramen rankings nearest to you";
    listComm =
      "If you would rather not give your location data, choose your city to find the top bowl of ramen of the city";
  }

  // if(restoNumb = undefined){
  //   resultsMessage = 'blorg'
  // }else {
  //    console.log('restoNumb: ',restoNumb);
  //   resultsMessage = "`Number of results: ${restoNumb}`";
  // }

  return (
    <>
      <div className="menuBlock">
        <div className="loadRestoBack">
          <h5>{searchTitle}</h5>
          {/*<h6 className="ratingComm">click to load restaurants</h6>*/}
          <div className="restoLocate">
            <div className="restoBlock">
              <button onClick={checkAccess} type="button">
                Search nearest to me
              </button>
              <h6 className="ratingComm">{restoComm}</h6>
            </div>
            <div className="restoBlock">
              <select onChange={getCity} id="cityPicker">
                <option value="none" name="city">
                  Choose your city
                </option>
                <option value="Montreal" name="city">
                  Montreal
                </option>
                <option value="Toronto" name="city">
                  Toronto
                </option>
                <option value="Vancouver" name="city">
                  Vancouver
                </option>
                <option value="Ottawa" name="city">
                  Ottawa
                </option>
              </select>
              <button onClick={() => handleSearch(cityCoords)} type="button">
                Search whole city
              </button>
              <h6 className="ratingComm">{listComm}</h6>
            </div>
          </div>
        </div>
        <div className="selectRestoBlock">
          <div className="selectResto">
            <div className="loadSpinner">
              {loading ? (
                <PulseLoader
                  color="#fff"
                  size={10}
                  loading={loading}
                  id="loadProg"
                />
              ) : (
                <div>
                  <h6 className="ratingComm">{restoNumb}</h6>
                </div>
              )}
            </div>
            <select
              id="restoSelect"
              className="select-color form-select form-select-md "
              aria-label="Default select example"
              onChange={() => {
                setFocusMarker();
              }}
            >
              {restoList.map((restoNames, i) => {
                return (
                  <option key={i} value={restoNames} name="resto">
                    {restoNames}
                  </option>
                );
              })}
            </select>
          </div>
          <div id="map" className="starBack">
            geomap
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMap;
