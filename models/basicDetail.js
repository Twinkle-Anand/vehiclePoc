var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    Type:String,
    Manufacturer:String,
    Model_No:String,
    Model_Year:String,
    Chassis_No:String,
    DigiSign:String,

});



module.exports = mongoose.model("BasicDetails",UserSchema);