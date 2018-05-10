var express = require('express');
var router = express.Router();

//Allows routes to be broken down into modular chunks
var handlers = require('../lib/handlers');

router.route('/users')
.all(handlers.users)

module.exports = router;

