var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../schema/user');
var Verify = require('./verify');
var Utils = require('./utils');
var Payment = require('../schema/payment');
var fs = require('fs');
var PDFDocument = require('pdfkit');

router.get('/:id', Verify.verifyOrdinaryUser, function (req, res, next) {
  if (req.decoded.sub === "") {
    isLoggedIn = false;

  }
  else {
    Payment.findOne({ 'orderId': req.params.id }, function (err, payment) {
      if (err)
        return done(err);


      isUser = false;
      if (payment) {
        for (var i = 0; i < payment.team.length; i++) {
          if (payment.team[i].email == req.decoded.sub) {
            isUser = true;
          }
        }

      }


      if (isUser) {

        var doc = Utils.pdf(payment);
        
        setTimeout(function () {
          fs.readFile(doc, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
            setTimeout(function () {
               Utils.delpdf(doc);
            }, 3000);

          });
        }, 1000);
      }

      else {
          
      }
    });
  }




});


module.exports = router;