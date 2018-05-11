/*
 * Handler to accept the request 
 *
*/

//Dependencies
var helpers = require('./helpers');
var User     = require("../models/users");
var BasicDetail = require("../models/basicDetail");
var Transactions=require("../models/transaction");
var Transfer    = require("../models/transfer");
var Sales       = require("../models/salesDetail");
var Register    = require("../models/registrationDetails");
var Mortgage    = require("../models/mortgageDetail");
var Insurance   = require("../models/insuranceDetail");
var Secret      = require("../models/secret");


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

//====================================================================================================================
                                          /*ADD ROUTE*/
//====================================================================================================================
handler.add = function(req,res){
  //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_add[req.method.toLowerCase()](req,res);
    }
  else
  {
    res.json({'Error':'Route doesnot exists'});
  }

};

handler_add={};
handler_add.post=function(req,res){
  //check all the required fieds are filled out
  var Type         = typeof(req.body.Type)=='string' &&  req.body.Type.trim().length>0?req.body.Type.trim():false;
  var Manufacturer = typeof(req.body.Manufacturer)=='string' &&  req.body.Manufacturer.trim().length>0?req.body.Manufacturer.trim():false;
  var Model_No     = typeof(req.body.Model_No )=='string' &&  req.body.Model_No.trim().length>0?req.body.Model_No.trim():false;
  var Model_Year   = typeof(req.body.Model_Year)=='string' && req.body.Model_Year.trim().length>0? req.body.Model_Year.trim():false;
  var Chassis_No   = typeof(req.body.Chassis_No)=='string' && req.body.Chassis_No.trim().length>0? req.body.Chassis_No.trim():false;
  var DigiSign     = typeof(req.body.DigiSign)=='string' &&  req.body.DigiSign.trim().length>0? req.body.DigiSign.trim():false;
   if (Type && Manufacturer && Model_No && Model_Year && Chassis_No && DigiSign) {

    var basicDetail = {
      Type:Type,
      Manufacturer:Manufacturer,
      Model_No:Model_No,
      Model_Year:Model_Year,
      Chassis_No:Chassis_No,
      DigiSign:DigiSign
    }

    BasicDetail.create(basicDetail, function (error, basicDetail) {
      if (error) {
        res.json({'Error':'Error while crating user'});
      } else {
         var transaction={
            Hash:helpers.createRandomString(20),
            Vehicle_Id:basicDetail._id,
            TimeStamp:new Date().toString(),
            Status:'New'
         }  

         Transactions.create(transaction,function(error,transaction){
          if(error){
              res.json({'Error':'Error while updating transaction'});
          }else{
              var secret={
                Vehicle_Id:transaction.Vehicle_Id,
                DigiSign:basicDetail.DigiSign
              }
              Secret.create(secret,function(error,secret){
                 if(error){
                   res.json({'Error':'Error while updating transaction'});
                 }else{
                    res.json({'Response':basicDetail});
                 }
              });
          }

         });
      }
    });

   } else {
    res.json({'Error':'Required fields are missing'});
  }

}

//==================================================================================================
                                      //TRANSFER ROUTE
//==================================================================================================

handler.transfer = function(req,res){
  //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_transfer[req.method.toLowerCase()](req,res);
    }
  else
  {
    res.json({'Error':'Route doesnot exists'});
  }

};
//handler fir transport
handler_transfer={};

