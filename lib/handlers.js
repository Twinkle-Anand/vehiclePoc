/*
 * Handler to accept the request 
 *
 */
//Dependencies
var helpers = require('./helpers');
var User = require("../models/users");
var BasicDetail = require("../models/basicDetail");
var Transactions = require("../models/transaction");
var Transfer = require("../models/transfer");
var Sales = require("../models/salesDetail");
var Register = require("../models/registrationDetails");
var Mortgage = require("../models/mortgageDetail");
var Insurance = require("../models/insuranceDetail");
var Secret = require("../models/secret");
var Token = require("../models/token");
var mongoose = require("mongoose");


//Container for the handler 
var handler = {};

/*
 *
 *HTML - HANDLER
 */
//Index handler
// Index
handler.index = function(req, res) {
    // Prepare data for interpolation
    var templateData = {
        'head.title': '-Vehicle POC-',
        'head.description': 'We offer free, simple vehicle tracking .',
        'body.class': 'index'
    };
    // Read in a template as a string
    helpers.getTemplate('index', templateData, function(err, str) {
        if (!err && str) {
            // Add the universal header and footer
            helpers.addUniversalTemplates(str, templateData, function(err, str) {
                if (!err && str) {
                    // Return that page as HTML
                    res.status(200).send(str);
                } else {
                    res.status(500).send('');
                }
            });
        } else {
            res.status(500).send('');
        }
    });

};


// Create Account
handler.accountCreate = function(req, res) {

    // Prepare data for interpolation
    var templateData = {
        'head.title': 'Create an Account',
        'head.description': 'Signup is easy and only takes a few seconds.',
        'body.class': 'accountCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('accountCreate', templateData, function(err, str) {
        if (!err && str) {
            // Add the universal header and footer
            helpers.addUniversalTemplates(str, templateData, function(err, str) {
                if (!err && str) {
                    // Return that page as HTML
                    res.status(200).send(str);
                } else {
                    res.status(500).send('');
                }
            });
        } else {
            res.status(500).send('');
        }
    });

};

// Create New Session
handler.sessionCreate = function(req, res) {

    // Prepare data for interpolation
    var templateData = {
        'head.title': 'Login to your account.',
        'head.description': 'Please enter your phone number and password to access your account.',
        'body.class': 'sessionCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionCreate', templateData, function(err, str) {
        if (!err && str) {
            // Add the universal header and footer
            helpers.addUniversalTemplates(str, templateData, function(err, str) {
                if (!err && str) {
                    // Return that page as HTML
                    res.status(200).send(str);
                } else {
                    res.status(500).send('');
                }
            });
        } else {
            res.status(500).send('');
        }
    });

};

// Session has been deleted
handler.sessionDeleted = function(req, res) {

    // Prepare data for interpolation
    var templateData = {
        'head.title': 'Logged Out',
        'head.description': 'You have been logged out of your account.',
        'body.class': 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted', templateData, function(err, str) {
        if (!err && str) {
            // Add the universal header and footer
            helpers.addUniversalTemplates(str, templateData, function(err, str) {
                if (!err && str) {
                    // Return that page as HTML
                    res.status(200).send(str);
                } else {
                    res.status(500).send('');
                }
            });
        } else {
            res.status(500).send('');
        }
    });

};

handler.home = function(req, res) {
    // Prepare data for interpolation
    var templateData = {
        'head.title': 'Car Track',
        'head.description': 'Track the car easily',
        'body.class': 'search'
    };
    // Read in a template as a string
    helpers.getTemplate('home', templateData, function(err, str) {
        if (!err && str) {
            // Add the universal header and footer
            helpers.addUniversalTemplates(str, templateData, function(err, str) {
                if (!err && str) {
                    // Return that page as HTML
                    res.status(200).send(str);
                } else {
                    res.status(500).send('');
                }
            });
        } else {
            res.status(500).send('');
        }
    });
}

handler.homeAdd = function(req, res) {
    // Prepare data for interpolation
    var templateData = {
        'head.title': 'Add Car',
        'head.description': 'Track the car easily',
        'body.class': 'homeAdd'
    };
    // Read in a template as a string
    helpers.getTemplate('homeAdd', templateData, function(err, str) {
        if (!err && str) {
            // Add the universal header and footer
            helpers.addUniversalTemplates(str, templateData, function(err, str) {
                if (!err && str) {
                    // Return that page as HTML
                    res.status(200).send(str);
                } else {
                    res.status(500).send('');
                }
            });
        } else {
            res.status(500).send('');
        }
    });
}
handler.homeTrans = function(req, res) {
        // Prepare data for interpolation
        var templateData = {
            'head.title': 'Transactions',
            'head.description': 'Track the car easily',
            'body.class': 'homeTrans'
        };
        // Read in a template as a string
        helpers.getTemplate('homeViewTrans', templateData, function(err, str) {
            if (!err && str) {
                // Add the universal header and footer
                helpers.addUniversalTemplates(str, templateData, function(err, str) {
                    if (!err && str) {
                        // Return that page as HTML
                        res.status(200).send(str);
                    } else {
                        res.status(500).send('');
                    }
                });
            } else {
                res.status(500).send('');
            }
        });
    }
    // Public assets
