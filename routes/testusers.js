var express = require('express');
var router = express.Router();

//Allows routes to be broken down into modular chunks
var handlers = require('../lib/handlers');

router.route('')
.get(handlers.index)

router.route('/account/create')
.get(handlers.accountCreate)
 
router.route('/session/create')
.get(handlers.sessionCreate)

router.route('/session/deleted')
.get(handlers.sessionDeleted)

router.route('/home')
.get(handlers.home)

router.route('/home/add')
.get(handlers.homeAdd)

router.route('/home/trans')
.get(handlers.homeTrans)

router.route('/public/*')
.get(handlers.public)

router.route('/api/users/')
.all(handlers.users)

router.route('/api/add/')
.post(handlers.add)

router.route('/api/transfer/')
.post(handlers.transfer)

router.route('/api/sale/')
.post(handlers.sales)

router.route('/api/register/')
.post(handlers.register)

router.route('/api/insurance/')
.post(handlers.insurance)

router.route('/api/mortgage/')
.post(handlers.mortgage)

router.route('/api/transaction/')
.get(handlers.allTransaction)

router.route('/api/search/')
.get(handlers.search)

router.route('/api/info/')
.get(handlers.info)

router.route('/api/token/')
.all(handlers.tokens)



module.exports = router;

