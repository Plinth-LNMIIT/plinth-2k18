var mongoose = require('mongoose');
var mongoose_csv = require('mongoose-csv');

var paymentSchema = mongoose.Schema({
        orderId        : String,
        tranId         : String,
        status         : String,
        amount         : Number,
        email          : String,
        event          : {
                eventName : String,
                clubName  : String,
                payName   : String,
        },
        date      : {
                createdAt: String,
                paidAt: String,
        },
        teamSize        : Number,
        team : [], 
        sheet: String,
});

paymentSchema.plugin(mongoose_csv);
// create the model for payments and expose it to our app
module.exports = mongoose.model('Payment', paymentSchema);