handler.public = function(req, res) {

    // Get the filename being requested
    var trimmedAssetName = req.originalUrl.replace('public/', '').trim();
    if (trimmedAssetName.length > 0) {
        // Read in the asset's data
        helpers.getStaticAsset(trimmedAssetName, function(err, data) {
            if (!err && data) {

                // Determine the content type (default to plain text)
                var contentType = 'plain';
                var payloadString;

                if (trimmedAssetName.indexOf('.css') > -1) {
                    contentType = 'css';
                }

                if (trimmedAssetName.indexOf('.png') > -1) {
                    contentType = 'png';
                }

                if (trimmedAssetName.indexOf('.jpg') > -1) {
                    contentType = 'jpg';
                }

                if (trimmedAssetName.indexOf('.ico') > -1) {
                    contentType = 'favicon';
                }


                if (contentType == 'plain') {
                    res.header('Content-Type', 'text/plain');
                    payloadString = typeof(data) !== 'undefined' ? data : '';;
                }

                if (contentType == 'favicon')
                    res.header('Content-Type', 'image/x-icon');
                payloadString = typeof(data) !== 'undefined' ? data : '';
            }

            if (contentType == 'plain') {
                res.header('Content-Type', 'text/plain');
                payloadString = typeof(data) !== 'undefined' ? data : '';
            }

            if (contentType == 'css') {
                res.header('Content-Type', 'text/css');
                payloadString = typeof(data) !== 'undefined' ? data : '';
            }

            if (contentType == 'png') {
                res.header('Content-Type', 'image/png');
                payloadString = typeof(data) !== 'undefined' ? data : '';
            }

            if (contentType == 'jpg') {
                res.header('Content-Type', 'image/jpeg');
                payloadString = typeof(data) !== 'undefined' ? data : '';
            }
            // Callback the data
            res.send(payloadString);
        });
    } else {
        callback(404);
    }


};


/*==============================================================================================================================
 *
 *=================================== JSON API-HANDLER===========================================================================
 *
 *===============================================================================================================================
 */

//notFound Handler
handler.notfound = function(data, callback) {
    callback(404);
};

//Users
handler.users = function(req, res) {
    //Container for the methods 
    var acceptableMethods = ['post', 'get', 'put', 'delete'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
        handler_user[req.method.toLowerCase()](req, res);
    } else {
        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }

};

//Container for the users submethods
var handler_user = {};

//Users-Post
//Required field:firstName,lastName,password,phone_no,tosAgreement
handler_user.post = function(req, res) {
    //check all the required fieds are filled out
    var firstName = typeof(req.body.firstName) == 'string' && req.body.firstName.trim().length > 0 ? req.body.firstName.trim() : false;
    var lastName = typeof(req.body.lastName) == 'string' && req.body.lastName.trim().length > 0 ? req.body.lastName.trim() : false;
    var phone_no = typeof(req.body.phone_no) == 'string' && req.body.phone_no.length == 10 ? req.body.phone_no : false;
    var password = typeof(req.body.password) == 'string' && req.body.password.trim().length > 0 ? req.body.password.trim() : false;
    var tosAgreement = typeof(req.body.tosAgreement) == 'boolean' && req.body.tosAgreement == true ? true : false;

    if (firstName && lastName && phone_no && tosAgreement && password) {

        var userData = {
            firstName: firstName,
            lastName: lastName,
            phone_no: phone_no,
            password: helpers.hash(password),
            tosAgreement: tosAgreement
        }

        User.create(userData, function(error, user) {
            if (error) {
                res.staus(503).json({
                    'Error': 'Error while creating user'
                });
            } else {
                req.session.phone_no = user.phone_no;
                res.status(200).json({
                    'Response': user
                });
            }
        });

    } else {
        res.status(404).json({
            'Error':'Required fields are missing or incorrect'
        });
    }
};


//Users-Get
//Required-Data:phone_no,token_id
//Optional data:none
handler_user.get = function(req, res) {
    //check the phone no is valid
    if (typeof(req.query.phone_no) == 'string' && req.query.phone_no.trim().length == 10) {
        //Get the token from header
        var token_id = typeof(req.get('token_id')) == 'string' ? req.get('token_id').trim() : false;
        //verify the token is valid for given phone number 
        console.log(token_id);
        var phone_no = req.query.phone_no.trim();
        handler_tokens.verifyToken(phone_no, token_id, function(validToken) {
            if (validToken) {
                User.findOne({
                        phone_no: phone_no
                    })
                    .exec(function(error, user) {
                        if (error) {
                            res.status(400).json({
                                'Error': 'Required fields are missing' + req.session.phone_no + 'okay'
                            });
                        } else {
                            if (user === null) {
                                res.status(400).json({
                                    'Error': 'Not authorized! Go back!'
                                });
                            } else {
                                res.json({
                                    'Response': user
                                });
                            }
                        }
                    });
            } else {
                res.status(403).json({
                    'Error': 'Missing required token in the header,or token id incorrect'
                });
            }

        });
    } else {
        res.status(400).json({
            'Error': 'Required fields are missing'
        });
    }

}

