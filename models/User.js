var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({

})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
