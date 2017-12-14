var fs = require('fs');
var PDFDocument = require('pdfkit');
var nodemailer = require('nodemailer');



exports.pdf = function (result) {
           
                var doc = new PDFDocument({
                  size: 'A4',
                  info: {
                    Title: '' + result.event.eventName + ' Payment Receipt',
                    Author: 'Plinth',
                    Creator: 'Shubham Mangal',
                  }
                });
               
                var path = './public/data/' + result.orderId + '.pdf';
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
                  fs.createWriteStream(path)
                )
                  .on('finish', function () {
                    console.log('PDF closed');
                  });
        
                // Close PDF and write file.
                doc.end();
                
                    return path;
                 

              
};

exports.delpdf = function (path) {
       
               fs.unlink(path, function (err) {
                 if (err) return console.log(err);
                 console.log('file deleted successfully');
               });  
};

exports.mail = function (events) {
    
   var transporter = nodemailer.createTransport({
       host: 'smtp.zoho.com',
       port: 465,
       secure: true,  
       auth: {
           user: 'payment@plinth.in',
           pass: 'PayPass2018'
       }
   });

   var add = this.pdf(events);
    
   var mailOptions = {
       from: '"Plinth Payment" <payment@plinth.in>',  
       to: '' + events.team[0].email,  
       subject: 'Payment Confirmation for ' + events.event.eventName,  
       
       html: '<div style="width:649px;margin:0 auto;border:#ececec solid 1px"> <div style="padding:22px 34px 15px 34px"> <div style="display: flex;"> <div style="flex: 0 0 65%;"> <img title="Paytm Logo" src="cid:unique@kreata.ee" height=50 style="margin-right:8px;" alt="Paytm" class="CToWUd"> </div> <div style="flex:1;text-align:right;vertical-align:middle;font:bold 32px Arial;line-height: 50px;"> <div>plinth 2018 </div> </div> </div> <div style=" color:#333333;font:normal 14px Arial,Helvetica,sans-serif;"> <div style="font:bold 21px Arial,Helvetica,sans-serif;margin-top:10px;text-align:center"> <u>Transaction Receipt</u> </div> <br> <div><b>Order No:</b> ' + events.orderId + ' <br><b>Date:</b> ' +  (events.date.paidAt).substring(0,25) + ' </div> <div style="padding-top:10px"> <a href="mailto:'+ events.team[0].email +'" target="_blank">' + events.team[0].email + '</a> </div> </div> <div style="clear:both"></div> </div> <div style="width:584px;background-color:#ffffff;border:#e8e7e7 solid 1px;padding:27px 0;margin:0 auto"> <div style="border-bottom:#717171 dotted 1px;font:normal 14px Arial,Helvetica,sans-serif;color:#666666;padding:0px 33px 10px"> <br> <table style="width:100%" border="0" cellspacing="0" cellpadding="2"> <tbody> <tr> <td width="450px">' + events.event.eventName + '</td> <td>Rs.' + events.amount + '</td> </tr> </tbody> </table> </div> <div style="border-bottom:#717171 dotted 1px;font:normal 14px Arial,Helvetica,sans-serif;color:#666666;padding:10px 33px 10px"> <br> <table style="width:100%" border="0" cellspacing="0" cellpadding="2"> <tbody> <tr> <td width="450px">Total</td> <td>Rs.' + events.amount + '</td> </tr> </tbody> </table> </div> <div style="border-bottom:#717171 dotted 1px;font:600 14px Arial,Helvetica,sans-serif;color:#333333;padding:17px 33px 17px"> <table style="width:100%" border="0" cellspacing="0" cellpadding="2"> <tbody> <tr> <td width="450px">Amount paid</td> <td>Rs.' + events.amount + '</td> </tr> </tbody> </table> </div> <div style=" color:#333333;font:normal 14px Arial,Helvetica,sans-serif; padding:16px;"> Dear '+ events.team[0].name +', <br> <br> You have successfully registered for the event <b>'+ events.event.eventName +'</b> in Plinth. The invoice for this transaction is attached in this mail and can also be downloaded from the Profile section on the Plinth Website. <br> <br> If you notice any error with this transaction, please contact us at payment@plinth.in <br> <br> <br> <div>Cheers! <br> Team Plinth </div> </div></div><br>  </div>',
       attachments: [{
           filename: 'plinth-logo.png',
           path: './public/media/plinth-logo.png',
           cid: 'unique@kreata.ee' //same cid value as in the html img src
       },{
           filename: 'Payment Receipt.pdf',
           path: add,
       }], 
   };
 
   
   transporter.sendMail(mailOptions, function (error, info) {
       
       if (error) {
           return console.log(error);
       }else{

           setTimeout(function(){
            fs.unlink(add, function (err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
              });  
           },1000);
           console.log('something');     
       }
       console.log('Message sent: ' + info.response);

      
   });
};