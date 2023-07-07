
import MyMap from '../components/mapCoding/mapPlaces-rating';
// import HashLoader from 'react-spinners/HashLoader';

import './Ratings.css';
import '../components/mapCoding/mapApp.css';

export default function Ratings() {
  return (
    <div className="ratingBack">
      <div className="ratingIntro">
        <h1 className="ratingHeading">Ramen Ratings
        </h1>
        <MyMap />
      {/*  <HashLoader
          color="#fff"
          size={20}
          loading={loadingInProgress}
          id="loadProg"
        />*/}
        <div id="map" className="starBack">geomap</div>
      </div>
      <div className="ratingBlock">
        <h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque dignissim enim sit amet venenatis. Risus quis varius quam quisque id diam vel. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Eu tincidunt tortor aliquam nulla facilisi cras. Ullamcorper a lacus vestibulum sed. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. A iaculis at erat pellentesque adipiscing commodo elit at. Ut faucibus pulvinar elementum integer enim. Est placerat in egestas erat.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque dignissim enim sit amet venenatis. Risus quis varius quam quisque id diam vel. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Eu tincidunt tortor aliquam nulla facilisi cras. Ullamcorper a lacus vestibulum sed. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. A iaculis at erat pellentesque adipiscing commodo elit at. Ut faucibus pulvinar elementum integer enim. Est placerat in egestas erat.
        </h5>
      </div>
    </div>
  );
}