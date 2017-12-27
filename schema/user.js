var mongoose = require('mongoose');
var mongoose_csv = require('mongoose-csv');

var userSchema = mongoose.Schema({
        googletoken    : String,
        googleid       : String,
        facebooktoken  : String,
        facebookid     : String,
        email          : String,
        name           : String,
        phoneNumber    : Number,
        college        : String,
        year           : String,
        city           : String,
        valid          : Boolean,
        gender         : String,
        events         : [],
        rEvents: [],
});
userSchema.plugin(mongoose_csv);
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
