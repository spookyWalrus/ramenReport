import { Form, useActionData,useNavigate} from "react-router-dom";
import {useContext,useEffect} from 'react';
import {DataContext} from '../components/CheckNav';

export default function Register(){
	const logdat = useActionData();
	const {setSignedIn} = useContext(DataContext);
	const goHome = useNavigate();

	// if(logdat){
	// 	if(logdat.status === true){ // if login succesful,  set login status to true, redirect to homepage
	// 		setSignedIn(true);
	// 		return goHome('/');
	// 	}
	// }
	useEffect(()=>{
			if(logdat){
				if(logdat.status === true ){
					setSignedIn(true);
					return goHome('/');
				}
			}
		})


	return(
		<div className="ratingBack">
	      <div className="reportIntro">
				<h2>This is the Register</h2>
			</div>
			<div className="reportPage">
				<Form method="post" action="/login">
					<label>
						<span>User name</span>
						<input type="text" name="user name" required />
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

				{/*{data && data.error && <p>{data.error}</p>}*/}
				</Form>
			</div>
		</div>
	)
}

