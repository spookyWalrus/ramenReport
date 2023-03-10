import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {ScrollWithOffset,DataContext} from './CheckNav';
import {useContext} from 'react';


export default function UserInOut({setActive}){
	const {contextProps} = useContext(DataContext);
	const {signedIn,setSignedIn} = contextProps.signed;
	const {userStat} = contextProps.user;
	console.log(userStat);


	if(signedIn){
		return(
			<div id="userDropMenu">
				<div>
					<p>User name: {userStat.name}</p>
					<p>Number of reports made: {userStat.count}</p>
				</div>
				<LinkContainer to="/" 
					// scroll={ScrollWithOffset} 
					onClick={()=>{setActive(4); setSignedIn(false) }}>
				  <Nav.Link 
				  active={false} 
				  eventKey="4"
					// scroll={ScrollWithOffset}
					>
					Log Out
					</Nav.Link>
				</LinkContainer>
			</div>
		)
	}else{
		return(
			<div id="userDropMenu">
			<LinkContainer to="login" state={{here: "login"}} onClick={()=>setActive(4)} >
			  <Nav.Link 
			  active={false} 
			  eventKey="4"
				>
				Log In
				</Nav.Link>
			</LinkContainer>
			<LinkContainer to="register" state={{here: "register"}} onClick={()=>setActive(4)} >
			  <Nav.Link 
			  active={false} 
			  eventKey="4"
				>
				Register
				</Nav.Link>
			</LinkContainer>
			</div>
		)
	}
}

