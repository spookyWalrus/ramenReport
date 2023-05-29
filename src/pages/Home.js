import {LinkContainer} from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';

import Know from  '../components/Know';
import '../pages/Home.css';


const Home = () =>{
	return(
		<div>
			<div className="bannerBack" id="home">
				<div className="banner">
					<p className="bannerHeading">The Ramen Report</p>
					<h3>Where you can rate and review the amazing bowl of ramen you've eaten.
					</h3>
					<LinkContainer to="/report">
						<Button variant="info" className="button" id="toReport">Make a Report now</Button>
					</LinkContainer>
					<p className="lineBreak"></p>
					<h3>Find which bowl of Ramen ranks highest in your area and where you can find this tasty meal.
					</h3>
					<p className="lineBreak"></p>
					<LinkContainer to="/ratings">
						<Button variant="info" className="button toKnow">Find me the tastiest bowl</Button>
					</LinkContainer>
					{/*<div className="reportButtBlock">
						<LinkContainer to="/ratings">
							<Button variant="info" className="button toKnow">Find me the tastiest bowl</Button>
						</LinkContainer>
						<LinkContainer to="/report">
							<Button variant="info" className="button" id="toReport">Make a Report now</Button>
						</LinkContainer>
					</div>*/}
				</div>
			</div>

			<Know />

		</div>
	)
}

export default Home;