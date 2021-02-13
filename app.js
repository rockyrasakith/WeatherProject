import config

const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + config.apiKey + "&units=" + units;

    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            console.log(temp);
            const des = weatherData.weather[0].description;
            console.log("currently " + des);
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
            res.write("<p>The weather is currently " + des + "</p>");
            res.write("<img src=" + imgURL + ">");
            res.send(); 
        })
    })
})




app.listen(port, function() {
    console.log("App listening on port " + port);
});