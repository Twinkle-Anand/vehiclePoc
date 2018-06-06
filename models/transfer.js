var mongoose = require("mongoose");
var TransferSchema = new mongoose.Schema({
    Dealer:String,
    Vehicle_Id:String,
    Transfer_Date:String,
    DigiSign:String
});



module.exports = mongoose.model("Transfer",TransferSchema);