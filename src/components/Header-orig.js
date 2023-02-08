import logo from './ramenLogo.gif';
import '../components/Header.css';
import {Button,Nav} from 'react-bootstrap';

const Header = (props) =>{
	return(
		<div className="App-header">
         <header className="theHeader">
            <div className="logo-title">
               <img src={logo} className="header-logo" alt="logo" />
               <h1 className="header-title">The Ramen Report</h1>
            </div>
            <nav className="navbar">
               {/*<a
               className="react-link navLinks"
               href="https://reactjs.org"
               target="_blank"
               rel="noopener noreferrer"
               >
                  Learn React
               </a>*/}
               <a className="rating navLinks" href="#" target="_blank" rel="noopener noreferrer">
                  View Ratings
               </a>
               <a className="report navLinks" href="" target="_blank" rel="noopener noreferrer">
                  Make a Report
               </a>
               <a className="about navLinks" href="#" target="_blank" rel="noopener noreferrer">
                  About
               </a>
            </nav>


         </header>
      </div>
	)
}

export default Header;