handler_transfer.post=function(req,res){
 //check all the required fieds are filled out
  var Vehicle_Id     = typeof(req.body.Vehicle_Id)=='string' &&  req.body.Vehicle_Id.trim().length>0?req.body.Vehicle_Id.trim():false;
  var Dealer         = typeof(req.body.Dealer)=='string' && req.body.Dealer.trim().length>0? req.body.Dealer.trim():false;
  var Transfer_Date  = typeof(req.body.Transfer_Date)=='string' && req.body.Transfer_Date.trim().length>0? req.body.Transfer_Date.trim():false;
  var DigiSign       = typeof(req.body.DigiSign)=='string' &&  req.body.DigiSign.trim().length>0? req.body.DigiSign.trim():false;

   if(Vehicle_Id && Dealer && Transfer_Date && DigiSign)
   {

      Secret.findOne({Vehicle_Id:Vehicle_Id})
     .exec(function (error,info) {
      if (error) {
        res.json({'Error':'Wrong Vehicle_Id'});
      } else {
             //Check the digiSign match or not
             if(info.DigiSign === DigiSign)
             {
                    var transferDetail ={
                      Vehicle_Id:Vehicle_Id,
                      Dealer:Dealer,
                      Transfer_Date:Transfer_Date,
                      DigiSign:DigiSign
                    }
                    Transfer.create(transferDetail, function (error, transferDetail) {
                        if (error) {
                          res.json({'Error':'Error while crating user'});
                        } else {
                           var transaction={
                              Hash:helpers.createRandomString(20),
                              Vehicle_Id:transferDetail.Vehicle_Id,
                              TimeStamp:new Date().toString(),
                              Status:'Transfer to Dealer'
                           }  

                           Transactions.create(transaction,function(error,transaction){
                            if(error){
                                res.json({'Error':'Error while updating transaction'});
                            }else{
                                                  
                                  res.json({'Response':transaction});
                                  }
                             });
                         }
                       });
             }
             else{
              res.json({'Error':'DigiSign didn\'t match'});
             }

          }
      });

   }
   else{
    res.json({'Error':'Missing Required fields'});
   }
}
//===================================================================================================
                                  //SALES_ROUTE
//====================================================================================================
handler.sales = function(req,res){
  //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_sales[req.method.toLowerCase()](req,res);
    }
  else
  {
    res.json({'Error':'Route doesnot exists'});
  }

};

//handler fir transport
handler_sales={};
handler_sales.post = function(req,res){
    //check all the required fieds are filled out
  var Buyer        = typeof(req.body.Buyer )=='string' &&  req.body.Buyer.trim().length>0?req.body.Buyer .trim():false;
  var Adhaar       = typeof(req.body.Adhaar)=='string' && req.body.Adhaar.trim().length>0? req.body.Adhaar.trim():false;
  var PAN_no       = typeof(req.body.PAN_no)=='string' && req.body.PAN_no.trim().length>0? req.body.PAN_no.trim():false;
  var SalesAmount  = typeof(req.body.SalesAmount)=='string' &&  req.body.SalesAmount.trim().length>0? req.body.SalesAmount.trim():false;
  var DigiSign     = typeof(req.body.DigiSign)=='string' &&  req.body.DigiSign.trim().length>0? req.body.DigiSign.trim():false;
  var Vehicle_Id     = typeof(req.body.Vehicle_Id)=='string' &&  req.body.Vehicle_Id.trim().length>0?req.body.Vehicle_Id.trim():false;
   if(Buyer&&Adhaar&&PAN_no&&SalesAmount&&DigiSign && Vehicle_Id)
   {

      Secret.findOne({Vehicle_Id:Vehicle_Id})
     .exec(function (error,info) {
      if (error) {
        res.json({'Error':'Wrong Vehicle_Id'});
      } else {
             //Check the digiSign match or not
             if(info.DigiSign === DigiSign)
             {
                    var salesDetail ={
                        Buyer:Buyer,
                        Adhaar:Adhaar,
                        PAN_no:PAN_no,
                        SalesAmount:SalesAmount,
                        Vehicle_Id:Vehicle_Id,
                        DigiSign:DigiSign
                    }
                    Sales.create(salesDetail, function (error,salesDetail) {
                        if (error) {
                          res.json({'Error':'Error while crating user'});
                        } else {
                           var transaction={
                              Hash:helpers.createRandomString(20),
                              Vehicle_Id:salesDetail.Vehicle_Id,
                              TimeStamp:new Date().toString(),
                              Status:'Sold'
                           }  

                           Transactions.create(transaction,function(error,transaction){
                            if(error){
                                res.json({'Error':'Error while updating transaction'});
                            }else{
                                                  
                                  res.json({'Response':transaction});
                                  }
                             });
                         }
                       });
             }
             else{
              res.json({'Error':'DigiSign didn\'t match'});
             }

          }
      });

   }
   else{
    res.json({'Error':'Missing Required fields'});
   }

}

//=========================================================================================================
                     //REGISTRATION_DETAILS
//=========================================================================================================

 handler.register=function(req,res){
  //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_register[req.method.toLowerCase()](req,res);
    }
  else
  {
    res.json({'Error':'Route doesnot exists'});
  }

};

