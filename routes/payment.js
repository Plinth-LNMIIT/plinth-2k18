var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Eventx = require('../schema/event');
var User = require('../schema/user');
var Verify = require('./verify');
var PaymentDB = require('../schema/payment');
var mongoose = require('mongoose');
var paytm = require('../config/paytm');
var eventURL = require('../config/eventURL');
var checksum = require('../checksum/checksum');
var poc = require('../config/authuser').poc;



var hostURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://plinth.mukuljain.me'
var paytmURL = 'https://pguat.paytm.com/oltp-web/processTransaction';

router.post('/payment', function(req, res) {
    var paymentdb = new Payment();
    console.log(req);
});

router.post('/response', Verify.verifyOrdinaryUser,function(req,res){
    var paramlist = req.body;
    console.log(paramlist);
   
});

module.exports = router;
