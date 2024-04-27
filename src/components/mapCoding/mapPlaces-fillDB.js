import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import ramenIcon from "./ramen.png";
import { useLocation } from "react-router-dom";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import {MagnifyingGlass} from "react-loader-spinner";
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
  const location = useLocation();
  const markerArr = ["go"];
  let restoPlaces = ["eating"]; // initialize array

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
        } else {
          defPos = { lat: cityCoords.lat, lng: cityCoords.lng };
        }
        // console.log('city is at: ',defPos);

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

    console.log("setting map");
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
        return marker;
      });
      new MarkerClusterer({ markers, map });
      // marker.setMap(map);
      // }
      setLoading(false);
    }
  }, [restoMarker]);

  // ========== default coordinates ======================

  // let rawPos = {lat: 46.04347772938561,lng:-73.82687055753087 };
  // let mtlPos = {lat: 45.5591827, lng: -73.7118733};
  // let circlePos = {radius: 100,lat: 45.5591827, lng: -73.7118733,};// this should be same as user coordinates

  // ===== google api call to search for restos =====
  function handleSearch(cityCoords) {
    setLoading(true);
    console.log("cityCoords: ", cityCoords);
    let request = {
      location: new window.google.maps.Circle(cityCoords),
      query: "ramen",
    };
    placesService.textSearch(request, callback);
    // let request2 = {
    //   location: {lat:cityCoords.lat,lng:cityCoords.lng},
    //   radius: cityCoords.radius,
    //   keyword: 'ramen',
    //   type: 'restaurant',
    //   RankBy: 'DISTANCE'
    // }
    // placesService.nearbySearch(request2,callback);
  } // end of handleSearch()

  // placesService.nearbySearch(request,callback);
  // placesService.findPlaceFromQuery(request,callback);

  // === callback function when api call succesful ====
  let sonArr = [];
  function callback(results, status, pagination) {
    // let sonArr = [];
    if (status === "OK") {
      for (let x of results) {
        // populate list of restos
        // console.log(x);
        let resultRestos = {
          resto: x.name,
          latlng: {
            lat: x.geometry.location.lat(),
            lng: x.geometry.location.lng(),
          },
          rating: x.rating,
          price: x.price_level,
          ratingtotal: x.user_ratings_total,
          // address: x.vicinity
          address: x.formatted_address,
        };
        // sort and isolate full address
        let sortedAddress = sortAddy(resultRestos.address);
        resultRestos.address = sortedAddress[0];
        resultRestos.city = sortedAddress[1];
        resultRestos.province = sortedAddress[2];
        resultRestos.country = sortedAddress[3];
        resultRestos.postal = sortedAddress[4];

        if (!restoPlaces.includes(x.name)) {
          restoPlaces.push(x.name);
        }
        makeMarker(x);
        sonArr.push(resultRestos);
        // console.log(x.name);
      }

      if (pagination.hasNextPage) {
        // get next page of results, re-run callback
        // console.log('next page');
        pagination.nextPage();
      } else {
        // if no more data, set hooks and re-load page
        setHooks();
        console.log("final array: ", sonArr);
        intoDBB(sonArr);
      }
    }
    // console.log('final array: ',sonArr);
  } //end of callback();

  //==== sort and re-format address
  function sortAddy(add) {
    let addArray = add.split(","); //turn address into array
    // console.log('data split as array: ',addArray);
    let postal; //save extracted postal code
    let splitadd = addArray.map((item, i) => {
      //make new array with separated address,city,postalcode,province,country
      if (i === 0) {
        // console.log('address: ',item);
        return item.trimStart();
      } else if (i === 1) {
        // console.log('vity: ',item);
        return item.trimStart();
      } else if (i === 2) {
        let prPostal = item.trimStart().split(" ");
        // console.log('province: ',prPostal[0]);
        postal = prPostal[1] + " " + prPostal[2];
        // console.log('province is: ',prPostal[0])
        let province;
        if (prPostal[0].length > 3) {
          switch (prPostal[0]) {
            case "Quebec":
              province = "QC";
              break;
            case "Ontario":
              province = "ON";
              break;
            case "Alberta":
              province = "AB";
              break;
            case "British Columbia":
              province = "BC";
              break;
            case "Manitoba":
              province = "MB";
              break;
            case "New Brunswick":
              province = "NB";
              break;
            case "Newfoundland":
              province = "NL";
              break;
            case "Northwest Territories":
              province = "NT";
              break;
            case "Nova Scotia":
              province = "NS";
              break;
            case "Nunavut":
              province = "NU";
              break;
            case "Prince Edward Island":
              province = "PE";
              break;
            case "Saskatchewan":
              province = "SK";
              break;
            case "Yukon":
              province = "YT";
              break;
          }
        } else {
          province = prPostal[0];
        }
        return province;
      } else if (i === 3) {
        // console.log('country : ',item);
        return item.trimStart(); //return city or country
      }
    });
    splitadd.push(postal);
    return splitadd;
  }

  //======= push each resto details into DB
  async function intoDBB(data) {
    try {
      const pushDB = data.map(async (resto) => {
        // console.log('pushing: ',resto);
        const response = await fetch("http://localhost:3000/jsonCheck", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resto: resto.resto,
            address: resto.address,
            city: resto.city,
            province: resto.province,
            country: resto.country,
            postal: resto.postal,
            ratingtotal: resto.ratingtotal,
            latlng: resto.latlng,
            price: resto.price,
            rating: resto.rating,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to post item: ${resto}`);
        }
        const responseData = await response.json(); // If the server responds with JSON data
        return responseData;
      });
      const results = await Promise.all(pushDB);
      console.log("All items pushed into DB", results);
      // console.log(results);
    } catch (error) {
      console.error("Error posting array item", error);
    }
  }

  //==== parse data to isolate postal code ====
  function getPostal(address) {
    let provpost = address.split(",");
    let pos = provpost[2].split(" ");
    let postal = pos[2] + " " + pos[3];
    return postal;
  }
  //=== parse data to isolate address ====
  function ramenAddy(address) {
    let addy = address.split(",");
    let street = addy[0];
    // console.log(street);
    let road = street.replace(/[0-9]/g, "").trim();
    return road;
  }

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
    setLoading(false);
  }

  // ==== check if user has denied geolocation access ====
  let access;
  function checkAccess() {
    console.log(access);
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
        let circlePos = { radius: 10000, lat: geoloc.lat, lng: geoloc.lng };
        handleSearch(circlePos);
      })
      .catch((error) => {
        access = "denied";
        console.log("my custom denied");
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
        };
        break;
      case "Toronto":
        userCity = {
          radius: 10000,
          lat: 43.655739842049236,
          lng: -79.38374061036242,
        };
        break;
      case "Vancouver":
        userCity = {
          radius: 10000,
          lat: 49.280956827935505,
          lng: -123.12243738369997,
        };
        break;
      case "Ottawa":
        userCity = {
          radius: 10000,
          lat: 45.41982910818854,
          lng: -75.70019586916331,
        };
        break;
      default:
        userCity = {
          radius: 100,
          lat: 45.5041905839693,
          lng: -73.57431928743786,
        }; //default is Montreal
    }
    setCityCoords(userCity);
  };

  // === change title depending report or rating page =====
  let searchTitle, restoComm, listComm;
  if (location.pathname === "/report") {
    searchTitle = "Select your restaurant";
    restoComm =
      "By clicking below, the app will access your location data to give you a list of restaurants nearest to you";
    listComm =
      "If you would rather not give your location data, choose your city and find your restaurant in the list";
  } else {
    searchTitle = "Find the best ramen closest to you";
    restoComm =
      "By clicking below, the app will access your location data to give you ramen rankings nearest to you";
    listComm =
      "If you would rather not give your location data, choose your city to find the top bowl of ramen of the city";
  }

  return (
    <>
      <div className="starBack">
        <div className="ratingLabel">
          <span>{searchTitle}</span>
          <div className="restoLocate">
            <div className="restoBlock">
              <h6 className="ratingComm">
                {restoComm}
                {/*By clicking below, the app will access your location data to give you a list of restaurants nearest to you*/}
              </h6>
              <button onClick={checkAccess} type="button">
                Find restaurants nearest to me
              </button>
            </div>
            <div className="restoBlock">
              <h6 className="ratingComm">
                {listComm}
                {/*If you would rather not give your location data, choose your city and find your restaurant in the list*/}
              </h6>
              <select onChange={getCity}>
                <option></option>
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
                FIND RESTAURANTS
              </button>
            </div>
          </div>
          <div id="restoSelectBlock">
            {/*<div className="selectResto">*/}
            <div className="loadSpinner">
              {loading ? (
                <PulseLoader
                  color="#fff"
                  size={10}
                  loading={loading}
                  id="loadProg"
                />
              ) : (
                <div></div>
              )}
            </div>
            <div className="selectResto">
              <select
                className="select-color form-select form-select-lg mb-3 "
                aria-label="Default select example"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MyMap;
