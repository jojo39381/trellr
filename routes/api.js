const router = require('express').Router();
let axios = require('axios');
router.route('/weather').get((req, res) => {
    console.log("success")
    axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA-bhkcpYuV5V8r-HtcQq6tE0saL-j93ko")
    .then(response => {
        axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + response.data.location.lat + "&lon=" + response.data.location.lng + "&units=imperial&exclude=minutely,hourly,daily&appid=da9df0aa55c4c2692212c2669fa3e530")
        .then(response => {
            const weather = {
              temp:response.data.current.temp,
              weather:response.data.current.weather[0].main
              
            }
            
            res.json(weather)
            
        })
        
    })
  })

  module.exports = router;