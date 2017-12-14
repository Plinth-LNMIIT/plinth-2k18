var fs = require('fs');
var PDFDocument = require('pdfkit');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Eventx = require('../schema/event');
var User = require('../schema/user');
var Verify = require('./verify');
var Payment = require('../schema/payment');

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

        var doc = new PDFDocument({
          size: 'A4',
          info: {
            Title: '' + payment.event.eventName + ' Payment Receipt',
            Author: 'Plinth',
            Creator: 'Shubham Mangal',
          }
        });
       

        doc.image('./public/media/plinth-logo.png', 25, 50, { height: 48 })
        doc.image('./public/media/lnmiit-logo.jpeg', 475, 50, { height: 48 })

        doc.font('./public/fonts/Righteous-Regular.ttf', 28)
        .text('plinth 2018', 50, 50, {align : 'center'})
        .moveDown(.1)
        .font('./public/fonts/Oxygen-Regular.ttf', 12)
        .text('19th - 21st January',{align : 'center'})

        doc.moveTo(25, 110)
          .lineTo(575, 110)
          .stroke()

        doc.font('./public/fonts/Oxygen-Bold.ttf', 16)
        .text('Payment Receipt',50, 130, { align : 'center', underline : true})
        



        doc.moveTo(25, 720)
          .lineTo(575, 720)
          .stroke()  
          doc.font('./public/fonts/Oxygen-Bold.ttf', 12)
          .text('Date: ', 25, 725)
          .font('./public/fonts/Oxygen-Regular.ttf', 10)
          .text(' '+ (new Date()),55,727) 
          .font('./public/fonts/Oxygen-Regular.ttf', 10)
          .text('Page 1 of 1',450,727) 
          
          doc.font('./public/fonts/Oxygen-Bold.ttf', 12)
          .text('Note: ',125,745)
          .font('./public/fonts/Oxygen-Regular.ttf', 10)
          .text(' This is computer generated receipt and does not require any stamp.', 155, 747)
        // Stream contents to a file
        doc.pipe(
          fs.createWriteStream('./public/data/' + payment.orderId + '.pdf')
        )
          .on('finish', function () {
            console.log('PDF closed');
          });

        // Close PDF and write file.
        doc.end();
        setTimeout(function () {
          fs.readFile('./public/data/' + payment.orderId + '.pdf', function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
            setTimeout(function () {
              fs.unlink('./public/data/' + payment.orderId + '.pdf', function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
              });
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