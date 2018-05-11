var express = require('express');
var router = express.Router();

//Allows routes to be broken down into modular chunks
var handlers = require('../lib/handlers');

router.route('/users')
.all(handlers.users)

router.route('/add')
.post(handlers.add)

router.route('/transfer')
.post(handlers.transfer)

router.route('/sale')
.post(handlers.sales)

router.route('/register')
.post(handlers.register)

router.route('/insurance')
.post(handlers.insurance)

router.route('/mortgage')
.post(handlers.mortgage)

router.route('/trans')
.get(handlers.allTransaction)

router.route('/search')
.get(handlers.search)

router.route('/info')
.get(handlers.info)

module.exports = router;

