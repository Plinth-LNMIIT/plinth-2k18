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



var hostURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://plinth.mukuljain.me';
var paytmURL =  process.env.NODE_ENV === 'development' ? 'https://pguat.paytm.com/oltp-web/processTransaction' : 'https://secure.paytm.in/oltp-web/processTransaction';
var id_tag = process.env.NODE_ENV === 'development' ? 'dev' : '2018';

router.get('/initiate',Verify.verifyOrdinaryUser, function(req, res) {
    var payment = new Payment();
  
    Payment.count({}, function(err, count){
        payment.event.eventName = 'mun';
        var order_id = "Plinth-" + payment.event.eventName + "-" + (count+1) + "-" + id_tag;
        payment.status = 'OPEN';
        payment.amount = 1;
        payment.date.createdAt = ''+ new Date();
        payment.orderId = order_id;
        payment.team = [];
        var team = {
            email          : 'shubham.mangal15@gmail.com',
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
                    CALLBACK_URL     : hostURL + '/payment/response',
                    
                }
                console.log(paramaters);
    
                // Create an array having all required parameters for creating checksum.
                checksum.genchecksum(paramaters, paytm.key, function (err, result) {
                    console.log(result);
                    result['PAYTM_URL'] = paytmURL;
                    res.render('pgredirect',{ 'restdata' : result});
                });
            }
        });
    });
});

router.post('/response', Verify.verifyOrdinaryUser,function(req,res){
    var isLoggedIn;
    var user;
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, data) {
            
            isLoggedIn = data.valid;
            user = data; 
        });
    }
    var paramlist = req.body;
    if(checksum.verifychecksum(paramlist, paytm.key)){
        Payment.findOneAndUpdate({'orderId' : paramlist.ORDERID},{$set : {'status' : paramlist.STATUS, 'tranId' : paramlist.TXNID, 'date.paidAt' :  ''+ new Date() }}, {'new': true} ,function(err1, result){
            if(err1){
                console.log(err1)
                return;
            }
            else{


                if(paramlist.STATUS === "TXN_FAILURE"){
                    res.render('paystatus', {
                        "page" : 'paystatus',
                        "isLoggedIn" : isLoggedIn,
                        "user" : {
                            name : user.name,
                            gender : user.gender,
                        },
                        "status": 'fail',
                        details : result,
                    })
                    return;
                }

                if(paramlist.STATUS === "TXN_SUCCESS"){
                    var emails = [];
                    for(var i=0; i<result.team.length; i++ ){
                        emails.push(result.team[i].email);
                    }

                    var bulk = User.collection.initializeOrderedBulkOp();
                    for(var i=0; i < emails.length; i++){
                        bulk.find({'email': emails[i]}).update({$push: {events: result}});
                    }
                    bulk.execute();

                    res.render('paystatus', {
                        "page" : 'paystatus',
                        "isLoggedIn" : isLoggedIn,
                        "user" : {
                            name : user.name,
                            gender : user.gender,
                        },
                        "status": 'success',
                        details : result,
                    });
                }
                else{
                    res.render('paystatus', {
                        "page" : 'paystatus',
                        "isLoggedIn" : isLoggedIn,
                        "user" : {
                            name : user.name,
                            gender : user.gender,
                        },
                        "status": 'open',
                        details : result,
                    })
                }

            }
        });
    }
    else{
        res.render('paystatus', {
            "page" : 'paystatus',
            "isLoggedIn" : isLoggedIn,
            "user" : {
                name : user.name,
                gender : user.gender,
            },
            "status": 'fail',
            details : 'none',
        });
    }
   
});

module.exports = router;