//====================================================================================================================
/*ADD ROUTE*/
//====================================================================================================================
handler.add = function(req, res) {
    //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
      
                  // Get token from header
        var token_id = typeof(req.headers.token_id) == 'string' ? req.headers.token_id : false;
        if(token_id){
          Token.findOne({'token_id':token_id},function(err,tokenData){
            if(!err && tokenData)
            {
                handler_add[req.method.toLowerCase()](req, res);
                
            }else{
                 res.status(403);
            }

          });
        }else{
            res.status(403);
        }

    } else {
        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }

};

handler_add = {};
handler_add.post = function(req, res) {
    //check all the required fieds are filled out
    var Type = typeof(req.body.Type) == 'string' && req.body.Type.trim().length > 0 ? req.body.Type.trim() : false;
    var Manufacturer = typeof(req.body.Manufacturer) == 'string' && req.body.Manufacturer.trim().length > 0 ? req.body.Manufacturer.trim() : false;
    var Model_No = typeof(req.body.Model_No) == 'string' && req.body.Model_No.trim().length > 0 ? req.body.Model_No.trim() : false;
    var Model_Year = typeof(req.body.Model_Year) == 'string' && req.body.Model_Year.trim().length > 0 ? req.body.Model_Year.trim() : false;
    var Chassis_No = typeof(req.body.Chassis_No) == 'string' && req.body.Chassis_No.trim().length > 0 ? req.body.Chassis_No.trim() : false;
    var DigiSign = typeof(req.body.DigiSign) == 'string' && req.body.DigiSign.trim().length > 0 ? req.body.DigiSign.trim() : false;
    if (Type && Manufacturer && Model_No && Model_Year && Chassis_No && DigiSign) {

        var basicDetail = {
            Type: Type,
            Manufacturer: Manufacturer,
            Model_No: Model_No,
            Model_Year: Model_Year,
            Chassis_No: Chassis_No,
            DigiSign: helpers.hash(DigiSign)
        }

        BasicDetail.create(basicDetail, function(error, basicDetail) {
            if (error) {
                res.status(403).json({
                    'Error': 'Error while crating user'
                });
            } else {
                var transaction = {
                    Hash: helpers.createRandomString(20),
                    Vehicle_Id: basicDetail._id,
                    TimeStamp: new Date().toString(),
                    Status: 'New'
                }

                Transactions.create(transaction, function(error, transaction) {
                    if (error) {
                        res.status(403).json({
                            'Error': 'Error while updating transaction'
                        });
                    } else {
                        var secret = {
                            Vehicle_Id: transaction.Vehicle_Id,
                            DigiSign: basicDetail.DigiSign
                        }
                        Secret.create(secret, function(error, secret) {
                            if (error) {
                                res.status(403).json({
                                    'Error': 'Error while updating transaction'
                                });
                            } else {
                                res.json({
                                    'Response': transaction
                                });
                            }
                        });
                    }

                });
            }
        });

    } else {
        res.staus(404).json({
            'Error': 'Required fields are missing or incorrect'
        });
    }

}

//==================================================================================================
//TRANSFER ROUTE
//==================================================================================================

handler.transfer = function(req, res) {
    //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
        
                  // Get token from header
        var token_id = typeof(req.headers.token_id) == 'string' ? req.headers.token_id : false;
        if(token_id){
          Token.find({'token_id':token_id},function(err,tokenData){
            if(err)
            {
                res.status(403);
            }else{
                handler_transfer[req.method.toLowerCase()](req, res);
            }

          });
        }else{
            res.status(403);
        }
    } else {
        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }

};
//handler fir transport
handler_transfer = {};

