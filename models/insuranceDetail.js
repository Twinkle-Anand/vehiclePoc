var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    Policy_No:String,
    Policy_Date:String,
    Expiry_Date:String,
    Company:String,
    Vehicle_Id:String,
    DigiSign:String
});



module.exports = mongoose.model("InsuranceDetail",UserSchema);