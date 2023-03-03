import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';



export default function UserInOut({signedIn,setActive}){
	if(signedIn){
		return(
			<LinkContainer to="/home" onClick={()=>{setActive(4); setSignedIn(false) }}>
			  <Nav.Link 
			  active={false} 
			  eventKey="4"
				>
				Sign Out
				</Nav.Link>
			</LinkContainer>
		)
	}else{
		return(
			<div id="userDropMenu">
			<LinkContainer to="login" onClick={()=>setActive(4)} >
			  <Nav.Link 
			  active={false} 
			  eventKey="4"
				>
				Log In
				</Nav.Link>
			</LinkContainer>
		{/*	<LinkContainer to="report" onClick={()=>setActive(4)} >
			  <Nav.Link 
			  active={false} 
			  eventKey="4"
				>
				Register
				</Nav.Link>
			</LinkContainer>*/}
			</div>
		)
	}
}


// 		if(isSignedIn){
// 		return(
// 			<Nav.Link to='/#home'
// 				onClick={()=>{routeChange('signout')}}
// 				style={{display: 'flex', justifyContent: 'flex-end'}}
// 			>
// 				<p className=''>Sign out</p>
// 			</Nav.Link>
// 		)
// 	}else{
// 		return(
// 			<Nav.Link to="login"
// 					className='nav-link'>Sign In
// 				{/*<p onClick={()=>{routeChange('register')}}
// 					className='nav-link'>Register
// 				</p>*/}
// 			</Nav.Link>
// 		)
// 	}
// }