var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    firstName:String,
    lastName :String,
    phone_no :Number,
    password  :String,
    tosAgreement:Boolean
});


//authenticate input against database
UserSchema.statics.authenticate = function (email, phone_no, callback) {
  User.findOne({ phone_no:phone_no })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      
        if (user.password == helpers.hash(password)) {
          return callback(null, user);
        } else {
          return callback(null,false);
        }
      })
}

module.exports = mongoose.model("User",UserSchema);