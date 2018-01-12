var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../schema/user');
var Verify = require('./verify');
var Utils = require('./utils');
var Payment = require('../schema/payment');
var fs = require('fs');
var PDFDocument = require('pdfkit');

/*  router.get('/', Verify.verifyOrdinaryUser, function (req, res, next) {
  Payment.find({ 'event.clubName' : 'Quizzing'}, function(err, payment) {
            
            
    if (err)
        return done(err);
   
    if (payment){
     
     
      for(var i=0; i<payment.length; i++){
       
        
        Utils.saveSheet(payment[i]);
          
          //   
      
      }
   
      
    }
});
 
    
  }); 
   */
module.exports = router;