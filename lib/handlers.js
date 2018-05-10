/*
 * Handler to accept the request 
 *
*/

//Dependencies
var helpers = require('./helpers');
var User     = require("../models/users");

//Container for the handler 
var handler={};
 
/*==============================================================================================================================
*
*=================================== JSON API-HANDLER===========================================================================
*
*===============================================================================================================================
*/

//notFound Handler
handler.notfound=function(data,callback){
  callback(404);
};

//Users
handler.users = function(req,res){
	//Container for the methods 
    var acceptableMethods = ['post','get','put','delete'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_user[req.method.toLowerCase()](req,res);
    }
	else
	{
		res.json({'Error':'Route doesnot exists'});
	}

};

//Container for the users submethods
var handler_user={};

//Users-Post
//Required field:firstName,lastName,password,phone_no,tosAgreement
handler_user.post=function(req,res){
  //check all the required fieds are filled out
  var firstName = typeof(req.body.firstName)=='string' &&  req.body.firstName.trim().length>0?req.body.firstName.trim():'';
  var lastName  = typeof(req.body.lastName)=='string' &&  req.body.lastName.trim().length>0?req.body.lastName.trim():'';
    var phone_no  = typeof(req.body.phone_no)=='string' &&  req.body.phone_no.trim().length==10?req.body.phone_no.trim():'';
    var password  = typeof(req.body.password)=='string' &&  req.body.password.trim().length>0?req.body.password.trim():'';
    var tosAgreement = typeof(req.body.tosAgreement)=='boolean' &&  req.body.tosAgreement==true?true:false;

    if (firstName&&lastName&&phone_no&&tosAgreement) {

    var userData = {
      firstName:firstName,
      lastName :lastName,
      phone_no :phone_no,
      password  :helpers.hash(password),
      tosAgreement:tosAgreement
    }

    User.create(userData, function (error, user) {
      if (error) {
        res.json({'Error':'Error while crating user'});
      } else {
        req.session.phone_no = user.phone_no;
        res.json({'Response':user});
      }
    });

  } else {
    res.json({'Error':'Required fields are missing'});
  }
 };


//Users-Get
//Required-Data:phone_no
//Optional data:none
handler_user.get=function (req, res) {
  User.findOne({phone_no:req.session.phone_no})
    .exec(function (error, user) {
      if (error) {
        res.json({'Error':'Required fields are missing'+req.session.phone_no+'okay'});
      } else {
          if (user === null) {
            res.json({'Error':'Not authorized! Go back!'});
          } else {
            res.json({'Response':user});
          }
      }
    });
}


//Export the handler
module.exports= handler;