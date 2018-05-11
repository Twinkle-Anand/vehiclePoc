var mongoose = require("mongoose");
var SecretSchema = new mongoose.Schema({
    Vehicle_Id:String,
    DigiSign :String,
   
});

module.exports = mongoose.model("Secret",SecretSchema);