var mongoose = require("mongoose");
var SalesSchema = new mongoose.Schema({
    Buyer:String,
    Adhaar:String,
    PAN_no:String,
    SalesAmount:String,
    Vehicle_Id:String,
    DigiSign:String
});



module.exports = mongoose.model("SalesDetail",SalesSchema);