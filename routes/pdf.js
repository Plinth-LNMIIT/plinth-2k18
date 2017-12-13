var fs = require('fs');
var PDFDocument = require('pdfkit');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Eventx = require('../schema/event');
var User = require('../schema/user');
var Verify = require('./verify');
var Payment = require('../schema/payment');

router.get('/:id', Verify.verifyOrdinaryUser ,function(req, res, next) {
  
    Payment.findOne({'orderId' : req.params.id }, function(err, payment) {
         
          // if there are any errors, return the error
          if (err)
              return done(err);
          // check to see if theres already a user with that email
          if (payment){
           
            var doc = new PDFDocument({
              size: 'LEGAL', // See other page sizes here: https://github.com/devongovett/pdfkit/blob/d95b826475dd325fb29ef007a9c1bf7a527e9808/lib/page.coffee#L69
              info: {
                Title: 'Tile of File Here',
                Author: 'Some Author',
              }
            });
            
            // Write stuff into PDF
            doc.fontSize(25)
            .text('Here is some vector graphics...', 100, 80);
            
         // some vector graphics
         doc.save()
            .moveTo(100, 150)
            .lineTo(100, 250)
            .lineTo(200, 250)
            .fill("#FF3300");
            
         doc.circle(280, 200, 50)
            .fill("#6600FF");
            
         // an SVG path
         doc.scale(0.6)
            .translate(470, 130)
            .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
            .fill('red', 'even-odd')
            .restore();
            
         // and some justified text wrapped into columns
         doc.text('And here is some wrapped text...', 100, 300)
            .font('Times-Roman', 13)
            .moveDown()
            .text('lorem', {
              width: 412,
              align: 'justify',
              indent: 30,
              columns: 2,
              height: 300,
              ellipsis: true
            });
            
            // Stream contents to a file
            doc.pipe(
              fs.createWriteStream('./public/data/output.pdf')
            )
              .on('finish', function () {
                console.log('PDF closed');
              });
            
            // Close PDF and write file.
            doc.end();
            setTimeout(function(){
              res.download('./public/data/output.pdf');
            }, 1000);
            


          }
      });



});
module.exports = router;