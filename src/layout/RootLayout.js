import {NavLink, Outlet} from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
import {Container,Navbar, Nav} from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LinkContainer,IndexLinkContainer} from 'react-router-bootstrap';

import logo from '../img/ramenLogo.gif';
import './RootLayout.css';

import Footer from './Footer';

export default function RootLayout(){
	return(
		<div className="rootLayout">
			<header>
				<Navbar  expand="md" className="myNav" fixed="top">
					<Container fluid id="theHeader">
						<LinkContainer to="/">
							<Navbar.Brand >
								<div className="logo-title">
									<img src={logo} className="header-logo d-inline-block align-top" alt="logo" />
									<p className="header-title">TRR</p>
								</div>
							</Navbar.Brand>
						</LinkContainer>
						<Navbar.Toggle aria-controls="basic-navbar-nav"  className="my-navbar-icon" />
						<Navbar.Collapse id="basic-navbar-nav" className="myMenu ">
							<Nav className="ms-auto myLinks" >
								<LinkContainer to="/report" >
									<Nav.Link  >Do a Ramen Report
									</Nav.Link>
								</LinkContainer>
								<LinkContainer to="/ratings">
									<Nav.Link  >View Ramen Ratings
									</Nav.Link>
								</LinkContainer>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
