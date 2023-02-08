import '../components/Descript.css';
import Button from 'react-bootstrap/Button';

const Descript = () =>{
	return(
		<div>
			<div className="bannerBack">
				<div className="banner">
					<h1 className="bannerHeading">The Ramen Report</h1>
					<p>Where you can rate and review the amazing bowl of ramen you've eaten.
					</p>
					<p className="lineBreak"></p>
					<p>What's better is that you can see which bowl ranks highest and where you can find the tastiest bowl of ramen in your area.
					</p>
					<div className="reportButtBlock">
						<Button variant="info" className="toKnow button">Find me the tastiest bowl</Button>
						<Button variant="info" className="toReport button">Make a Report now</Button>
					</div>
				</div>
			</div>
			<div className="descriptBack">
				<div className="introPage">
					<h1 className="introHeading">What is Ramen?</h1>
					<p>Describe general elements, then describe the elements in detail.
					</p>
					<p className="lineBreak"></p>
					<p>There's the noodles, soup, tare, toppings
					</p>
					<p className="lineBreak"></p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et pharetra pharetra massa massa ultricies mi quis. Porta non pulvinar neque laoreet suspendisse interdum. Gravida cum sociis natoque penatibus. Eget mauris pharetra et ultrices. Quam pellentesque nec nam aliquam sem. Nisi scelerisque eu ultrices vitae auctor eu augue ut. In nibh mauris cursus mattis molestie. Aenean sed adipiscing diam donec adipiscing. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Convallis posuere morbi leo urna molestie at. Et odio pellentesque diam volutpat commodo sed egestas. Sit amet consectetur adipiscing elit pellentesque habitant morbi. Montes nascetur ridiculus mus mauris.
					<p className="lineBreak"></p>
						Fringilla est ullamcorper eget nulla facilisi etiam dignissim. Bibendum neque egestas congue quisque egestas diam in arcu cursus. Pretium aenean pharetra magna ac. Lobortis elementum nibh tellus molestie nunc non blandit. Est placerat in egestas erat imperdiet sed euismod nisi porta. Gravida cum sociis natoque penatibus et magnis. Sed viverra ipsum nunc aliquet bibendum enim facilisis. Nam libero justo laoreet sit amet cursus sit. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Amet purus gravida quis blandit.
					<p className="lineBreak"></p>
						Amet consectetur adipiscing elit duis tristique. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Suspendisse in est ante in nibh mauris cursus mattis molestie. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Sed euismod nisi porta lorem mollis aliquam ut porttitor. Ornare arcu odio ut sem. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc. Donec pretium vulputate sapien nec sagittis. Dolor sit amet consectetur adipiscing elit duis. Felis eget velit aliquet sagittis id consectetur purus ut faucibus. Purus sit amet luctus venenatis lectus magna. Pulvinar pellentesque habitant morbi tristique senectus. Rutrum quisque non tellus orci ac auctor augue. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Nisi porta lorem mollis aliquam ut porttitor leo a diam.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Descript;