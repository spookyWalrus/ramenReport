import { useState, useEffect, useContext } from "react";
// import { Loader } from "@googlemaps/js-api-loader";
// import ramenIcon from './ramen.png';
import { useLocation } from "react-router-dom";
import { DataContext } from "../../App";
import PulseLoader from "react-spinners/PulseLoader";

import ratingFetch from "../ratingFetch";
import { menuLabels, getRatings } from "./mappingTools";

// let YOUR_API_KEY = process.env.REACT_APP_MAPS_KEY;

const FindRating = ({ restoRatings }) => {
  // const [placesService, setPlacesService] = useState(null);

  const [cityCoords, setCityCoords] = useState([]);
  const [searchNumb, setSearchNumb] = useState([]);

  const [loading, setLoading] = useState(false);
  const [cityWide, setCityWide] = useState();
  const location = useLocation();
  const { contextProps } = useContext(DataContext);
  // const{signedIn, setSignedIn} = contextProps.signed;
  let signedIn = true;
  const { userStat } = contextProps.user;

  let markerArr = ["go"];
  let restoPlaces = ["eating"]; // initialize array

  //=== trigger functions based on citywide or nearby search
  useEffect(() => {
    if (cityWide) {
      handleSearch(cityCoords);
    } else if (cityWide == false) {
      checkAccess();
    }
  }, [cityWide]);

  // ========== get ratings based on cityCoords ==========
  async function handleSearch(cityCoords) {
    setLoading(true);
    let mapRatings = await getRatings(cityCoords);
    let ratings = [];
    await ratingFetch(cityCoords.city).then((dbData) => {
      ratings[0] = dbData;
    });

    const sortMapRestos = mapRatings.map((item, x) => {
      let resto = item.name;
      let rating = item.rating;
      return { [resto]: rating };
    });
    let mapRankings = sortMapRestos.sort(function (a, b) {
      return Object.values(b) - Object.values(a);
    });
    ratings[1] = mapRankings;
    setLoading(false);
    restoRatings(ratings); // this array gets pushed up to parent component
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

  // =========== check if cityWide or nearby search + check if user is logged in   ====
  function isCityWide(torf) {
    if (torf && signedIn) {
      setCityWide(true);
      setCity();
    } else if (!torf && signedIn) {
      setCityWide(false);
      checkAccess();
    } else {
      alert("Please log in to get ratings");
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
        let circlePos = { radius: 500, lat: geoloc.lat, lng: geoloc.lng };
        setCityWide(false);
        handleSearch(circlePos);
      })
      .catch((error) => {
        access = "denied";
        console.log("my custom denied");
      });
  }

  // ======= city coordinates + radius search to populate resto menu ==========
  const setCity = (selection) => {
    let city = selection.target.value;
    let userCity;
    switch (city) {
      case "Montreal":
        userCity = {
          radius: 100,
          lat: 45.5041905839693,
          lng: -73.57431928743786,
          city: city,
        };
        break;
      case "Toronto":
        userCity = {
          radius: 10000,
          lat: 43.655739842049236,
          lng: -79.38374061036242,
          city: city,
        };
        break;
      case "Vancouver":
        userCity = {
          radius: 100,
          lat: 49.280956827935505,
          lng: -123.12243738369997,
          city: city,
        };
        break;
      case "Ottawa":
        userCity = {
          radius: 100,
          lat: 45.41982910818854,
          lng: -75.70019586916331,
          city: city,
        };
        break;
      default:
        userCity = {
          radius: 100,
          lat: 45.5041905839693,
          lng: -73.57431928743786,
          city: city,
        }; //default is Montreal
    }
    setCityCoords(userCity);
    // getMapServices();
  };

  // // === change menu labels depending on page =====
  const theLabels = menuLabels(location.pathname);

  return (
    <>
      <div className="loadRestoBack">
        <h5>{theLabels.search}</h5>
        <div className="restoLocate">
          <div className="restoBlock">
            <button
              onClick={() => {
                isCityWide(false);
              }}
              type="button"
            >
              Find ratings closest to me
            </button>
            <h6 className="ratingComm">{theLabels.resto}</h6>
          </div>
          <div className="restoBlock">
            <select onChange={setCity}>
              <option value="none" name="city">
                Choose your city
              </option>
              <option value="Montreal" name="city">
                Montreal
              </option>
              <option value="Toronto" name="city">
                Toronto
              </option>
              {/*<option value='Vancouver' name='city'>Vancouver</option>
              <option value='Ottawa' name='city'>Ottawa</option>*/}
            </select>

            <button onClick={() => handleSearch(cityCoords)} type="button">
              Search whole city
            </button>
            <h6 className="ratingComm">{theLabels.list}</h6>
          </div>
        </div>
        <div className="loadSpinnerRate">
          {loading ? (
            <PulseLoader
              color="#fff"
              size={10}
              loading={loading}
              id="loadProg"
            />
          ) : (
            <div>
              <h6 className="ratingComm">{searchNumb}</h6>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FindRating;
