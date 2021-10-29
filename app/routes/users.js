var express = require('express');
var router = express.Router();

let users = [{
    nom : "Mathis",
    id : 0
}];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({users});
});

module.exports = router;
