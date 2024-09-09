// import { useContext } from "react";
import { Loader } from "@googlemaps/js-api-loader";
// const { contextProps } = useContext(DataContext);
// const { signedIn, setSignedIn } = contextProps.signed;

// let signedIn = true;

let YOUR_API_KEY = process.env.REACT_APP_MAPS_KEY;

//========= set up googlemaps api services =========
export async function setMapServices() {
  const loader = new Loader({
    apiKey: YOUR_API_KEY,
    libraries: ["places", "marker"],
  });
  await loader.load();
  let placeService = new window.google.maps.places.PlacesService(
    document.createElement("div")
  );
  return placeService;
}

// ===== google api call to search for restos =====
export async function getRatings(cityCoords) {
  let theMap = await setMapServices();

  return new Promise((resolve, reject) => {
    let request = {
      location: new window.google.maps.Circle(cityCoords),
      query: "ramen",
    };
    theMap.textSearch(request, (results, status) => {
      if (status === "OK") {
        resolve(results);
      } else {
        console.log("maps api call unsuccesful");
        reject("googlemaps unsuccesful");
      }
    });
  });
}

// ====== reverse geocoding based on lng/lat coordinates
async function revGeoCoder(coordinates) {
  const latlng = {
    lat: parseFloat(coordinates.lat),
    lng: parseFloat(coordinates.lng),
  };
  const geocoder = new window.google.maps.Geocoder();
  return new Promise(function (resolve, reject) {
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        const address = results[0].address_components[2].long_name;
        console.log("user location as city: ", address);
        resolve(address);
      } else {
        console.log("rev geocoding failed: ", status);
        reject(status);
      }
    });
  });
}

// =========== check if cityWide or nearby search + check if user is logged in   ====
export async function checkCityWide(signedIn) {
  if (signedIn) {
    if (checkAccess()) {
      try {
        let userDetails = await getUser();
        return userDetails;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("access denied");
      return null;
    }
  } else {
    alert("Please log in to get ratings");
    return null;
  }
}

// =====  check if already has denied permission to locate user
let access;
function checkAccess() {
  if (access === "denied") {
    alert(
      "You already denied giving your location. Refresh page and click again to accept location access."
    );
    return false;
  } else {
    access = true;
    return true;
  }
}

//======  get geolocation of user =======
async function getUser() {
  let userPosition = {};
  return new Promise(function (resolve, reject) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  })
    .then((response) => {
      let geoloc = {
        lat: response.coords.latitude,
        lng: response.coords.longitude,
      };
      return geoloc;
    })
    .then((geoloc) => {
      userPosition = { radius: 500, lat: geoloc.lat, lng: geoloc.lng };
      return userPosition;
    })
    .then(async (circlePos) => {
      let userCity = await revGeoCoder(circlePos);
      console.log("userCity is: ", userCity);
      userPosition.city = userCity;
      return userPosition;
    })
    .catch((error) => {
      console.log("error is: ", error);
      if (error.code === error.PERMISSION_DENIED) {
        access = "denied";
        console.log("denied getting user position");
        return false;
      } else {
        console.log("Error getting user position");
      }
      throw error;
    });
}

// ======= city coordinates + radius search to populate resto menu ==========
let userCity;
export function whichCity(selection) {
  let city = selection;
  if (selection) {
    city = selection.target.value;
  }

  switch (city) {
    case "Montreal":
      userCity = {
        radius: 200,
        lat: 45.5041905839693,
        lng: -73.57431928743786,
        city: city,
      };
      break;
    case "Toronto":
      userCity = {
        radius: 200,
        lat: 43.655739842049236,
        lng: -79.38374061036242,
        city: city,
      };
      break;
    case "Vancouver":
      userCity = {
        radius: 200,
        lat: 49.280956827935505,
        lng: -123.12243738369997,
        city: city,
      };
      break;
    case "Ottawa":
      userCity = {
        radius: 200,
        lat: 45.41982910818854,
        lng: -75.70019586916331,
        city: city,
      };
      break;
    default:
      userCity = {
        radius: 200,
        lat: 45.5041905839693,
        lng: -73.57431928743786,
        city: city,
      }; //default is Montreal
  }
  console.log("city is: ", city);
  return userCity;
}

// === change title depending report or rating page =====
export function menuLabels(path) {
  let searchTitle, restoComm, listComm;
  let labels = {};
  if (path === "/report") {
    searchTitle = "Select your restaurant";
    restoComm =
      "By clicking below, the app will access your location data to give you a list of restaurants nearest to you";
    listComm =
      "If you would rather not give your location data, choose your city and find your restaurant in the list";
  } else {
    searchTitle = "Retrieve ratings based on location";
    restoComm = "Within 200m";
    listComm = "Within 10km of downtown";
  }
  labels["search"] = searchTitle;
  labels["resto"] = restoComm;
  labels["list"] = listComm;
  return labels;
}
