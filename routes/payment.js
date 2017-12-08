var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Eventx = require('../schema/event');
var User = require('../schema/user');
var Verify = require('./verify');
var Payment = require('../schema/payment');
var mongoose = require('mongoose');
var paytm = require('../config/paytm');
var eventURL = require('../config/eventURL');
var checksum = require('../checksum/checksum');
var poc = require('../config/authuser').poc;



var hostURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://plinth.mukuljain.me'
var paytmURL = 'https://pguat.paytm.com/oltp-web/processTransaction';
var id_tag = process.env.NODE_ENV === 'development' ? 'dev' : '2018';

router.get('/initiate',Verify.verifyOrdinaryUser, function(req, res) {
    var payment = new Payment();
  
    Payment.count({}, function(err, count){
        payment.event.eventName = 'mun';
        var order_id = "Plinth-" + payment.event.eventName + "-" + (count+1) + "-" + id_tag;
        payment.status = 'OPEN';
        payment.amount = 400;
        payment.date.createdAt = (new Date()).getTime();
        payment.orderId = order_id;
        payment.team = [];
        var team = {
            email          : 'lnmhacks@gmail.com',
            name           : 'Ayush',
            phoneNumber    : 9685748587,
            type           : 'accomodate',
            college        : 'lnmiit',
            year           : 3,
            city           : 'Jaipur',
            accommodation  : 'yes',
            resume         : 'no',
        };
        
        payment.team.push(team);
        payment.team.push(team);
        console.log(payment);
       

        payment.save(function(err) {
            if (err){
                console.log(err);
                return;
            }
            else{
                paramaters ={
                    REQUEST_TYPE     : "DEFAULT",
                    ORDER_ID         : order_id,
                    CUST_ID          : "plinth-" + payment.team[0].email,
                    TXN_AMOUNT       :  payment.amount,
                    CHANNEL_ID       :'WEB',
                    INDUSTRY_TYPE_ID : paytm.industryID,
                    MID              : paytm.mid,
                    WEBSITE          : paytm.website,
                    // MOBILE_NO        : result.phoneNumber,
                    // EMAIL            : result.email,
                    CALLBACK_URL     : hostURL + '/payment/response',
                    
                }
                console.log(paramaters);
    
                // Create an array having all required parameters for creating checksum.
                checksum.genchecksum(paramaters, paytm.key, function (err, result) {
                    console.log(result);
                    result['PAYTM_URL'] = paytmURL;
                    res.render('pgredirect.ejs',{ 'restdata' : result});
                });
            }
        });
    });
});

router.post('/response', Verify.verifyOrdinaryUser,function(req,res){
    var paramlist = req.body;
    console.log(paramlist);
   
});

module.exports = router;
