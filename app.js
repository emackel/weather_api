const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const { createProxyMiddleware } = require("http-proxy-middleware");
const { request } = require("express");
require("dotenv").config();

// Create Express Server
const app = express();


// Configuration
const PORT = 3000;
const HOST = "localhost";
const { API_BASE_URL } = process.env;

// Logging the requests
app.use(morgan("dev"));

// using cors
app.use(cors());

// Proxy Logic : Proxy endpoints
app.use(
    "/weather",
    createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/weather": "",
        },
    })
);

// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});


// sending geocoding request

app.get('/', (req, res) => {
    let geoCodingRequest = request(`http://mapquestapi.com/geocoding/v1/address?key=${process.env.GEO_CODING_KEY}&location=${location}`, function (error, response, body) {
        if (error) {
            console.log('error', { error })
        }

        let jsonResponse = JSON.parse(body)
        latLngCoords = (jsonResponse.results[0].locations[0].latLng)
    })

    // sending coordinates and date information to weather API
    const startDate = "2022-01-01"
    const endDate = "2022-05-01"
    const API_SERVICE_URL = `${API_BASE_URL}?date=${startDate}&?last_date=${endDate}&?lat=${lat}&?lon=${lon}`;

    request(`${API_SERVICE_URL}`, function (error, response, body) {
        console.log('error');
        console.log('statusCode: ', response && response.statusCode);
        console.log('body: ', body);
    })

    // process information and return result - some psuedo code

    // if(windspeed < 30 kmh, temp > 20 && temp < 30 && sunshine = maximal && precipitation = minimal ) {
    // console.log('The best location for the picnic is: locationOfPicnic');  
    //}
})
