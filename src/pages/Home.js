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
					<p className="lineBreak"></p>
					<h4>You can also see which bowl ranks highest in your area and where you can find this tasty meal.
					</h4>
					<p className="lineBreak"></p>
					<div className="reportButtBlock">
						<LinkContainer to="/ratings">
							<Button variant="info" className="toKnow button">Find me the tastiest bowl</Button>
						</LinkContainer>
						<LinkContainer to="/report">
							<Button variant="info" className="toReport button">Make a Report now</Button>
						</LinkContainer>
					</div>
				</div>
			</div>

			<Know />

		</div>
	)
}

export default Home;