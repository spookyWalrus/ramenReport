import { Form,useActionData,redirect} from "react-router-dom";



export default function Login(){
	return(
		<div className="ratingBack">
	      <div className="reportIntro">
				<h2>This is the login</h2>
			</div>
			<div className="reportPage">
				<Form method="post" action="/report">
					<label>
						<span>Email</span>
						<input type="email" name="email" required />
					</label>
					<label>
						<span>Password</span>
						<input type="password" name="password" required />
					</label>
					<div>
						<button className="reportSubmitButton">Submit</button>
					</div>

				{data && data.error && <p>{data.error}</p>}
				</Form>
			</div>
		</div>
	)
}

// export default Login;

export const sendLoginAction = async({ request })=> {
  const data = await request.formData();

  const submission = {
	email: data.get('email'),
	password: data.get('password')
  }
  console.log(submission)
  // send your post request


  // this should be async/await statement with a catch for unsuccesful login
  if (submission.password.length < 8) {
    return {error: 'password must be over 8 chars long.'}
  }

  // redirect the user on successful login
   function good(){
  	 alert("successful login");
  	 setSignedIn(true);
  	 return redirect('/');
  }
  return  good();
}