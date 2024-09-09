import React, { useState } from "react";
import FindRating from "../components/mapCoding/mapPlaces-rating";
import "./Ratings.css";
import "./Report.css";
import "../components/mapCoding/mapApp.css";
import RamenChart from "../components/chart.js";

export default function Ratings() {
  const [theRatings, setTheRatings] = useState([]);

  const restoRatings = (ratingsData) => {
    // console.log("the ratings db data:", ratingsData[0]);
    // console.log("the ratings maps data:", ratingsData[1]);

    setTheRatings(ratingsData[0]);
  };

  return (
    <div className="ratingBack">
      <section className="reportIntro">
        <h1 className="reportHeading">The Ramen Ratings</h1>
      </section>
      <section className="ratingSection">
        <div className="menuBlock">
          <FindRating restoRatings={restoRatings} />
        </div>
        {theRatings.length > 0 ? (
          <div className="ratingBlock">
            <div className="chart-container">
              <RamenChart dbratings={theRatings} />
            </div>
          </div>
        ) : (
          <div className="noRatingBlock"></div>
        )}
      </section>
    </div>
  );
}