//handler fir transport
handler_register={};
handler_register.post = function(req,res){
    //check all the required fieds are filled out
  var  Registration_No = typeof(req.body. Registration_No )=='string' &&  req.body. Registration_No.trim().length>0?req.body. Registration_No.trim():false;
  var  Registration_Date = typeof(req.body. Registration_Date)=='string' && req.body. Registration_Date.trim().length>0? req.body. Registration_Date.trim():false;
  var  Expiry_Date     = typeof(req.body.Expiry_Date)=='string' && req.body.Expiry_Date.trim().length>0? req.body.Expiry_Date.trim():false;
  var  Fee             = typeof(req.body.Fee)=='string' &&  req.body.Fee.trim().length>0? req.body.Fee.trim():false;
  var  Authority      = typeof(req.body.Authority)=='string' &&  req.body. Authority.trim().length>0? req.body. Authority.trim():false;
  var  Location       = typeof(req.body.Location)=='string' &&  req.body. Location.trim().length>0? req.body. Location.trim():false;
  var  DigiSign       = typeof(req.body.DigiSign)=='string' &&  req.body.DigiSign.trim().length>0? req.body.DigiSign.trim():false;
  var  Vehicle_Id     = typeof(req.body.Vehicle_Id)=='string' &&  req.body.Vehicle_Id.trim().length>0?req.body.Vehicle_Id.trim():false;
  
   if(Registration_No&&Registration_Date&&Expiry_Date&&Fee&&Authority &&Location&&DigiSign && Vehicle_Id)
   {

      Secret.findOne({Vehicle_Id:Vehicle_Id})
     .exec(function (error,info) {
      if (error) {
        res.json({'Error':'Wrong Vehicle_Id'});
      } else {
             //Check the digiSign match or not
             if(info.DigiSign === DigiSign)
             {
                    var registrationDetail ={
                        Registration_No:Registration_No,
                        Registration_Date:Registration_Date,
                        Expiry_Date:Expiry_Date,
                        Fee:Fee,
                        Authority:Authority,
                        Location:Location,
                        Vehicle_Id:Vehicle_Id,
                        DigiSign:DigiSign
                    }
                    Register.create(registrationDetail, function (error,salesDetail) {
                        if (error) {
                          res.json({'Error':'Error while crating user'});
                        } else {
                           var transaction={
                              Hash:helpers.createRandomString(20),
                              Vehicle_Id:salesDetail.Vehicle_Id,
                              TimeStamp:new Date().toString(),
                              Status:'Registered'
                           }  

                           Transactions.create(transaction,function(error,transaction){
                            if(error){
                                res.json({'Error':'Error while updating transaction'});
                            }else{
                                                  
                                  res.json({'Response':transaction});
                                  }
                             });
                         }
                       });
             }
             else{
              res.json({'Error':'DigiSign didn\'t match'});
             }

          }
      });

   }
   else{
    res.json({'Error':'Missing Required fields'});
   }

}
//=======================================================================================================
                      //INDURANCE-ROUTE
//=======================================================================================================
 handler.insurance=function(req,res){
  //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_insurance[req.method.toLowerCase()](req,res);
    }
  else
  {
    res.json({'Error':'Route doesnot exists'});
  }

};

