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
                    // MOBILE_NO        : result.phoneNumber,
                    // EMAIL            : result.email,
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
                        details : result,
                    })
                }


                /* result.save(function(err2) {
                    if (err2){
                        console.log(err2);
                        return;
                    } else {
                        User.findOne({'email' : result.team[0].email}, function(err3, user){
                            user.events.push(result);
                            user.save(function(err4) {
                               
                                if (err4){
                                    console.log(err4);
                                    return;
                                } else {
                                    res.redirect('/');
                                   /*  res.render('paystatus', {
                                        "page": 'paystatus',
                                        isLoggedIn: true,
                                        user: user
                                    }); 
                                    
                                }

                            });
                        });
                    }
                
                });


                if(paramlist.STATUS === "OPEN"){
                    res.render('payment_open',{
                        amount   : doc.payment.amount,
                        order_id : doc.payment.order_id,
                        eventName : doc.eventName
                    })
                }
                else if(paramlist.STATUS === 'TXN_SUCCESS'){
                    doc ={
                        team : [
                            {
                                name : result.name,
                                email : result.email,
                                phoneNumber : result.phoneNumber,
                            }
                        ],
                        payment :{
                            order_id : result.order_id,
                            date : paramlist.TXNDATE,
                            amount : paramlist.TXNAMOUNT,
                        },
                        eventName : "MUN 2017"
                    }
                    res.render('payment_succeed',{
                        details : doc,
                        backURL : "/mun"
                    })
                }
                else{
                    res.render('payment_failed', {
                        clubName : "",
                        backURL : "/mun/pay",
                    });
                } */
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
            details : 'none',
        });
    }
   
});

module.exports = router;
