var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    Hash:String,
    Vehicle_Id:String,
    TimeStamp:String,
    Status:String
});



module.exports = mongoose.model("Transactions",UserSchema);