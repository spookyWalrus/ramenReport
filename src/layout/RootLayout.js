import { Outlet} from 'react-router-dom';
import {useState} from 'react';
import { NavHashLink} from 'react-router-hash-link';
import {Container,Navbar, Nav,NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { ScrollWithOffset} from '../components/CheckNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/ramenLogo.gif';

//components
import UserInOut from '../components/UserInOut';
import Footer from '../components/Footer';

import './RootLayout.css';


export default function RootLayout({userStatus}){
	const [active, setActive] = useState(); // use state to turn 'active' status on/off with buggy NavHashLink
	// const [route,setRoute] = useState('signin');
	// const [signedIn,setSignedIn] = useState(false);

// change class names when # link clicked
	let actionKnow,actionHome;
	function setClass(){
		if(active === 1){ // know link clicked
			actionKnow = 'knowActive';
			actionHome = ''
		}else if (active === 0){ // home link clicked
			actionKnow = '';
			actionHome = 'homeActive';
		}else if (active > 1){ // other links clicked
			actionKnow = '';
			actionHome = '';
		}
	}
	if (active){
		setClass();
	}

// change state based on what page youre on
console.log(signedIn);
	function routeChange(route){
      if(route === 'signout'){
         setRoute('signin')
      }else if (route === 'home'){
         setSignedIn({isSignedIn: true})
      }
        // setState({route: route});
	}
	
	return(
		<div className="rootLayout">
			<header>
				<Navbar  expand="md" className="myNav" fixed="top" collapseOnSelect expand="md">
					<Container fluid id="theHeaderContainer">	
							 <Nav.Link 
							 		eventKey="0" 
							 		className={actionHome}
							> 	
								<NavHashLink 
								active={false}
								smooth
								id="homeLink" 
								to="/#home"
								onClick={()=>setActive(0)}
								// className={actionHome}
								 >
									<Navbar.Brand >
										<div className="logo-title">
											<img src={logo} className="header-logo d-inline-block align-top" alt="logo" />
											<p className="header-title">tRR</p>
										</div>
									</Navbar.Brand>
								</NavHashLink>
								</Nav.Link>
							<Navbar.Toggle aria-controls="basic-navbar-nav"  id="my-navbar-icon" />
								<Navbar.Collapse id="basic-navbar-nav" className="myMenu" >
									<Nav className="ms-auto myLinks " >
										<LinkContainer to="report" onClick={()=>setActive(3)}>
											<Nav.Link  active={false} eventKey="1" >Do a Report
										</Nav.Link>
										</LinkContainer>
										<LinkContainer to="ratings" onClick={()=>setActive(2)} >
											<Nav.Link  active={false} eventKey="2" >View Ratings 
											</Nav.Link>
										</LinkContainer>
										<Nav.Link eventKey="3" 
											className={actionKnow}
											active={false} 
											onClick={()=>setActive(1)}
											id="navKnowLink">
											<NavHashLink smooth  
											to="/#know" 
											id="knowLink" 
											scroll={ScrollWithOffset}
											>Read more about Ramen
										  </NavHashLink>
									   </Nav.Link>
									   <NavDropdown
									   title="User account"
									   className="dropdown"
									   id="dropDownNav"
									   >
										  <UserInOut setActive={setActive} signedIn={userStatus}
											  />
									   </NavDropdown>
									</Nav>
								</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
				
			<main>
				<Outlet  context={setActive}/>
			</main>

			<Footer />
		</div>
	);
}
