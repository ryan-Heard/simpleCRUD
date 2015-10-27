/**
 * Created by ryan on 10/26/2015.
 */
var express = require('express');
var router = express.Router();
var People = require('../models/people');

People.methods(['get','put','post','delete']);
People.register(router,'/directory');


router.get('/directory', function(req, res, next) {
  res.send('respond with a sd');
});
// Return router
module.exports = router;