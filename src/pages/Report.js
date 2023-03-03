import React, { useState, } from "react";
import { Form,useActionData,redirect } from "react-router-dom";

import './Report.css';

import ReportHeader from './ReportHeader';
import StarRating from '../components/StarRating';

// const StarSet = createContext();

export default function Report() {
   const [noodleRate, setNoodleRate] = useState(0);
   const [soupRate, setSoupRate] = useState(0);
   const [toppRate,setToppRate] =useState(0);

   const rateNoodle = {noodleRate,setNoodleRate};
   const rateSoup = {soupRate,setSoupRate};
   const rateTopp = {toppRate,setToppRate};

   console.log('noodle stars: ',noodleRate, 'soup stars: ',soupRate,'toppings stars: ',toppRate);

  const data = useActionData(); 
	return(
		<div className="reportBack">
			<ReportHeader />
			<section className="reportPage">
				{/*<h2 className="reportHeading">Do a Ramen Report</h2> */}
					<div className="reportForm">
						<Form method="post" action="/report">
							<div className="starBack">
								<label>
									<span>Rate the noodles</span>
									<StarRating rate={rateNoodle} num={1}>
									</StarRating>
									<input type="hidden" name="noodles" value ={noodleRate} />
								</label>
							</div>
							<div className="starBack">
								<label>
									<span>Rate the Soup</span>
								<StarRating rate={rateSoup} num={2} >
									</StarRating>
									<input type="hidden" name="soup" value ={soupRate} />
								</label>
							</div>
							<div className="starBack">
								<label>
									<span>Rate the Toppings</span>
								<StarRating rate={rateTopp} num={3} >
									</StarRating>
									<input type="hidden" name="toppings" value ={soupRate} />
								</label>
							</div>
							<label>
								<span>Your email:</span>
								<input type="email" name="email" required />
							</label>
							<label>
								<span>Comments - the specifics of your experience</span>
								<textarea name="comments" required></textarea>
							</label>
						<button className="reportSubmitButton">Submit</button>

						{data && data.error && <p>{data.error}</p>}
						</Form>
					</div>
			</section>
		</div>
	)
}

export const sendReportAction = async({ request })=> {
  const data = await request.formData();

  const submission = {
    email: data.get('email'),
    comments: data.get('comments'),
    noodles: data.get('noodles'),
    soup: data.get('soup'),
    toppings: data.get('toppings'),
  }
  console.log(submission)
  // send your post request

  if (submission.comments.length < 10) {
    return {error: 'Message must be over 10 chars long.'}
  }

  // redirect the user
  // (redirect('/'), 
   function good(){
  	 alert("success, page goes to party happy page");
  	 return redirect('/');
  }
  return  good();
}