//handler fir transport
handler_insurance={};
handler_insurance.post = function(req,res){
    //check all the required fieds are filled out
  var  Expiry_Date     = typeof(req.body.Expiry_Date)=='string' && req.body.Expiry_Date.trim().length>0? req.body.Expiry_Date.trim():false;
  var  Policy_Date     = typeof(req.body.Policy_Date)=='string' &&  req.body.Policy_Date.trim().length>0? req.body.Policy_Date.trim():false;
  var  Policy_No       = typeof(req.body.Policy_No)=='string' &&  req.body. Policy_No.trim().length>0? req.body. Authority.trim():false;
  var  Company         = typeof(req.body. Company  )=='string' &&  req.body. Company  .trim().length>0? req.body. Company  .trim():false;
  var  DigiSign        = typeof(req.body.DigiSign)=='string' &&  req.body.DigiSign.trim().length>0? req.body.DigiSign.trim():false;
  var  Vehicle_Id      = typeof(req.body.Vehicle_Id)=='string' &&  req.body.Vehicle_Id.trim().length>0?req.body.Vehicle_Id.trim():false;
  
   if(Expiry_Date&&Policy_Date&&Policy_No &&Company&&DigiSign&&Vehicle_Id)
   {

      Secret.findOne({Vehicle_Id:Vehicle_Id})
     .exec(function (error,info) {
      if (error) {
        res.json({'Error':'Wrong Vehicle_Id'});
      } else {
             //Check the digiSign match or not
             if(info.DigiSign === DigiSign)
             {
                    var insuranceDetail ={
                          Policy_No:Policy_No,
                          Policy_Date:Policy_Date,
                          Expiry_Date:Expiry_Date,
                          Company:Company,
                          Vehicle_Id:Vehicle_Id,
                          DigiSign:DigiSign
                    }
                    Insurance.create(insuranceDetail, function (error,insuranceDetail) {
                        if (error) {
                          res.json({'Error':'Error while crating user'});
                        } else {
                           var transaction={
                              Hash:helpers.createRandomString(20),
                              Vehicle_Id:insuranceDetail.Vehicle_Id,
                              TimeStamp:new Date().toString(),
                              Status:'Registered'
                           }  

                           Transactions.create(transaction,function(error,transaction){
                            if(error){
                                res.json({'Error':'Error while updating transaction'});
                            }else{
                                                  
                                  res.json({'Response':transaction});
                                  }
                             });
                         }
                       });
             }
             else{
              res.json({'Error':'DigiSign didn\'t match'});
             }

          }
      });

   }
   else{
    res.json({'Error':'Missing Required fields'});
   }

}
//========================================================================================================
                                   //MORTGAGE ROUTE
//========================================================================================================

 handler.mortgage=function(req,res){
  //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_mortgage[req.method.toLowerCase()](req,res);
    }
  else
  {
    res.json({'Error':'Route doesnot exists'});
  }

};

//handler fir transport
handler_mortgage={};
handler_mortgage.post = function(req,res){
    //check all the required fieds are filled out
  var  Status          = typeof(req.body.Status )=='string' &&  req.body.Status.trim().length>0? req.body.Status.trim():false;
  var  Amount          = typeof(req.body.Amount)=='string' &&  req.body.Amount.trim().length>0? req.body.Amount.trim():false;
  var  Company         = typeof(req.body.Company)=='string' &&  req.body.Company.trim().length>0? req.body.Company.trim():false;
  var  DigiSign        = typeof(req.body.DigiSign)=='string' &&  req.body.DigiSign.trim().length>0? req.body.DigiSign.trim():false;
  var  Vehicle_Id      = typeof(req.body.Vehicle_Id)=='string' &&  req.body.Vehicle_Id.trim().length>0?req.body.Vehicle_Id.trim():false;
  
   if(Status&&Amount&&Company&&DigiSign&&Vehicle_Id)
   {

      Secret.findOne({Vehicle_Id:Vehicle_Id})
     .exec(function (error,info) {
      if (error) {
        res.json({'Error':'Wrong Vehicle_Id'});
      } else {
             //Check the digiSign match or not
             if(info.DigiSign === DigiSign)
             {
                    var mortgageDetail ={
                           Company:Company,
                           Amount:Amount,
                           Status:Status,
                           Vehicle_Id:Vehicle_Id,
                           DigiSign:DigiSign
              }
                   Mortgage.create(mortgageDetail, function (error,mortgageDetail) {
                        if (error) {
                          res.json({'Error':'Error while crating user'});
                        } else {
                           var transaction={
                              Hash:helpers.createRandomString(20),
                              Vehicle_Id:insuranceDetail.Vehicle_Id,
                              TimeStamp:new Date().toString(),
                              Status:'Registered'
                           }  

                           Transactions.create(transaction,function(error,transaction){
                            if(error){
                                res.json({'Error':'Error while updating transaction'});
                            }else{
                                                  
                                  res.json({'Response':transaction});
                                  }
                             });
                         }
                       });
             }
             else{
              res.json({'Error':'DigiSign didn\'t match'});
             }

          }
      });

   }
   else{
    res.json({'Error':'Missing Required fields'});
   }

}
//=======================================================================================================
                     //ALL_TRANSACTIONS
//=======================================================================================================

handler.allTransaction=function(req,res){
  //Container for the methods 
    var acceptableMethods = ['get'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_allTransaction[req.method.toLowerCase()](req,res);
    }
  else
  {
    res.json({'Error':'Route doesnot exists'});
  }

};

handler_allTransaction={};

