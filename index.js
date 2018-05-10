/*
 *Primary file for api
 *
 */

 //Dependencies
 var server = require("./lib/server");

 // Declare the app
 var app={};

// Init function 
app.init=function(){
 
 //Start the servers
  server.listen(process.env.PORT||8080, function(){
   console.log("The Vehicle Poc Server Has Started!");
  });

};
//Execute only when called from the command line
if(require.main == module)
{
	app.init();
}

//Export the app
module.exports=app;