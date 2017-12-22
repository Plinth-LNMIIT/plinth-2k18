var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../schema/user');
var Verify = require('./verify');
var Utils = require('./utils');
var Payment = require('../schema/payment');
var paytm = require('../config/paytm');
var checksum = require('../checksum/checksum');



var hostURL = process.env.HOST_URL;
var id_tag = process.env.NODE_ENV === 'development' ? 'dev' : '2018';



router.post('/register/:payName', Verify.verifyOrdinaryUser, function (req, res) {

    var payment = new Payment();
    var payName = req.params.payName;
   
    if (payName != '') {
        Payment.count({}, function (err, count) {
            var param_data = JSON.parse(req.body.postData);
            console.log(param_data);
            payment.event.eventName = param_data.eventName;
            payment.email = param_data.mEmail;
            payment.status = 'OPEN';
            payment.date.createdAt = '' + new Date();
            payment.team = [];
            var teams = [];
            var order_id = "Plinth-" + payName + "-" + (count + 1) + "-" + id_tag;
            payment.orderId = order_id;
             switch(payName){

                    case 'MUN':
                       
                        if (param_data.details.delegation == 'IP') {
                        } else {
                        }
                        var team = {
                            email: param_data.details.email,
                            name: param_data.details.name,
                            phoneNumber: param_data.details.phoneNumber,
                            delegation: param_data.details.delegation,
                            college: param_data.details.college,
                            city: param_data.details.city,
                            committee: param_data.details.committee,
                            portfolio: param_data.details.portfolio,
                            accommodation: param_data.details.accommodation,
                        };
                        teams.push(team);
                        break;
                    case 'SIF':

                        if (param_data.type == 'Startup') {
                            var team = {
                                email: param_data.details.email,
                                name: param_data.details.name,
                                phoneNumber: param_data.details.phoneNumber,
                                delegation: param_data.details.delegation,
                                college: param_data.details.college,
                                city: param_data.details.city,
                                committee: param_data.details.committee,
                                portfolio: param_data.details.portfolio,
                                accommodation: param_data.details.accommodation,
                            };
                            teams.push(team);

                        } else {
                            var team = {
                                email: param_data.details.email,
                                name: param_data.details.name,
                                phoneNumber: param_data.details.phoneNumber,
                                delegation: param_data.details.delegation,
                                college: param_data.details.college,
                                city: param_data.details.city,
                                committee: param_data.details.committee,
                                portfolio: param_data.details.portfolio,
                                accommodation: param_data.details.accommodation,
                            };
                            teams.push(team);

                        }
                        
                        
                        break;
                    case 'INT':
                        break;
                    case 'AH':
                        break;
                    case 'AQ':
                        break;
                    case 'RST':
                        break;
                    case 'IUPC':
                        break;
                    case 'ENCS':
                        break;
                    case 'BQ':
                        break;
                    case 'GQ':
                        break;
                    case 'RW':
                        break;
                    case 'RS':
                        break;
                    case 'DO':
                        break;
                    case 'LFR':
                        break;
                    case 'MS':
                        break;
                    case 'RR':
                        break;
                    case 'RCP':
                        break;
                    case 'TP':
                        break;
                    case 'IOT':
                        break;
                    case 'TSS':
                        break;
                    default:
                        break;
                }
            
            payment.teamSize = teams.length;
            payment.team = teams;
            console.log(payment);
            payment.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    var bulk = User.collection.initializeOrderedBulkOp();
                    bulk.find({'email': payment.email}).update({ $push: { rEvents: payment }});
                    bulk.execute();
                   // Utils.saveSheet(payment);
                    res.json({status : true,
                    orderId: payment.orderId});
                }
            });
        });
    } else {
        res.redirect('/404');
    }

});


