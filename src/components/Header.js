import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/ramenLogo.gif';
import '../components/Header.css';

const Header = (props) =>{
  return (
    <Navbar  expand="md" className="myNav" fixed="top">
      <Container fluid id="theHeader">
        <Navbar.Brand href="#home">
          <div className="logo-title">
               <img src={logo} className="header-logo d-inline-block align-top" alt="logo" />
               <p className="header-title">TRR</p>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  className="my-navbar-icon" />
        <Navbar.Collapse id="basic-navbar-nav" className="myMenu ">
          <Nav className="ms-auto myLinks">
            <Nav.Link className="myLinks" href="#review">Do a Ramen Report</Nav.Link>
            <Nav.Link className="myLinks" href="#ratings">View Ramen Ratings</Nav.Link>
            <Nav.Link className="myLinks" href="#ratings">Read Ramen Knowledge</Nav.Link>
            <Nav.Link className="myLinks" href="#about">About</Nav.Link>
         </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