handler_allTransaction.get=function(req,res){

   Transactions.find({},function(err,transactions){
    if(err)
    {
      res.json({'Error':'Error while fetching Transactions'});
    }
    else{
      res.json({'Response':transactions});
    }
   });

}

//==================================================================================================
                      //SEARCH-HANDLER
//==================================================================================================
handler.search=function(req,res){
  //Container for the methods 
    var acceptableMethods = ['get'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_search[req.method.toLowerCase()](req,res);
    }
  else
  {
    res.json({'Error':'Route doesnot exists'});
  }

};

handler_search={};

handler_search.get = function(req,res){
    var searchParam={};
    if(req.query.Vehicle_Id)
        searchParam._id=req.query.Vehicle_Id;
    if(req.query.Type)
        searchParam.Type=req.query.Type;
    if(req.query.Manufacturer)
        searchParam.Manufacturer=req.query.Manufacturer;  
    if(req.query.Model_No)
        searchParam.Model_No=req.query.Model_No;    
    if(req.query.Model_Year)
        searchParam.Model_Year=req.query.Model_Year;     
    if(req.query.Status)
        searchParam.Status=req.query.Status;
           
     BasicDetail.find(searchParam,function(err,allVehicle){
        if(err)
        {
          res.json({'Error':searchParam});
        }
        else{
           res.json({'Response':allVehicle});
        }
     });      

}

//=================================================================================================
                    //INFO_ROUTE
//=================================================================================================

  handler.info=function(req,res){
  //Container for the methods 
    var acceptableMethods = ['get'];

    //Check if the method of the request made 
    if( acceptableMethods.indexOf(req.method.toLowerCase())>-1){
       handler_info[req.method.toLowerCase()](req,res);
    }
  else
  {
    res.json({'Error':'Route doesnot exists'});
  }

};
handler_info={};
handler_info.get = function(req,res){
      var responseObj={};
              
     BasicDetail.find({'_id':req.query.Vehicle_Id},function(err,vehicle){
        if(err)
        {
          res.json({'Error':searchParam});
        }
        else{

              if(vehicle!==null)
              { responseObj.BasicDetail=vehicle;
                Transfer.find({'Vehicle_Id':req.query.Vehicle_Id},function(err,tvehicle){
                   if(tvehicle!==null)
                   {
                       responseObj.TransferDetail=tvehicle;
                       Sales.find({'Vehicle_Id':req.query.Vehicle_Id},function(err,svehicle){
                           if(svehicle!=null){
                              responseObj.SalesDetail=svehicle;
                              Register.find({'Vehicle_Id':req.query.Vehicle_Id},function(err,rvehicle){
                                   if(err){
                                     res.json({'Error':searchParam});
                                   }
                                   else{
                                      if(rvehicle!=null){
                                         responseObj.RegistrationDetail=rvehicle  
                                         Insurance.find({'Vehicle_Id':req.query.Vehicle_Id},function(err,ivehicle){
                                             if(err){
                                                res.json({'Error':searchParam});
                                             }
                                             else{
                                                if(ivehicle!=null){
                                                  responseObj.InsuranceDetail=ivehicle;
                                                  Mortgage.find({'Vehicle_Id':req.query.Vehicle_Id},function(err,mvehicle){
                                                     if(err){
                                                      res.json({'Error':searchParam});
                                                     }
                                                     else{
                                                      if(mvehicle!=null){
                                                         responseObj.MortgageDetail=mvehicle;
                                                        res.json({'Response':responseObj});
                                                      }
                                                      else{
                                                        responseObj.MortgageDetail=null;
                                                        res.json({'Response':responseObj});
                                                      }
                                                     }
                                                  });
                                                }else{
                                                  responseObj.InsuranceDetail=null;
                                                  res.json({'Response':responseObj});
                                                }
                                             }
                                         });
                                      }else{
                                        responseObj.RegistrationDetail=null;
                                        res.json({'Response':responseObj});
                                      }
                                   }
                              });
                           }
                           else{
                             responseObj.SalesDetail=null;
                             res.json({'Response':responseObj});
                           }
                       });
                   }
                   else{
                          responseObj.TransferDetail=null;
                          res.json({'Response':responseObj});
                   }

                });
              }
              else{
                responseObj.BasicDetail=null;
                res.json({'Response':responseObj});
              } 
        }
     });      

}
handler_search={};
//Export the handler
module.exports= handler;