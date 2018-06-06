"use strict";
var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  phone_no:String,
  token_id:String,
  expires:{
  	type:String,
  }
});



UserSchema.pre('findOneAndUpdate',function(next){
     if(this.expires>Date.now().toString()){
        return next(new Error('Token Expired'));
     }

     next();
});
module.exports = mongoose.model("Token",UserSchema);