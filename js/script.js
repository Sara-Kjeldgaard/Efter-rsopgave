//********* Map with marker *********//
mapboxgl.accessToken =
    "pk.eyJ1Ijoic2FyYXNrIiwiYSI6ImNrZnFrZWtxMDBrMWoycXBibW42NHFrN2UifQ.YL8ZTVShTqVg16OOHKkGCA";
var map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/sarask/ckg10ovfg0x7j19n3tq71q01q", // style URL
    center: [10.222314, 56.135315], // starting position [lng, lat]
    zoom: 12.5, // starting zoo:
    pitch: 35, //grader kortet vippes, gøres så kortet kan styles yderligere
    bearing: -20 //Kortet drejes, gøres så kortet kan styles yderligere
});

var marker = new mapboxgl.Marker().setLngLat([10.218764, 56.121074]).addTo(map);

//********* todays weather *********//

const token = "5af75fef93b71602a5c0b6046efd49c8"; // save your token in this variable
/*
        const aarhus = "https://api.openweathermap.org/data/2.5/weather?q=Aarhus,DK&appid=" 
            + token +
            "&units=metric";
*/

//We make the constant weatherNames where we define the danish names for the status that ja gets from the API
const weatherNames = {
    Drizzle: "Småregn",
    Mist: "tåge"
};
$(document).ready(function() {
    // We get the weather data
    fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=Aarhus,DK&lang=da&units=metric&appid=1450d6665d0d7ff0514b80256863ec6a"
    )
        //Fetching the data takes time. We only want to run the following code after we have fetched it. (Called a promise)
        .then(response => {
            return response.json();
        })
        .then(data => {
            // We work with JSON data here
            console.log(data); // This shows what's in the JSON

            /*We make a var where we try to look up our danish name in our weaterNames const. If this failes we use the default english name. (||=null (nothing) coallessing (take the first value if you can - if not take the second))*/
            var danishName =
                weatherNames[data.weather[0].main] || data.weather[0].main;

            //We put our weather data in to our html
            $("#weatherMain").text(danishName);
            $("#weatherTemp").text(data.main.temp);
            $("#weatherImg")
                .prop(
                    "src",
                    "http://openweathermap.org/img/w/" +
                        data.weather[0].icon +
                        ".png"
                )
                .prop("alt", "Vejret lige nu : " + "data.weather[0].main");
        })
        //If things does not work
        .catch(err => {
            // Do something for an error here
            console.log("There was an error ...");
        });
});
