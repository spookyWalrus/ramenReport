// import {LinkContainer} from 'react-router-bootstrap';
import {  HashLink } from 'react-router-hash-link';
import { useOutletContext } from "react-router-dom";
import {ScrollWithOffset} from '../components/CheckNav';
import Button from 'react-bootstrap/Button';
// import './Report.css';

const ReportHeader = () => {
	const setActive = useOutletContext();
	return(
			<section className="reportIntro">
				<h1 className="reportHeading">Ramen Report
				</h1>
				<h5>It's the moment where you want to share your thoughts on the amazing bowl of Ramen you just ate. 
				<br/><br/>
				<i>But wait! What aspects would I rate for a bowl of Ramen? <br/>If you are unsure about what those aspects are, read up on more RAMEN KNOWLEDGE. </i>
				</h5>
				<div className="reportButtBlock">
						<HashLink smooth to="/#know" scroll={ScrollWithOffset} onClick={() =>{setActive(1)}}>
							<Button  variant="info" className="toKnow button" >Get more Ramen Knowledge</Button>
						</HashLink>
				</div>
			</section>
	)
}

export default ReportHeader;