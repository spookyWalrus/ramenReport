import { Form, useActionData,useNavigate,useLocation} from "react-router-dom";
import {useContext,useEffect} from 'react';
import {DataContext} from '../components/CheckNav';

export default function Login(){
	const location = useLocation();
	const logdat = useActionData();
	const {contextProps} = useContext(DataContext);
	const{signedIn, setSignedIn} = contextProps.signed;
	const {setUserStat} = contextProps.user;
	const goHome = useNavigate();
	let message = '';

	// set state to true when login succesful, otherwise show error message
		useEffect(()=>{
			if(logdat){
				console.log('is logdat? ',logdat);
				if(logdat.status === true ){
					setSignedIn(true);
					setUserStat(logdat.userstat);
					return goHome('/');
				}else if((logdat.status === false )&& location.pathname === 'register'){
					return message = logdat.errorReg;
				}else if((logdat.status === false )&& location.pathname === 'login'){
					return message = logdat.error;
				}
			}
		})

	

	if(location.pathname === '/register'){
		return(
			<div className="ratingBack">
		      <div className="reportIntro">
					<h2>This is the Register</h2>
				</div>
				<div className="reportPage">
					<Form method="post" action="/register">
						<label>
							<span>User name</span>
							<input type="text" name="userName" required />
						</label>
						<label>
							<span>Email</span>
							<input type="email" name="email" required />
						</label>
						<label>
							<span>Password</span>
							<input type="password" name="password" required />
						</label>
					
						<div>
							<input type="hidden" name="logreg" value="register" />
							<button type="submit" className="reportSubmitButton">Sign me up!</button>
						</div>
					</Form>
                {logdat && logdat.errorReg && <p>{logdat.errorReg}</p>}
				</div>
			</div>
		)
	}else if(location.pathname === '/login'){
		return(
			<div className="ratingBack">
		      <div className="reportIntro">
					<h2>This is the login</h2>
				</div>
				<div className="reportPage">
					<Form method="post" action="/login">
						<label>
							<span>User name</span>
							<input type="text" name="userName" required />
						</label>
						<label>
							<span>Password</span>
							<input type="password" name="password" required />
						</label>
						<div>
							<input type="hidden" name="logreg" value="login" />
							<button type="submit" className="reportSubmitButton">Submit</button>
						</div>
					</Form>
				 {logdat && logdat.error && <p>{logdat.error}</p>}
				</div>
			</div>
		)
	}
}



