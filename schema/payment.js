var mongoose = require('mongoose');
var mongoose_csv = require('mongoose-csv');

var paymentSchema = mongoose.Schema({
        orderId        : String,
        status         : String,
        amount         : Number,
        event          : {
                eventName : String,
                clubName  : String,
        },
        date      : {
                createdAt: String,
                paidAt: String,
        },
        teamSize        : Number,
        team : [], /* [
                {
                    email          : String,
                    name           : String,
                    phoneNumber    : Number,
                    type           : String,
                    college        : String,
                    year           : Number,
                    city           : String,
                    accommodation  : String,
                    resume         : String,
                }
            ] */
});

paymentSchema.plugin(mongoose_csv);
// create the model for payments and expose it to our app
module.exports = mongoose.model('Payment', paymentSchema);
