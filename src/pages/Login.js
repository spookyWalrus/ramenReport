import { Form, useActionData, redirect, Navigate} from "react-router-dom";
import {useContext} from 'react';
import {DataContext} from '../App';

export default function Login(){
	const {signedIn,setSignedIn} = useContext(DataContext);
	// console.log('signedIn object: ',signedIn);
	// set if statement in sendLoginAction so that a succesful login will return a object with key 'success' ; true.
	// Then we use the variable data.success as means to set the value of our 'signedIn' hook to TRUE 
	// const {status, alert} = useActionData();
   // setSignedIn(status);
   // alert();
   // console.log('signed in status: ',signedIn);

	const logdat = useActionData();
	// const status = logdat.status;
	if(logdat){
		setSignedIn(logdat.status);
	}
	// console.log(logdat.alert);

	return(
		<div className="ratingBack">
	      <div className="reportIntro">
				<h2>This is the login</h2>
			</div>
			<div className="reportPage">
				<Form method="post" action="/login">
					<label>
						<span>Email</span>
						<input type="email" name="email" required />
					</label>
					<label>
						<span>Password</span>
						<input type="password" name="password" required />
					</label>
					<div>
						<button type="submit" className="reportSubmitButton">Submit</button>
					</div>

				{/*{data && data.error && <p>{data.error}</p>}*/}
				</Form>
			</div>
		</div>
	)
}

// export default Login;

export const sendLoginAction = async({ request })=> {
	const logindata = await request.formData();

	const login = {
		email: logindata.get('email'),
		password: logindata.get('password')
	}
	console.log(login)

	// callback function on success
	function success(){
		 return { status: true,
		 				alert: alert("successful login"),
		 			}
	}
	// send your post request via fetch()
	// use .then for success/unsuccesful action
	if (login.email.length > 0){
		redirect('/');
		return success();
	}
	  // below should be catch error statement for unsuccesful login
	if (login.password.length < 3) {
	 return {error: 'password must be over 8 chars long.'}
	}

}
