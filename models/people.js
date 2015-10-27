/**
 * Created by ryan on 10/26/2015.
 */
var restful = require('node-restful');
var mongoose= restful.mongoose;


var personSchema = new mongoose.Schema({
  city: String,
  firstName: String,
  lastName: String,
  zipCode: Number,
  id: Number
});

module.exports = restful.model('people', personSchema);