router.post('/initiate/:payName', Verify.verifyOrdinaryUser, function (req, res) {
    var payName = req.params.payName;
     
    if (payName != '') {
         
        
        Payment.findOne({'orderId' : req.body.orderId }, function(err, payment) {
            
            
             if (err)
                 return done(err);
            
             if (payment){

                 switch(payName){

                    case 'MUN':
                       
                        if (payment.team[0].delegation == 'IP') {
                            payment.amount = 900;
                        } else {
                            payment.amount = 1200; 
                        }
                        
                        break;
                    case 'SIF':

                        if (payment.team[0].type == 'Startup') {
                            payment.amount = 1000;
                        } else {
                            payment.amount = 100;
                        }
                        break;
                    case 'INT':
                        payment.amount = 100;   
                        break;
                    case 'AH':
                        payment.amount = 100;   
                        break;
                    case 'AQ':
                        payment.amount = 100;   
                        break;
                    case 'RST':
                        payment.amount = 0.01;   
                        break;
                    case 'IUPC':
                        payment.amount = 0.01;   
                        break;
                    case 'ENCS':
                        payment.amount = 0.01;   
                        break;
                    case 'BQ':
                        payment.amount = 200;   
                        break;
                    case 'GQ':
                        payment.amount = 200;   
                        break;
                    case 'RW':
                        payment.amount = 700;   
                        break;
                    case 'RS':
                        payment.amount = 250;   
                        break;
                    case 'DO':
                        payment.amount = 600;   
                        break;
                    case 'LFR':
                        payment.amount = 250;   
                        break;
                    case 'MS':
                        payment.amount = 250;   
                        break;
                    case 'RR':
                        payment.amount = 250;   
                        break;
                    case 'RCP':
                        payment.amount = 500;   
                        break;
                    case 'TP':
                        payment.amount = 250;   
                        break;
                    case 'IOT':
                        payment.amount = 600;       
                        break;
                    case 'TSS':
                        payment.amount = 299;   
                        break;
                    default:
                        payment.amount = 0.01;
                        break;
                }
            

                payment.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    else {
                        paramaters = {
                            REQUEST_TYPE: "DEFAULT",
                            ORDER_ID: payment.orderId,
                            CUST_ID: "plinth-" + payment.email,
                            TXN_AMOUNT: payment.amount,
                            CHANNEL_ID: 'WEB',
                            INDUSTRY_TYPE_ID: paytm.industryID,
                            MID: paytm.mid,
                            WEBSITE: paytm.website,
                            CALLBACK_URL: hostURL + '/payment/response',
    
                        }
                        console.log(paramaters);
    
                        
                        checksum.genchecksum(paramaters, paytm.key, function (err, result) {
                            console.log(result);
                            result['PAYTM_URL'] = paytm.url;
                            res.render('pgredirect', { 'restdata': result });
                        });
                    }
                });
             }
         });
    } else {
        res.redirect('/404');
    }

});

router.post('/response', Verify.verifyOrdinaryUser, function (req, res) {

    var isLoggedIn;
    var user;
    if (req.decoded.sub === "") {
        isLoggedIn = false;
    }
    else {
        User.findOne({ 'email': req.decoded.sub }, function (err, data) {

            isLoggedIn = data.valid;
            user = data;
        });
    }
    var paramlist = req.body;
    console.log(paramlist);
    if (checksum.verifychecksum(paramlist, paytm.key)) {
        Payment.findOneAndUpdate({ 'orderId': paramlist.ORDERID }, { $set: { 'status': paramlist.STATUS, 'tranId': paramlist.TXNID, 'date.paidAt': '' + new Date() } }, { 'new': true }, function (err1, result) {
            if (err1) {
                console.log(err1)
                return;
            }
            else {


                if (paramlist.STATUS === "TXN_FAILURE") {
                    res.render('paystatus', {
                        "page": 'paystatus',
                        "isLoggedIn": isLoggedIn,
                        "user": user,
                        "status": 'fail',
                        details: result,
                    })
                    return;
                }

                if (paramlist.STATUS === "TXN_SUCCESS") {
                    var emails = [];
                    for (var i = 0; i < result.team.length; i++) {
                        emails.push(result.team[i].email);

                    }
                    if(emails.indexOf(result.email) == -1 ){
                        emails.push(result.email);
                    }
                    var bulk = User.collection.initializeOrderedBulkOp();
                    for (var i = 0; i < emails.length; i++) {
                        bulk.find({ 'email': emails[i] }).update({ $push: { events: result } });

                    }
                    bulk.execute();

                    var bulkR = User.collection.initializeOrderedBulkOp();
                   
                        bulkR.find({ 'email':result.email }).update({ $pull: { rEvents : { orderId : result.orderId } } });

                  
                    bulkR.execute();

                   // Utils.updateSheet(result);
                    Utils.mail(result);
                    res.render('paystatus', {
                        "page": 'paystatus',
                        "isLoggedIn": isLoggedIn,
                        "user": user,
                        "status": 'success',
                        details: result,
                    });
                }
                else {
                    res.render('paystatus', {
                        "page": 'paystatus',
                        "isLoggedIn": isLoggedIn,
                        "user": user,
                        "status": 'open',
                        details: result,
                    })
                }

            }
        });
    }
    else {
        res.render('paystatus', {
            "page": 'paystatus',
            "isLoggedIn": isLoggedIn,
            "user": user,
            "status": 'fail',
            details: 'none',
        });
    }

});

module.exports = router;
