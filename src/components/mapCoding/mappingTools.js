import { Loader } from "@googlemaps/js-api-loader";

let YOUR_API_KEY = process.env.REACT_APP_MAPS_KEY;

//========= set up googlemaps api services =========
async function setMapServices() {
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
