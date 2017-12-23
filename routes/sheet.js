var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../schema/user');
var Verify = require('./verify');
var Utils = require('./utils');
var Payment = require('../schema/payment');
var fs = require('fs');
var PDFDocument = require('pdfkit');

/* router.get('/', Verify.verifyOrdinaryUser, function (req, res, next) {
  
    Utils.saveSheet();
  }); */
  
module.exports = router;