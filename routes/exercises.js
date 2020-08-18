const router = require('express').Router();
let Exercise = require('../models/exercise.model');
import axios from 'axios';
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const id = req.body.id;
  const category = req.body.category;
  const tasks = req.body.tasks;
  

  const newExercise = new Exercise({
    id,
    category,
    tasks
   
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
 
  Exercise.findOneAndUpdate({id: req.params.id}, {tasks : req.body.tasks},function(err, PC) {
    if (err) {
      console.log('ERROR WHILE PUT PC');
        throw (err);
    } else {
        console.log('Succes set');
        res.status(200).send(PC)
    }
})







router.route('/weather').post((req, res) => {
 
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



    // .then(exercise => {
    //   console.log(exercise)
    //   exercise.tasks = req.body.tasks;


    //   exercise.save()
    //     .then(() => res.json('Exercise updated!'))
    //     .catch(err => res.status(400).json('Error: ' + err));
    // })
    // .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;