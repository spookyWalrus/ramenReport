import './Footer.css';

const Footer = () =>{
	return(
				<footer className="footer">
					<nav className="pull-left">
						<ul className="list-unstyled">
							<li className="animated wow fadeInLeft " data-wow-delay="0s"><a href="#about" className="footLinks">About</a></li>
							<li className="animated wow fadeInLeft" data-wow-delay=".1s"><a href="#app_features" className="footLinks">Features</a></li>
							<li className="animated wow fadeInLeft" data-wow-delay=".2s"><a href="#testimonials" className="footLinks">Testimonials</a></li>
						</ul>
					</nav>
				</footer>
	)
}

export default Footer;