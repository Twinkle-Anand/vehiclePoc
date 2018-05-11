var mongoose = require("mongoose");
var RegistrationSchema = new mongoose.Schema({
    Registration_No:String,
    Registration_Date:String,
	Expiry_Date:String,
    Fee:String,
    Authority:String,
    Location:String,
    Vehicle_Id:String,
    DigiSign:String
});



module.exports = mongoose.model("RegistrationDetail",RegistrationSchema);