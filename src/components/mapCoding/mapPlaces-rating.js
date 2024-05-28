import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../App";
import PulseLoader from "react-spinners/PulseLoader";
import ratingFetch from "../ratingFetch";
import {
  menuLabels,
  getRatings,
  whichCity,
  checkCityWide,
  checkAccess,
} from "./mappingTools";

const FindRating = ({ restoRatings }) => {
  const [cityCoords, setCityCoords] = useState([]);
  const [searchNumb, setSearchNumb] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // const { contextProps } = useContext(DataContext);
  // const{signedIn, setSignedIn} = contextProps.signed;
  // let signedIn = true;
  // const { userStat } = contextProps.user;

  // let markerArr = ["go"];
  // let restoPlaces = ["eating"]; // initialize array

  // ========== get ratings based on cityCoords ==========
  async function handleSearch(cityCoords) {
    setLoading(true);
    let mapRatings = await getRatings(cityCoords)
      .then()
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    let ratings = [];

    await ratingFetch(cityCoords.city)
      .then((dbData) => {
        ratings[0] = dbData;
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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

  // =========== check if cityWide or nearby search + check if user is logged in   ====
  async function isCityWide() {
    await checkCityWide().then((coordinates) => {
      if (coordinates && !null) {
        handleSearch(coordinates);
      }
    });
  }

  // ======= set city coordinates + radius of search  ==========
  const setCity = (selection) => {
    let selectedCity = whichCity(selection);
    setCityCoords(selectedCity);
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
                isCityWide();
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
