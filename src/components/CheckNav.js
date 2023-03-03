// import { useLocation} from 'react-router-dom';

// const SetClass = ({active}) => {
// 	let actionKnow,actionHome;
	
// 		if(active === 1){ // know link clicked
// 			actionKnow = 'knowActive';
// 			actionHome = ''
// 		}else if (active === 0){ // home link clicked
// 			actionKnow = '';
// 			actionHome = 'homeActive';

// 		}else if (active > 1){ // other links clicked
// 			actionKnow = '';
// 			actionHome = '';
// 		}
// 	}

const ScrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -40; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
    
}


export { ScrollWithOffset};