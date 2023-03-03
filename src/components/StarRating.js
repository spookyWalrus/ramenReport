// import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-regular-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';


import '../pages/Report.css';
library.add(fas, faStar);

const StarRating = ({rate,num}) => {  
   
   let rating, setRating; // set which state variables to use
   if(num === 1){
      rating = rate.noodleRate;
      setRating = rate.setNoodleRate;
   }else if(num === 2){
      rating = rate.soupRate;
      setRating = rate.setSoupRate;
   }else if(num === 3){
      rating = rate.toppRate;
      setRating = rate.setToppRate;
   }
   
   return (
     <div >
         {[...Array(5)].map((star,index) => {  
            index += 1;
            return (
               <Button
                  type="button"
                  key={index}
                  className={index <= rating ? "starOn" : "starOff "}
                  // rating name is dynamic
                  onClick={()=>{setRating(index)}}// set function name is dynamic
                >      
                <span>
                  <FontAwesomeIcon key={index} 
                  icon={index <= rating ? "fa-solid fa-star" : "fa-regular fa-star"}
                  />
                </span>
             </Button>
            );
         })}
      </div>

   );
};

export default StarRating;
 