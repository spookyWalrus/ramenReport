// import ramenPlaces from '../json/ramenPlaces.json';
// import ramenPlaces from '../json/restoFile.json';
// import restoFile from '../json/restoFile.json';
// import restoFile from './restoFile-12k.json';

// console.log(ramenPlaces.features[0].geometry.cocordinates)
// console.log(restoFile);
let obj = restoFile.array;
// console.log(obj)
let nuPlaces=[];
let places = [];
let places = obj.map((item,i) =>{
	let place = {};
		place['longlat'] = item.geometry.coordinates;
		place.URL = item.properties["Google Maps URL"];
		place.address = item.properties.Location.Address;
		place.resto = item.properties.Location["Business Name"];
		place.website = item.properties.website;
		// nuPlaces.push(place);
		return place;
})


// console.log(places);
let remapData = places.map((obj,i) =>{
	for(let k in obj){
		if(obj.hasOwnProperty(k)){
			let addArray;
			let info = obj[k]; // a single entry as object
			if(k === 'address'){ // remove front space, separate postal code and province from address
				// console.log(info)
				addArray = info.split(','); //turn address into array
				let postal; //save extracted postal code
				let splitadd = addArray.map((item,i) =>{ //make new array with separated address,city,postalcode,province,country
					if(i === 0 ){
						// console.log('address: ',item);
						return item.trimStart();
					}
					else if(i === 1){
						// console.log('vity: ',item);
						return item.trimStart();
					}else if(i === 2){
						let prPostal = item.trimStart().split(' ');
						// console.log('province: ',prPostal[0]);
						postal = (prPostal[1]+' '+prPostal[2]);
						// console.log('province is: ',prPostal[0])
							let province;
							if(prPostal[0].length > 3){
								switch(prPostal[0]){
									case 'Quebec':
										province = 'QC';
										break;
									case 'Ontario':
										province = 'ON';
										break;
									case 'Alberta':
										province = 'AB';
										break;
									case 'British Columbia':
										province = 'BC';
										break;
									case 'Manitoba':
										province = 'MB';
										break;
									case 'New Brunswick':
										province = 'NB';
										break;
									case 'Newfoundland':
										province = 'NL';
										break;
									case 'Northwest Territories':
										province = 'NT';
										break;
									case 'Nova Scotia':
										province = 'NS';
										break;
									case 'Nunavut':
										province = 'NU';
										break;
									case 'Prince Edward Island':
										province = 'PE';
										break;
									case 'Saskatchewan':
										province = 'SK';
										break;
									case 'Yukon':
										province = 'YT';
										break;
								}
							}else{
								province = prPostal[0];
							}
							return province;
					}else if(i === 3){
						// console.log('country : ',item);
						return item.trimStart(); //return city or country
					}
				})
				splitadd.push(postal);
				obj.address = splitadd[0];
				obj.city = splitadd[1];
				obj.postalcode = splitadd[4];
				obj.province = splitadd[2];
				obj.country = splitadd[3];
			}
		}
	}
	// console.log('obj ',obj);
	return obj;
})
// console.log(remapData);

// let response;
function theResponse(status){ // error call back function
   if(status === true){
	  	console.log(status,' looping again');
	  	num++;
	  	loopData(num);
   }else{
	  	return console.log('Error the status: ',status);
   }
}

let num=0;
let data;
export default function loopData(num){
	console.log('num is at: ',num);
	console.log('data is: ',obj);

	if(num>0 && num<remapData.length){
   	data = remapData[num];
		console.log('num incremented to: ',num);
   	intoDB(data);
	}else if(num === 0){
		console.log('num starts: ',num);
   	data = remapData[0];
   	intoDB(data);
	}
}

// fetch call to enter into server
function intoDB(data){ 
	console.log(data);
	return theResponse(true);
}

function intoDBB(data) { 
		fetch('http://localhost:3000/json2db',
		  {  method: 'post',
		    headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify({
		    	resto: data.resto,
	      	postal: data.postalcode,
	      	address: data.address,
	      	city: data.city,
	      	province: data.province,
	      	country: data.country,
	      	googleurl: data.URL,
	      	// long: data.longlat[0],
	      	// lat: data.longlat[1],
	      	website: data.website
		    })
		  })
		  .then(res => {
		      if(res.ok){ // check for succesful credentials
		        return theResponse(true);
		      }
		      throw new theResponse(res.status);
		  })
		  .catch((error) => {
		      console.log(error);
		      // return response = {error: 'Logging error'};
		  });
}

loopData(0);
