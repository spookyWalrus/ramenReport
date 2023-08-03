
import MyGraph from '../components/mapCoding/mapPlaces-rating';
// import HashLoader from 'react-spinners/HashLoader';

import './Ratings.css';
import '../components/mapCoding/mapApp.css';

import ChartTest from '../components/chartTest.js';

export default function Ratings() {
  return (
    <div className="ratingBack">
      <div className="ratingIntro">
        <h1 className="ratingHeading">Ramen Ratings
        </h1>
        <MyGraph />
      {/*  <HashLoader
          color="#fff"
          size={20}
          loading={loadingInProgress}
          id="loadProg"
        />*/}
        {/*<div id="map" className="starBack">geomap</div>*/}
      </div>
      <div className="ratingBlock">
        <ChartTest />
      </div>
    </div>
  );
}