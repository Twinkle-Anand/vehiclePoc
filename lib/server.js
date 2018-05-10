var express=require('express');
var server = express();
var bodyParser = require('body-parser');
var  mongoose  = require("mongoose");
var session = require('express-session');


mongoose.connect("mongodb://vehicle:vehicle@ds117730.mlab.com:17730/vehicle_poc");
mongoose.set('debug', true);
var db = mongoose.connection;
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});


//use sessions for tracking logins
server.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



//requring routes
var userRoutes    = require("../routes/testusers");
server.use('/',userRoutes);



//Export the server object
module.exports=server;