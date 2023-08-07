import React, { useState,useEffect } from "react";
import MyRating from '../components/mapCoding/mapPlaces-rating';
// import HashLoader from 'react-spinners/HashLoader';

import './Ratings.css';
import '../components/mapCoding/mapApp.css';

import RamenChart from '../components/chart.js';


export default function Ratings() {
  const [theRatings,setTheRatings] = useState(0);
  const restoRatings =((ratingsData)=>{
    console.log('got data from MyRating: ',ratingsData);
    setTheRatings(ratingsData);
  })

  // if(theRatings){
  //   console.log('theRatings set: ',theRatings);
    return (
      <div className="ratingBack">
        <div className="ratingIntro">
          <h1 className="ratingHeading">Ramen Ratings
          </h1>
          <MyRating restoRatings={restoRatings}/>
          <div class="chart-container">
            <h3>Best Ramen in your area</h3>
                {theRatings.length>1 ? 
                <RamenChart dbratings={theRatings}/> 
                : <RamenChart />
                } 
          </div>
        </div>
      </div>
    );
  // }else{
  //   console.log('theRatings empty: ',theRatings);
  //   return (
  //     <div className="ratingBack">
  //       <div className="ratingIntro">
  //         <h1 className="ratingHeading">Ramen Ratings
  //         </h1>
  //         <MyRating restoRatings={restoRatings}/>
  //         <div class="chart-container">
  //           <h3>No Ramen in your area</h3>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}