var express = require('express');
const _ = require('lodash');
var router = express.Router();
const axios = require('axios');

// Create RAW data array
let films = [{
    movie : "Men In Black",
    id: "0",
    yearOfRelease : 1997,
    duration : 98,
    actors : ["Will Smith", "Tommy Lee Jones"],
    boxOffice : 20000000,
    rottenTomatoesScore : 8.4
  }
];

/* GET movie page. */
router.get('/', function(req, res, next) {
  res.status(200).json({films});

  axios.get('http://www.omdbapi.com/?t=inception&apikey=f08b51d2  ')
    .then(({data}) => {
      
      const {imdbID} = data;
      const {Title} = data;
      const {Released} = data;
      res.status(200).json({id : imdbID,
                            film : Title,
                            yearOfRelease : Released
                          });
    })
    .catch(() => {res.status(200).json({message : error});})

  /*axios.get('https://www.balldontlie.io/api/v1/players/237')
    .then(({data}) => {
      
      const {first_name} = data;
      const {weight_pounds} = data;
      res.status(200).json({prenom : first_name,
                            poids : weight_pounds
                          });
    })
    .catch(() => {res.status(200).json({message : error});})*/
  
});
  
  /* GET one user. */
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Find user in DB
    const film = _.find(films, ["id", id]);
    // Return user
    if (film != null){
      res.status(200).json({
        message: 'User found!',
        film
      });
    }
    else{
      res.status(200).json({
        message: 'Not found!'
      });
    }
    
  });
  
  /* PUT new user. */
  router.put('/', (req, res) => {
    // Get the data from request from request
    const { movie } = req.body;
    const { yearOfRelease } = req.body;
    const { duration } = req.body;
    const { actors } = req.body;
    const { boxOffice } = req.body;
    const { rottenTomatoesScore } = req.body;
    // Create new unique id
    const id = _.uniqueId();
    // Insert it in array (normaly with connect the data with the database)
    films.push({ movie, id, yearOfRelease, duration, actors, boxOffice, rottenTomatoesScore });
    // Return message
    res.json({
      message: `Just added ${id}`,
      film: { movie, id }
    });
  });
  
  /* DELETE user. */
  router.delete('/:id', (req, res) => {
    // Get the :id of the user we want to delete from the params of the request
    const { id } = req.params;
  
    // Remove from "DB"
    _.remove(films, ["id", id]);
  
    // Return message
    res.json({
      message: `Just removed ${id}`
    });
  });
  
  /* UPDATE user. */
  router.post('/:id', (req, res) => {
    // Get the :id of the user we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the user we want to update from the body of the request
    const { nom } = req.body;
    // Find in DB
    const userToUpdate = _.find(films, ["id", id]);
    // Update data with new data (js is by address)
    userToUpdate.nom = nom;
  
    // Return message
    res.json({
      message: `Just updated ${id} with ${nom}`
    });
  });

module.exports = router;
