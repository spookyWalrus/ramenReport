import React, { useState } from "react";
import MyRating from "../components/mapCoding/mapPlaces-rating";
import "./Ratings.css";
import "./Report.css";
import "../components/mapCoding/mapApp.css";

import RamenChart from "../components/chart.js";

export default function Ratings() {
  const [theRatings, setTheRatings] = useState([]);
  let ratingBlock = "ratingBlock";

  const restoRatings = (ratingsData) => {
    // let ratingBlock = "ratingBlock";
    if (ratingsData === undefined) {
      let noData = { resto: "none" };
      console.log("data undefined: ", ratingsData);
      setTheRatings(noData);
      ratingBlock += " hideRatingBlock";
    }
    console.log("got data from MyRating: ", ratingsData);
    setTheRatings(ratingsData);
    ratingBlock += " showRatingBlock";
  };
  // console.log('ratings length: ',theRatings.length);

  // let ratingBlock = "ratingBlock";
  //   if (theRatings.length === 0) {
  //     ratingBlock += " hideRatingBlock";
  //   } else if (theRatings.length > 0) {
  //     ratingBlock += " showRatingBlock";
  //   }

  // if(theRatings){
  //   console.log('theRatings set: ',theRatings);
  return (
    <div className="ratingBack">
      <section className="reportIntro">
        <h1 className="reportHeading">The Ramen Ratings</h1>
      </section>
      <section className="ratingSection">
        <div className="menuBlock">
          <MyRating restoRatings={restoRatings} />
        </div>
        <div className={ratingBlock}>
          {/* <div class="chart-container"> */}
          {/* <h3>Best Ramen in your area</h3> */}
          {theRatings.length != undefined ? (
            <div class="chart-container">
              <RamenChart dbratings={theRatings} />
            </div>
          ) : (
            <div></div>
          )}

          {/* // <RamenChart /> */}
          {/* // <div><h3>No ratings to be found</h3></div> */}
        </div>
      </section>
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
