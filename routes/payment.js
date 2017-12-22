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

router.post('/initiate/:payName', Verify.verifyOrdinaryUser, function (req, res) {
    var payment = new Payment();
    var payName = req.params.payName;
    if (payName != '') {
        Payment.count({}, function (err, count) {
            var param_data = JSON.parse(req.body.data);

            payment.event.eventName = param_data.eventName;
            payment.email = param_data.mEmail;
            payment.status = 'OPEN';
            payment.date.createdAt = '' + new Date();
            payment.team = [];
            var teams = [];
            if (payName == 'MUN') {
                var order_id = "Plinth-" + payName + "-" + (count + 1) + "-" + id_tag;
                if (param_data.details.delegation == 'IP') {
                    payment.amount = 900;
                } else {
                    payment.amount = 1200;
                }

                payment.orderId = order_id;
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
                    paramaters = {
                        REQUEST_TYPE: "DEFAULT",
                        ORDER_ID: payment.orderId,
                        CUST_ID: "plinth-" + payment.email,
                        TXN_AMOUNT: payment.amount,
                        CHANNEL_ID: 'WEB',
                        INDUSTRY_TYPE_ID: paytm.industryID,
                        MID: paytm.mid,
                        WEBSITE: paytm.website,
                        /*  EMAIL            : payment.team[0].email,
                         MOBILE_NO        : payment.team[0].phoneNumber, */
                        CALLBACK_URL: hostURL + '/payment/response',

                    }
                    console.log(paramaters);

                    // Create an array having all required parameters for creating checksum.
                    checksum.genchecksum(paramaters, paytm.key, function (err, result) {
                        console.log(result);
                        result['PAYTM_URL'] = paytm.url;
                        res.render('pgredirect', { 'restdata': result });
                    });
                }
            });
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
                    Utils.saveSheet(result);
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
