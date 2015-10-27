/**
 * Created by ryan on 10/26/2015.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('roladex', { title: 'Directory' });
});

module.exports = router;