import './Footer.css';

const Footer = () =>{
	return(
		<div className="footer">
				<nav class="pull-left">
					<ul class="list-unstyled">
						<li class="animated wow fadeInLeft " data-wow-delay="0s"><a href="#about" className="footLinks">About</a></li>
						<li class="animated wow fadeInLeft" data-wow-delay=".1s"><a href="#app_features" className="footLinks">Features</a></li>
						<li class="animated wow fadeInLeft" data-wow-delay=".2s"><a href="#testimonials" className="footLinks">Testimonials</a></li>
					</ul>
				</nav>
		</div>
	)
}

export default Footer;