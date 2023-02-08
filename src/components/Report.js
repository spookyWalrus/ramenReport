import Button from 'react-bootstrap/Button';
import './Report.css';

const Report = () => {
	return(
		<div className="reportBack">
			<div className="reportPage">
				<h1 className="reportHeading">Ramen Report
				</h1>
				<p className="lineBreak"></p>
				<h5>It's the moment where you want to share your thoughts on the amazing bowl of Ramen you just ate. But wait! How do I rate something that is as complex and varied as a bowl of Ramen? How can one bowl of Ramen compare to another when there are so many aspects to Ramen? If you are unsure what those aspects are, read up on more RAMEN KNOWLEDGE. 
				</h5>
				<p className="lineBreak"></p>
				<h5>Scroll down to keep reading, and we'll give you a break down on how to do a Ramen Report.
				</h5>
				<p className="lineBreak"></p>

				<div className="reportButtBlock">
					<Button variant="info" className="toKnow button">Get more Ramen Knowledge</Button>
					<Button variant="info" className="toReport button">I got this, Skip to Report</Button>
				</div>
				<div className="reportHow">
					<h5>As there are so many types and aspects to Ramen, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</h5>
				</div>
			</div>
		</div>
	)
}

export default Report;