handler_transfer.post = function(req, res) {
        //check all the required fieds are filled out
        var Vehicle_Id = typeof(req.body.Vehicle_Id) == 'string' && req.body.Vehicle_Id.trim().length > 0 ? req.body.Vehicle_Id.trim() : false;
        var Dealer = typeof(req.body.Dealer) == 'string' && req.body.Dealer.trim().length > 0 ? req.body.Dealer.trim() : false;
        var Transfer_Date = typeof(req.body.Transfer_Date) == 'string' && req.body.Transfer_Date.trim().length > 0 ? req.body.Transfer_Date.trim() : false;
        var DigiSign = typeof(req.body.DigiSign) == 'string' && req.body.DigiSign.trim().length > 0 ? req.body.DigiSign.trim() : false;

        if (Vehicle_Id && Dealer && Transfer_Date && DigiSign) {

            Secret.findOne({
                    Vehicle_Id: Vehicle_Id
                })
                .exec(function(error, info) {
                    if (error) {
                        res.status(400).json({
                            'Error': 'Wrong Vehicle_Id'
                        });
                    } else {
                        //Check the digiSign match or not
                        if (info.DigiSign === helpers.hash(DigiSign)) {
                            var transferDetail = {
                                Vehicle_Id: Vehicle_Id,
                                Dealer: Dealer,
                                Transfer_Date: Transfer_Date,
                                DigiSign:helpers.hash(DigiSign)
                            }
                            Transfer.create(transferDetail, function(error, transferDetail) {
                                if (error) {
                                    res.status(400).json({
                                        'Error': 'Error while creating user'
                                    });
                                } else {
                                    var transaction = {
                                        Hash: helpers.createRandomString(20),
                                        Vehicle_Id: transferDetail.Vehicle_Id,
                                        TimeStamp: new Date().toString(),
                                        Status: 'Transfer to Dealer'
                                    }

                                    Transactions.create(transaction, function(error, transaction) {
                                        if (error) {
                                            res.status(400).json({
                                                'Error': 'Error while updating transaction'
                                            });
                                        } else {

                                            res.json({
                                                'Response': transaction
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(400).json({
                                'Error': 'DigiSign didn\'t match'
                            });
                        }

                    }
                });

        } else {
            res.status(400).json({
                'Error': 'Missing Required fields'
            });
        }
    }
    //===================================================================================================
    //SALES_ROUTE
    //====================================================================================================
handler.sales = function(req, res) {
    //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
        
                      // Get token from header
        var token_id = typeof(req.headers.token_id) == 'string' ? req.headers.token_id : false;
        if(token_id){
          Token.find({'token_id':token_id},function(err,tokenData){
            if(err)
            {
                res.status(403);
            }else{
                  handler_sales[req.method.toLowerCase()](req, res);
            }

          });
        }else{
            res.status(403);
        }
    } else {
        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }

};

//handler fir transport
handler_sales = {};
handler_sales.post = function(req, res) {
    //check all the required fieds are filled out
    var Buyer = typeof(req.body.Buyer) == 'string' && req.body.Buyer.trim().length > 0 ? req.body.Buyer.trim() : false;
    var Adhaar = typeof(req.body.Adhaar) == 'string' && req.body.Adhaar.trim().length > 0 ? req.body.Adhaar.trim() : false;
    var PAN_no = typeof(req.body.PAN_no) == 'string' && req.body.PAN_no.trim().length > 0 ? req.body.PAN_no.trim() : false;
    var SalesAmount = typeof(req.body.SalesAmount) == 'string' && req.body.SalesAmount.trim().length > 0 ? req.body.SalesAmount.trim() : false;
    var DigiSign = typeof(req.body.DigiSign) == 'string' && req.body.DigiSign.trim().length > 0 ? req.body.DigiSign.trim() : false;
    var Vehicle_Id = typeof(req.body.Vehicle_Id) == 'string' && req.body.Vehicle_Id.trim().length > 0 ? req.body.Vehicle_Id.trim() : false;
    if (Buyer && Adhaar && PAN_no && SalesAmount && DigiSign && Vehicle_Id) {

        Secret.findOne({
                Vehicle_Id: Vehicle_Id
            })
            .exec(function(error, info) {
                if (error) {
                    res.status(400).json({
                        'Error': 'Wrong Vehicle_Id'
                    });
                } else {
                    //Check the digiSign match or not
                    if (info.DigiSign ===helpers.hash(DigiSign)) {
                        var salesDetail = {
                            Buyer: Buyer,
                            Adhaar: Adhaar,
                            PAN_no: PAN_no,
                            SalesAmount: SalesAmount,
                            Vehicle_Id: Vehicle_Id,
                            DigiSign: helpers.hash(DigiSign)
                        }
                        Sales.create(salesDetail, function(error, salesDetail) {
                            if (error) {
                                res.status(400).json({
                                    'Error': 'Error while crating user'
                                });
                            } else {
                                var transaction = {
                                    Hash: helpers.createRandomString(20),
                                    Vehicle_Id: salesDetail.Vehicle_Id,
                                    TimeStamp: new Date().toString(),
                                    Status: 'Sold'
                                }

                                Transactions.create(transaction, function(error, transaction) {
                                    if (error) {
                                        res.status(400).json({
                                            'Error': 'Error while updating transaction'
                                        });
                                    } else {

                                        res.json({
                                            'Response': transaction
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        res.status(400).json({
                            'Error': 'DigiSign didn\'t match'
                        });
                    }

                }
            });

    } else {
        res.status(400).json({
            'Error': 'Missing Required fields'
        });
    }

}

//=========================================================================================================
//REGISTRATION_DETAILS
//=========================================================================================================

handler.register = function(req, res) {
    //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
       
              // Get token from header
        var token_id = typeof(req.headers.token_id) == 'string' ? req.headers.token_id : false;
        if(token_id){
          Token.find({'token_id':token_id},function(err,tokenData){
            if(err)
            {
                res.status(403);
            }else{
                  handler_register[req.method.toLowerCase()](req, res);
            }

          });
        }else{
            res.status(403);
        }
    } else {
        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }

};

//handler fir transport
handler_register = {};
handler_register.post = function(req, res) {
        //check all the required fieds are filled out
        var Registration_No = typeof(req.body.Registration_No) == 'string' && req.body.Registration_No.trim().length > 0 ? req.body.Registration_No.trim() : false;
        var Registration_Date = typeof(req.body.Registration_Date) == 'string' && req.body.Registration_Date.trim().length > 0 ? req.body.Registration_Date.trim() : false;
        var Expiry_Date = typeof(req.body.Expiry_Date) == 'string' && req.body.Expiry_Date.trim().length > 0 ? req.body.Expiry_Date.trim() : false;
        var Fee = typeof(req.body.Fee) == 'string' && req.body.Fee.trim().length > 0 ? req.body.Fee.trim() : false;
        var Authority = typeof(req.body.Authority) == 'string' && req.body.Authority.trim().length > 0 ? req.body.Authority.trim() : false;
        var Location = typeof(req.body.Location) == 'string' && req.body.Location.trim().length > 0 ? req.body.Location.trim() : false;
        var DigiSign = typeof(req.body.DigiSign) == 'string' && req.body.DigiSign.trim().length > 0 ? req.body.DigiSign.trim() : false;
        var Vehicle_Id = typeof(req.body.Vehicle_Id) == 'string' && req.body.Vehicle_Id.trim().length > 0 ? req.body.Vehicle_Id.trim() : false;

        if (Registration_No && Registration_Date && Expiry_Date && Fee && Authority && Location && DigiSign && Vehicle_Id) {

            Secret.findOne({
                    Vehicle_Id: Vehicle_Id
                })
                .exec(function(error, info) {
                    if (error) {
                        res.status(400).json({
                            'Error': 'Wrong Vehicle_Id'
                        });
                    } else {
                        //Check the digiSign match or not
                        if (info.DigiSign === helpers.hash(DigiSign)) {
                            var registrationDetail = {
                                Registration_No: Registration_No,
                                Registration_Date: Registration_Date,
                                Expiry_Date: Expiry_Date,
                                Fee: Fee,
                                Authority: Authority,
                                Location: Location,
                                Vehicle_Id: Vehicle_Id,
                                DigiSign: helpers.hash(DigiSign)
                            }
                            Register.create(registrationDetail, function(error, salesDetail) {
                                if (error) {
                                    res.status(400).json({
                                        'Error': 'Error while crating user'
                                    });
                                } else {
                                    var transaction = {
                                        Hash: helpers.createRandomString(20),
                                        Vehicle_Id: salesDetail.Vehicle_Id,
                                        TimeStamp: new Date().toString(),
                                        Status: 'Registered'
                                    }

                                    Transactions.create(transaction, function(error, transaction) {
                                        if (error) {
                                            res.status(400).json({
                                                'Error': 'Error while updating transaction'
                                            });
                                        } else {

                                            res.status(200).json({
                                                'Response': transaction
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(400).json({
                                'Error': 'DigiSign didn\'t match'
                            });
                        }

                    }
                });

        } else {
            res.status(400).json({
                'Error': 'Missing Required fields'
            });
        }

    }
    //=======================================================================================================
    //INSURANCE-ROUTE
    //=======================================================================================================
handler.insurance = function(req, res) {
    //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
       
          // Get token from header
        var token_id = typeof(req.headers.token_id) == 'string' ? req.headers.token_id : false;
        if(token_id){
          Token.find({'token_id':token_id},function(err,tokenData){
            if(err)
            {
                res.status(403);
            }else{
                 handler_insurance[req.method.toLowerCase()](req, res);
            }

          });
        }else{
            res.status(403);
        }

    } else {
        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }

};

//handler fir transport
handler_insurance = {};
handler_insurance.post = function(req, res) {
        //check all the required fieds are filled out
        var Expiry_Date = typeof(req.body.Expiry_Date) == 'string' && req.body.Expiry_Date.trim().length > 0 ? req.body.Expiry_Date.trim() : false;
        var Policy_Date = typeof(req.body.Policy_Date) == 'string' && req.body.Policy_Date.trim().length > 0 ? req.body.Policy_Date.trim() : false;
        var Policy_No = typeof(req.body.Policy_No) == 'string' && req.body.Policy_No.trim().length > 0 ? req.body.Policy_No.trim() : false;
        var Company = typeof(req.body.Company) == 'string' && req.body.Company.trim().length > 0 ? req.body.Company.trim() : false;
        var DigiSign = typeof(req.body.DigiSign) == 'string' && req.body.DigiSign.trim().length > 0 ? req.body.DigiSign.trim() : false;
        var Vehicle_Id = typeof(req.body.Vehicle_Id) == 'string' && req.body.Vehicle_Id.trim().length > 0 ? req.body.Vehicle_Id.trim() : false;

        if (Expiry_Date && Policy_Date && Policy_No && Company && DigiSign && Vehicle_Id) {

            Secret.findOne({
                    Vehicle_Id: Vehicle_Id
                })
                .exec(function(error, info) {
                    if (error) {
                        res.status(400).json({
                            'Error': 'Wrong Vehicle_Id'
                        });
                    } else {
                        //Check the digiSign match or not
                        if (info.DigiSign === helpers.hash(DigiSign)) {
                            var insuranceDetail = {
                                Policy_No: Policy_No,
                                Policy_Date: Policy_Date,
                                Expiry_Date: Expiry_Date,
                                Company: Company,
                                Vehicle_Id: Vehicle_Id,
                                DigiSign: helpers.hash(DigiSign)
                            }
                            Insurance.create(insuranceDetail, function(error, insuranceDetail) {
                                if (error) {
                                    res.status(400).json({
                                        'Error': 'Error while crating user'
                                    });
                                } else {
                                    var transaction = {
                                        Hash: helpers.createRandomString(20),
                                        Vehicle_Id: insuranceDetail.Vehicle_Id,
                                        TimeStamp: new Date().toString(),
                                        Status: 'Registered'
                                    }

                                    Transactions.create(transaction, function(error, transaction) {
                                        if (error) {
                                            res.status(400).json({
                                                'Error': 'Error while updating transaction'
                                            });
                                        } else {

                                            res.json({
                                                'Response': transaction
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(400).json({
                                'Error': 'DigiSign didn\'t match'
                            });
                        }

                    }
                });

        } else {
            res.status(400).json({
                'Error': 'Missing Required fields'
            });
        }

    }
    //========================================================================================================
    //MORTGAGE ROUTE
    //========================================================================================================

handler.mortgage = function(req, res) {
    //Container for the methods 
    var acceptableMethods = ['post'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
       
         // Get token from header
        var token_id = typeof(req.headers.token_id) == 'string' ? req.headers.token_id : false;
        if(token_id){
          Token.find({'token_id':token_id},function(err,tokenData){
            if(err)
            {
                res.status(403);
            }else{
                handler_mortgage[req.method.toLowerCase()](req, res);
            }

          });
        }else{
            res.status(403);
        }
    } else {
        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }

};

//handler fir transport
handler_mortgage = {};
handler_mortgage.post = function(req, res) {
        //check all the required fieds are filled out
        var Status = typeof(req.body.Status) == 'string' && req.body.Status.trim().length > 0 ? req.body.Status.trim() : false;
        var Amount = typeof(req.body.Amount) == 'string' && req.body.Amount.trim().length > 0 ? req.body.Amount.trim() : false;
        var Company = typeof(req.body.Company) == 'string' && req.body.Company.trim().length > 0 ? req.body.Company.trim() : false;
        var DigiSign = typeof(req.body.DigiSign) == 'string' && req.body.DigiSign.trim().length > 0 ? req.body.DigiSign.trim() : false;
        var Vehicle_Id = typeof(req.body.Vehicle_Id) == 'string' && req.body.Vehicle_Id.trim().length > 0 ? req.body.Vehicle_Id.trim() : false;

        if (Status && Amount && Company && DigiSign && Vehicle_Id) {

            Secret.findOne({
                    Vehicle_Id: Vehicle_Id
                })
                .exec(function(error, info) {
                    if (error) {
                        res.status(400).json({
                            'Error': 'Wrong Vehicle_Id'
                        });
                    } else {
                        //Check the digiSign match or not
                        if (info.DigiSign === helpers.hash(DigiSign)) {
                            var mortgageDetail = {
                                Company: Company,
                                Amount: Amount,
                                Status: Status,
                                Vehicle_Id: Vehicle_Id,
                                DigiSign: helpers.hash(DigiSign)
                            }
                            Mortgage.create(mortgageDetail, function(error, mortgageDetail) {
                                if (error) {
                                    res.status(400).json({
                                        'Error': 'Error while crating user'
                                    });
                                } else {
                                    var transaction = {
                                        Hash: helpers.createRandomString(20),
                                        Vehicle_Id: mortgageDetail.Vehicle_Id,
                                        TimeStamp: new Date().toString(),
                                        Status: 'Registered'
                                    }

                                    Transactions.create(transaction, function(error, transaction) {
                                        if (error) {
                                            res.status(400).json({
                                                'Error': 'Error while updating transaction'
                                            });
                                        } else {

                                            res.json({
                                                'Response': transaction
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(400).json({
                                'Error': 'DigiSign didn\'t match'
                            });
                        }

                    }
                });

        } else {
            res.status(400).json({
                'Error': 'Missing Required fields'
            });
        }

    }
    //=======================================================================================================
    //ALL_TRANSACTIONS
    //=======================================================================================================

handler.allTransaction = function(req, res) {
    //Container for the methods 

    var acceptableMethods = ['get'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
        // Get token from header
        var token_id = typeof(req.headers.token_id) == 'string' ? req.headers.token_id : false;
        if(token_id){
          Token.findOne({'token_id':token_id},function(err,tokenData){
            if(err)
            {
               
                res.status(403);
               
            }else{
                
                handler_allTransaction[req.method.toLowerCase()](req, res);

            }

          });
        }else{
          
            res.status(403);

        }

    } else {

        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }

};

handler_allTransaction = {};

handler_allTransaction.get = function(req, res) {

    Transactions.find({}, {}, {
        skip: 0,
        sort: {
            Vehicle_Id: -1
        }
    }, function(err, transactions) {
        if (err) {

            res.status(400).json({
                'Error': 'Error while fetching Transactions'
            });
        } else {
            res.status(200).json({
                'Response': transactions
            });
        }
    });

}

//==================================================================================================
//SEARCH-HANDLER
//==================================================================================================
handler.search = function(req, res) {
    //Container for the methods 
    var acceptableMethods = ['get'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {

       
                   // Get token from header
        var token_id = typeof(req.headers.token_id) == 'string' ? req.headers.token_id : false;
        if(token_id){
          Token.find({'token_id':token_id},function(err,tokenData){
            if(err)
            {
                res.status(403);
            }else{
                 handler_search[req.method.toLowerCase()](req, res);
            }

          });
        }else{
            res.status(403);
        }

    } else {
        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }
}

handler_search = {};

handler_search.get = function(req, res) {
    var searchParam = {};
    if (req.query.Vehicle_Id)
        searchParam._id = req.query.Vehicle_Id;
    if (req.query.Type)
        searchParam.Type = req.query.Type;
    if (req.query.Manufacturer)
        searchParam.Manufacturer = req.query.Manufacturer;
    if (req.query.Model_No)
        searchParam.Model_No = req.query.Model_No;
    if (req.query.Model_Year)
        searchParam.Model_Year = req.query.Model_Year;
    if (req.query.Chassis_No)
        searchParam.Chassis_No = req.query.Chassis_No;
    if (req.query.Status)
        searchParam.Status = req.query.Status;

    BasicDetail.find(searchParam, function(err, allVehicle) {
        if (err) {
            res.status(400).json({
                'Error': searchParam
            });
        } else {
            res.json({
                'Response': allVehicle
            });
        }
    });

};

//=================================================================================================
//INFO_ROUTE
//=================================================================================================

handler.info = function(req, res) {
    //Container for the methods 
    var acceptableMethods = ['get'];

    //Check if the method of the request made 
    if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
      
           // Get token from header
        var token_id = typeof(req.headers.token_id) == 'string' ? req.headers.token_id : false;
        if(token_id){
          Token.find({'token_id':token_id},function(err,tokenData){
            if(err)
            {
                res.status(403);
            }else{
                  handler_info[req.method.toLowerCase()](req, res);
            }

          });

        }else{
            res.status(403);
        }
    } else {
        res.status(400).json({
            'Error': 'Route doesnot exists'
        });
    }

};
handler_info = {};
handler_info.get = function(req, res) {
    var responseObj = {};

    BasicDetail.find({
        '_id': req.query.Vehicle_Id
    }, function(err, vehicle) {
        if (err) {
            res.status(400).json({
                'Error': searchParam
            });
        } else {

            if (vehicle !== null) {
                responseObj.BasicDetail = vehicle;
                Transfer.find({
                    'Vehicle_Id': req.query.Vehicle_Id
                }, function(err, tvehicle) {
                    if (tvehicle !== null) {
                        responseObj.TransferDetail = tvehicle;
                        Sales.find({
                            'Vehicle_Id': req.query.Vehicle_Id
                        }, function(err, svehicle) {
                            if (svehicle != null) {
                                responseObj.SalesDetail = svehicle;
                                Register.find({
                                    'Vehicle_Id': req.query.Vehicle_Id
                                }, function(err, rvehicle) {
                                    if (err) {
                                        res.status(400).json({
                                            'Error': searchParam
                                        });
                                    } else {
                                        if (rvehicle != null) {
                                            responseObj.RegistrationDetail = rvehicle
                                            Insurance.find({
                                                'Vehicle_Id': req.query.Vehicle_Id
                                            }, function(err, ivehicle) {
                                                if (err) {
                                                    res.status(400).json({
                                                        'Error': searchParam
                                                    });
                                                } else {
                                                    if (ivehicle != null) {
                                                        responseObj.InsuranceDetail = ivehicle;
                                                        Mortgage.find({
                                                            'Vehicle_Id': req.query.Vehicle_Id
                                                        }, function(err, mvehicle) {
                                                            if (err) {
                                                                res.status(400).json({
                                                                    'Error': searchParam
                                                                });
                                                            } else {
                                                                if (mvehicle != null) {
                                                                    responseObj.MortgageDetail = mvehicle;
                                                                    res.json({
                                                                        'Response': responseObj
                                                                    });
                                                                } else {
                                                                    responseObj.MortgageDetail = null;
                                                                    res.json({
                                                                        'Response': responseObj
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    } else {
                                                        responseObj.InsuranceDetail = null;
                                                        res.json({
                                                            'Response': responseObj
                                                        });
                                                    }
                                                }
                                            });
                                        } else {
                                            responseObj.RegistrationDetail = null;
                                            res.json({
                                                'Response': responseObj
                                            });
                                        }
                                    }
                                });
                            } else {
                                responseObj.SalesDetail = null;
                                res.json({
                                    'Response': responseObj
                                });
                            }
                        });
                    } else {
                        responseObj.TransferDetail = null;
                        res.json({
                            'Response': responseObj
                        });
                    }

                });
            } else {
                responseObj.BasicDetail = null;
                res.json({
                    'Response': responseObj
                });
            }
        }
    });

}


//====================================================================================================
//TOKEN_ROUTE
//====================================================================================================


//Handler for token 
handler.tokens = function(req, res) {
        //check the method 
        var acceptableMethods = ['post', 'get', 'put', 'delete'];
        if (acceptableMethods.indexOf(req.method.toLowerCase()) > -1) {
            handler_tokens[req.method.toLowerCase()](req, res);
        } else {
            res.status(405).json({
                'Error': 'Error in the request method'
            });
        }
    }
    //Container for token submethods
var handler_tokens = {};

//Token-post
//Required Field:phone,password
//Optional data:none 
handler_tokens.post = function(req, res) {
    var phone_no = typeof(req.body.phone_no) == 'string' && req.body.phone_no.trim().length == 10 ? req.body.phone_no.trim() : false;
    var password = typeof(req.body.password) == 'string' && req.body.password.trim().length > 0 ? req.body.password.trim() : false;
    if (phone_no && password) {
        //Lookup  for the user with the given phone_no
        var query = {};
        query.phone_no = phone_no;
        User.findOne(query, function(err, userData) {
            if (!err && userData) {
                //Hash the password from the data,and check its validation 
                var hashedPassword = helpers.hash(password);
                if (hashedPassword === userData.password) {
                    //generate the token ,and set the expiration time to 1 hour in time
                    var token = helpers.createRandomString(20);
                    var expires = Date.now() + 1000 * 60 * 60;

                    var tokenObj = {
                        'phone_no': phone_no,
                        'token_id': token,
                        'expires': expires
                    };
                    //create token for the user

                    Token.create(tokenObj, function(err, token) {
                        if (!err) {
                            res.status(200).json({
                                'Response': tokenObj
                            });
                        } else {
                            res.status(500).json({
                                'Error': 'Could not create new token' + err
                            });
                        }
                    });



                } else {
                    res.status(404).json({
                        'Error': 'Password entered is incorrect'
                    });
                }


            } else {
                res.status(404).json({
                    'Error': 'No such user exist'
                });
            }
        });

    } else {
        res.status(400).json({
            'Error': 'Required Fields are incorrect or missing'
        });
    }

};

//TOKEN-GET
//Required data :token_id
//Optional data :none
handler_tokens.get = function(req, res) {
    var token_id = typeof(req.query.token_id) == 'string' && req.query.token_id.trim().length == 20 ? req.query.token_id.trim() : false;
    if (token_id) {


        Token.findOne({
            'token_id': token_id
        }, function(err, usertoken) {
            if (!err && usertoken) {
                res.status(200).json({
                    'Response': usertoken
                });
            } else {
                res.status(404).json({
                    'Error': 'Error while finding the required token'
                });
            }
        });
    } else {
        res.status(400).json({
            'Error': 'Missing required field,or field is invalid'
        });
    }
};


//TOKEN-PUT
//Required data:token_id,extend
//Optional data:none

handler_tokens.put = function(req, res) {
    var token_id = typeof(req.body.token_id) == 'string' && req.body.token_id.trim().length == 20 ? req.body.token_id.trim() : false;
    var extend = typeof(req.body.extend) == 'boolean' && req.body.extend == true ? true : false;
    if (token_id && extend) {
        //LookUp for existing token 

        //  Token.findOne({'token_id':token_id},function(err,usertoken){
        // if(!err){
        //   //Check to make sure token is not expired yet 
        //    console.log(usertoken.expires+"----- "+Date.now());
        //   if(usertoken.expires>Date.now().toString())
        //   {
        // Set the expiration an hour from now
        // usertoken.expires = Date.now() + 1000 * 60 * 60;
        // Store the new updates

        Token.findOneAndUpdate({
                'token_id': token_id
            }, {
                $set: {
                    expires: (Date.now() + 1000 * 60 * 60)
                }
            }, {
                new: true,
                runValidators: true,
                context: 'query'
            },
            function(err, usertoken) {
                if (!err) {
                    res.status(200).json({
                        'Response': usertoken
                    });
                } else {
                    res.status(500).json({
                        'Error': 'Could not update the token\'s expiration.'
                    });
                }
            });

        //     }else{
        //       res.status(400).json({'Error':'Token has altready expired can\'t be extended'});
        //     }
        //   }
        //   else{
        //     res.status(404);
        //   }
        // });
    } else {
        res.status(400).json({
            'Error': 'Required fields are missing or invalid'
        });
    }
};

//TOKEN_DELETE
//required-field:id
//Optional-Fields:none
handler_tokens.delete = function(req, res) {
    var token_id = typeof(req.query.token_id) == 'string' && req.query.token_id.trim().length == 20 ? req.query.token_id.trim() : false;
    if (token_id) {
        // Lookup the token

        Token.find({
            'token_id': token_id
        }, function(err, tokenData) {
            if (!err && tokenData) {
                // Delete the token

                Token.findOneAndRemove({
                    'token_id': token_id
                }, function(err) {
                    if (!err) {
                        res.status(200).json({
                            'Response': true
                        });
                    } else {
                        res.status(500).json({
                            'Error': 'Could not delete the specified token'
                        });
                    }
                });
            } else {
                res.status(400).json({
                    'Error': 'Could not find the specified token.'
                });
            }
        });
    } else {
        res.status(400).json({
            'Error': 'Required fields are missing or Invaid'
        })
    }
};

//Verify the given user's phone and token_id
handler_tokens.verifyToken = function(phone_no, token_id, callback) {


    Token.findOne({
        'token_id': token_id
    }, function(err, tokenData) {
        if (!err && tokenData) {
            if (tokenData.phone_no == phone_no && tokenData.expires > Date.now()) {
                callback(true);
            } else {

                callback(false);
            }
        } else {

            callback(false);
        }
    });
};



//Export the handler
module.exports = handler;