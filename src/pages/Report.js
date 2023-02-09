import {LinkContainer} from 'react-router-bootstrap';
import {NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Report.css';

const Report = () => {
	return(
		<div className="reportBack">
			<div className="reportPage">
				<h1 className="reportHeading">Ramen Report
				</h1>
				<p className="lineBreak"></p>
				<h5>It's the moment where you want to share your thoughts on the amazing bowl of Ramen you just ate. But wait! How do I rate something that is as complex and varied as a bowl of Ramen? How can one bowl of Ramen compare to another when there are so many aspects to Ramen? If you are unsure about what those aspects are, read up on more RAMEN KNOWLEDGE. 
				</h5>
				<p className="lineBreak"></p>
				<div className="reportButtBlock">
					<LinkContainer to="/know">
						<Button  variant="info" className="toKnow button">Get more Ramen Knowledge</Button>
					</LinkContainer>
					<LinkContainer to="/report">
						<Button variant="info" className="toReport button">I got this, Do a Report now!</Button>
					</LinkContainer>
				</div>
			</div>
		</div>
	)
}

export default Report;