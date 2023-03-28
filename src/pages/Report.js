import React, { useState,useContext,useEffect } from "react";
import { Form,useActionData,redirect } from "react-router-dom";
import ReportHeader from './ReportHeader';
import StarRating from '../components/StarRating';
import {DataContext} from '../App';

import './Report.css';
// const StarSet = createContext();

export default function Report() {
   const [noodleRate, setNoodleRate] = useState(0);
   const [soupRate, setSoupRate] = useState(0);
   const [toppRate,setToppRate] = useState(0);
   const [expRate,setExpRate] = useState(0);

   const rateNoodle = {noodleRate,setNoodleRate};
   const rateSoup = {soupRate,setSoupRate};
   const rateTopp = {toppRate,setToppRate};
   const rateExp = {expRate,setExpRate};

	const {contextProps} = useContext(DataContext);
	const{signedIn, setSignedIn} = contextProps.signed;
	const {userStat,setUserStat} = contextProps.user;
	const email= userStat.email;


	let noodleCom,soupCom,toppCom,expCom;
	let total = noodleRate + soupRate + toppRate+expRate;

	if (noodleRate === 0){
		noodleCom = ' ';
	}else	if(noodleRate === 1){
		noodleCom = ' The noodles needed work.';
	}else if (noodleRate === 2){
		noodleCom = ' The noodles were acceptable.';
	}else if (noodleRate === 3){
		noodleCom = ' Those noodles were just right.';
	}else if (noodleRate === 4){
		noodleCom = ' The noodles were the perfect texture!';
	}else if(noodleRate === 5){
		noodleCom = ' I\'ve never experienced noodles like that before!';
	}

	if(soupRate === 0){
		soupCom = ' ';
	}else if(soupRate === 1){
		soupCom = ' Not much was going on with the soup.';
	}else if(soupRate === 2){
		soupCom = ' The soup was alright... I guess?';
	}else if(soupRate === 3){
		soupCom = ' The soup was delicious.';
	}else if(soupRate === 4){
		soupCom = ' Man, there\'s something magical about the soup.';
	}else if(soupRate === 5){
		soupCom = ' The soup was exquisite!';
	}

	if(toppRate === 0){
		toppCom = ' ';
	}else if(toppRate === 1){
		toppCom = ' I ate the toppings because I didn\'t want to waste my money, but I could\'ve left them alone.';
	}else if(toppRate === 2){
		toppCom = ' The toppings were so-so. Nothing to write home about';
	}else if(toppRate === 3){
		toppCom = ' The toppings were pretty tasty.';		
	}else if(toppRate === 4){
		toppCom = ' Those toppings were something else!';		
	}else if(toppRate === 5){
		toppCom = ' The toppings blasted my mind!';
	}

	if(expRate === 0){
		expCom = ' ';
	}else if(expRate === 1){
		expCom = ' It was not pleasant being there. Not coming back';
	}else if(expRate === 2){
		expCom = ' It was aaaight. I might try later and see if it gets better.';
	}else if(expRate === 3){
		expCom = ' Nothing to complain about. This could be my regular spot.';		
	}else if(expRate === 4){
		expCom = ' That was amazing! I\'m letting everyone know.';		
	}else if(expRate === 5){
		expCom = ' This is a true gem. I would rather not let anyone else know about this place because I want it all to myself.';
	}

  const reportdata = useActionData(); 

	useEffect(()=>{
		// console.log('Render: report data is at: ',reportdata);
		if(reportdata != undefined){
			alert('You made a Ramen Report! You\'ve now done '+reportdata.entries+' Ramen reports.');
				setUserStat(reportdata);
		}
	},[reportdata])


	return(
		<div className="reportBack">
			<ReportHeader />
			<section className="reportPage">
				{/*<h2 className="reportHeading">Do a Ramen Report</h2> */}
					<div className="reportForm">
						<Form method="post" action="/report">
							<div className="starBack">
								<div className="ratingLabel"> 
									<span>What Restaurant ?</span>
									<button className="">Find my restaurant based on my location</button>
									<input type="hidden" name="resto" value ={noodleRate} />
								</div>
								<p className="ratingComm">{noodleCom}</p>
							</div>
							<div className="starBack">
								<div className="ratingLabel"> 
									<span>Rate the noodles</span>
									<StarRating rate={rateNoodle} num={1}>
									</StarRating>
									<input type="hidden" name="noodles" value ={noodleRate} />
								</div>
								<p className="ratingComm">{noodleCom}</p>
							</div>
							<div className="starBack">
								<div className="ratingLabel">
									<span>Rate the Soup</span>
								<StarRating rate={rateSoup} num={2} >
									</StarRating>
									<input type="hidden" name="soup" value ={soupRate} />
								</div>
								<p className="ratingComm">{soupCom}</p>
							</div>
							<div className="starBack">
								<div className="ratingLabel">
									<span>Rate the Toppings</span>
								<StarRating rate={rateTopp} num={3} >
									</StarRating>
									<input type="hidden" name="toppings" value ={soupRate} />
								</div>
								<p className="ratingComm">{toppCom}</p>
							</div>
							<div className="starBack">
								<div className="ratingLabel">
									<span>Rate over all experience</span>
								<StarRating rate={rateExp} num={4} >
									</StarRating>
									<input type="hidden" name="experience" value ={expRate} />
								</div>
								<p className="ratingComm">{expCom}</p>
							</div>
							<div className="starBack">
								<div className="ratingLabel">
										<h3>Total Score</h3>
									<h2>{total}</h2>
									</div>
							</div>
							<div className="starBack">
								<div className="ratingLabel">
									<span>What kind of Ramen did you have?</span>
									<h6 className="ratingComm">What kind of soup? What type of noodles? What were the toppings? </h6>
									<label>
										<span>Noodles</span>
											<input type="text" name="noodleType" value={true}/>
									</label>
									<label>
										<span>Soup</span>
											<input type="text" name="soupType" value={true}/>
									</label>
									<label>
										<span>Toppings</span>
											<input type="text" name="toppingType" value={true}/>
									</label>
								</div>
							</div>
							<div className="starBack">
								<div className="ratingLabel">
									<span>Comments - the specifics of your experience</span>
									<h6 className="ratingComm">Let us know what you liked or disliked about your meal. Be specific and descriptive. </h6>
									<textarea name="comments" required></textarea>
								</div>
							</div>
							<div>
								<input type="hidden" name="logstat" value={signedIn} />
								<input type="hidden" name="email" value={email} />
								</div>
							<div className="buttonBack">
								<button className="reportSubmitButton">Submit</button>
							</div>

						{/*{reportdata && reportdata.error && <p>{reportdata.error}</p>}*/}
						</Form>
					</div>
			</section>
		</div>
	)
}
