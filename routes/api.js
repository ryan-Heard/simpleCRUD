/**
 * Created by ryan on 10/26/2015.
 */
var express = require('express');
var router = express.Router();
var People = require('../models/people');
var mongoose =  require('mongoose');
var findPeople = mongoose.model('people', People);

People.methods(['get','put','post','delete']);
People.register(router,'/directory');


router.get('/directory/all', function(req, res) {
  findPeople.find({})
    .sort({lastName: 1, firstName: 1})
    .exec(function(err,data){
      if(err){
        res.send(err)
      }else{
        res.json(data);
      }
    });
});

router.get('/search/:keywords', function(req, res) {
  var query = req.params.keywords;
  findPeople.find({firstName: query},function(err,found){
    if(err){
      res.send(err)
    }else{
      res.json(found);
    }
  });

});

router.get('/find/:keywords', function(req,res){
  var query = req.params.keywords;
  var prepQuery = query.split(' ');
  var keyWords = [];
  var keyNums = []

  prepQuery.forEach(function(word){
    if(! isNaN(parseFloat(word))){
      keyNums.push(parseFloat(word));
    }else{
      keyWords.push(word);
    }
  });

    findPeople.find({$or:[{firstName:{$in: keyWords}},
      {lastName: {$in: keyWords}},{city: {$in: keyWords}},{zipCode: {$in: keyNums}}]})
      .sort({lastName: 1, firstName: 1})
      .exec(function(err,data){
        if(err){
          res.send(err)
        }else{
          res.json(data);
        }
    });
});

// Return router
module.exports = router;