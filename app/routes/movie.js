var express = require('express');
const _ = require('lodash');
var router = express.Router();

// Create RAW data array
let films = [{
    nom : "Men In Black",
    id: "0"
  },
  {
    nom : "Spidder man",
    id: "1"
  },
  {
    nom : "Star Wars",
    id: "2"
  },
  {
    nom : "Harry Potter",
    id: "3"
  }
];

/* GET movie page. */
router.get('/', function(req, res, next) {
  res.status(200).json({films});
});
  
  /* GET one user. */
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Find user in DB
    const film = _.find(films, ["id", id]);
    // Return user
    res.status(200).json({
      message: 'User found!',
      film
    });
  });
  
  /* PUT new user. */
  router.put('/', (req, res) => {
    // Get the data from request from request
    const { nom } = req.body;
    // Create new unique id
    const id = _.uniqueId();
    // Insert it in array (normaly with connect the data with the database)
    films.push({ nom, id });
    // Return message
    res.json({
      message: `Just added ${id}`,
      nom: { nom, id }
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
