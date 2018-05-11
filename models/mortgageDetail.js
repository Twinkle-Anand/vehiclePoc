var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
     Company:String,
     Amount:String,
     Status:String,
     Vehicle_Id:String,
     DigiSign:String
});



module.exports = mongoose.model("MortgageDetail",UserSchema);