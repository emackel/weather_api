const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

// Create Express Server
const app = express();
const startDate = "2022-01-01"
const endDate = "2022-05-01"

const lat = 51.58
const lon = 7.38

// Configuration
const PORT = 3000;
const HOST = "localhost";
const { API_BASE_URL } = process.env;
const API_SERVICE_URL = `${API_BASE_URL}?date=${startDate}&?last_date=${endDate}&?lat=${lat}&?lon=${lon}`;

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
})
