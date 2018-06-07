/*
 * Frontend Logic for application
 *
 */

// Container for frontend application
var app = {};

// Config
app.config = {
  'sessionToken' : false
};

// AJAX Client (for RESTful API)
app.client = {}

// Interface for making API calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){

  // Set defaults
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl+='&';
       }
       // Add the key and value
       requestUrl+=queryKey+'='+queryStringObject[queryKey];
     }
  }

  // Form the http request as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }

  // If there is a current session token set, add that as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token_id", app.config.sessionToken.token_id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;
        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            return callback(statusCode,parsedResponse);
          } catch(e){
            console.log(e);
            return callback(statusCode,false);
          }

        }
      }
  }

  // Send the payload as JSON
 var payloadString = JSON.stringify(payload);
 xhr.send(payloadString);


};

app.bindButtons = function(){
    // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for Transaction page
  if(primaryClass === 'search'){

         document.getElementsByName("Transfer")[0].addEventListener("click",function(e){
        var phone = typeof(app.config.sessionToken.phone_no) == 'string' ? app.config.sessionToken.phone_no : false;
        if(phone){
          var table=document.getElementById("infoListTable");
          var selected = table.getElementsByClassName('selected');
          var Vehicle_Id= selected[0].cells[0].innerHTML;
          var formType = document.getElementsByClassName('transfer')[0];
          var overlay = document.getElementsByClassName('overlay')[0];
          overlay.style.display='block';
          formType.style.display='block';
          var cancelBtn= formType.getElementsByClassName('close')[0];
          cancelBtn.onclick=overlayDisable;
          function overlayDisable(){
            document.querySelector(".overlay").style.display='none';
            document.getElementsByClassName('transfer')[0].style.display='none';
             document.querySelector(".formError").style.display = 'none';
             document.querySelector(".formSuccess").style.display='none';
          }
          console.log(Vehicle_Id);
          var form = document.getElementById('transferVehicle');
          form.elements.namedItem("Vehicle_Id").value=Vehicle_Id;
          console.log(form.elements.namedItem("Vehicle_Id").value);
        } else {
        app.logUserOut();
      }
           
      });

      document.getElementsByName("Sales")[0].addEventListener("click",function(e){
        var phone = typeof(app.config.sessionToken.phone_no) == 'string' ? app.config.sessionToken.phone_no : false;
        if(phone){
          var table=document.getElementById("infoListTable");
          var selected = table.getElementsByClassName('selected');
          var Vehicle_Id= selected[0].cells[0].innerHTML;
          var formType = document.getElementsByClassName('sale')[0];
          var overlay = document.getElementsByClassName('overlay')[0];
          overlay.style.display='block';
          formType.style.display='block';

          var cancelBtn= formType.getElementsByClassName('close')[0];
          cancelBtn.onclick=overlayDisable;
          function overlayDisable(){
            document.querySelector(".overlay").style.display='none';
            document.getElementsByClassName('sale')[0].style.display='none';
            document.querySelector(".formError").style.display = 'none';
            document.querySelector(".formSuccess").style.display='none';
          }

          var form = document.getElementById('saleVehicle');
          form.elements.namedItem("Vehicle_Id").value=Vehicle_Id;
           

          

        } else {
        app.logUserOut();
      }
      });

      document.getElementsByName("Registration")[0].addEventListener("click",function(e){
         var phone = typeof(app.config.sessionToken.phone_no) == 'string' ? app.config.sessionToken.phone_no : false;
         if(phone){
          var table=document.getElementById("infoListTable");
          var selected = table.getElementsByClassName('selected');
          var Vehicle_Id= selected[0].cells[0].innerHTML;
          var formType = document.getElementsByClassName('register')[0];
          var overlay = document.getElementsByClassName('overlay')[0];
          overlay.style.display='block';
          formType.style.display='block';

          var cancelBtn= formType.getElementsByClassName('close')[0];
          cancelBtn.onclick=overlayDisable;
          function overlayDisable(){
            document.querySelector(".overlay").style.display='none';
             document.getElementsByClassName('register')[0].style.display='none';
             document.querySelector(".formError").style.display = 'none';
             document.querySelector(".formSuccess").style.display='none';
          }
          var form = document.getElementById('registerVehicle');
          form.elements.namedItem("Vehicle_Id").value=Vehicle_Id;
          



          } else {
         app.logUserOut();
        }
      });
      document.getElementsByName("Insurance")[0].addEventListener("click",function(e){
         var phone = typeof(app.config.sessionToken.phone_no) == 'string' ? app.config.sessionToken.phone_no : false;
         if(phone){
          var table=document.getElementById("infoListTable");
          var selected = table.getElementsByClassName('selected');
          var Vehicle_Id= selected[0].cells[0].innerHTML;
           var formType = document.getElementsByClassName('insurance')[0];
          var overlay = document.getElementsByClassName('overlay')[0];
          overlay.style.display='block';
          formType.style.display='block';

          var cancelBtn= formType.getElementsByClassName('close')[0];
          cancelBtn.onclick=overlayDisable;
          function overlayDisable(){
            document.querySelector(".overlay").style.display='none';
            document.getElementsByClassName('insurance')[0].style.display='none';
            document.querySelector(".formError").style.display = 'none';
            document.querySelector(".formSuccess").style.display='none';
          }
          var form = document.getElementById('insuranceVehicle');
          form.elements.namedItem("Vehicle_Id").value=Vehicle_Id;
         } else {
         app.logUserOut();
        }
      });
      document.getElementsByName("Mortgage")[0].addEventListener("click",function(e){
         var phone = typeof(app.config.sessionToken.phone_no) == 'string' ? app.config.sessionToken.phone_no : false;
         if(phone){
          var table=document.getElementById("infoListTable");
          var selected = table.getElementsByClassName('selected');
          var Vehicle_Id= selected[0].cells[0].innerHTML;

          var formType = document.getElementsByClassName('mortgage')[0];
          var overlay = document.getElementsByClassName('overlay')[0];
          overlay.style.display='block';
          formType.style.display='block';
          var cancelBtn= formType.getElementsByClassName('close')[0];
          cancelBtn.onclick=overlayDisable;
          function overlayDisable(){
            document.querySelector(".overlay").style.display='none';
            document.getElementsByClassName('mortgage')[0].style.display='none';
            document.querySelector(".formError").style.display = 'none';
            document.querySelector(".formSuccess").style.display='none';
          }
          var form = document.getElementById('mortgageVehicle');
          form.elements.namedItem("Vehicle_Id").value=Vehicle_Id;
          } else {
         app.logUserOut();
        }
      });
  } 

};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};



// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.token_id) == 'string' ? app.config.sessionToken.token_id : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'token_id' : tokenId
  };
 
  app.client.request(undefined,'api/token','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){

    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    if(redirectUser){
      window.location = '/session/deleted';
    }
  });
};


// Bind the forms
app.bindForms = function(){
  if(document.querySelector("form")){

    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();

        // Htoken_ide the error message (if it's currently shown due to a previous error)
        if( document.querySelector("#"+formId+" .formError")){
        document.querySelector("#"+formId+" .formError").style.display = 'none';
        }

        // Htoken_ide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#"+formId+" .formSuccess")){
          document.querySelector("#"+formId+" .formSuccess").style.display = 'none';
        }


      // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            // Determine class of element and set value accordingly
            var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            var elementIsChecked = elements[i].checked;
            // Override the method of the form if the input's name is _method
            var nameOfElement = elements[i].name;
            if(nameOfElement == '_method'){
              method = valueOfElement;
            } else {
              // Create an payload field named "method" if the elements name is actually httpmethod
              if(nameOfElement == 'httpmethod'){
                nameOfElement = 'method';
              }
                // Create an payload field named "id" if the elements name is actually uid
              if(nameOfElement == 'uid'){
                nameOfElement = 'id';
              }
              // If the element has the class "multiselect" add its value(s) as array elements
              if(classOfElement.indexOf('multiselect') > -1){
                if(elementIsChecked){
                  payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                  payload[nameOfElement].push(valueOfElement);
                }
              } else {
                payload[nameOfElement] = valueOfElement;
              }

            }
          }
        }

       // If the method is DELETE, the payload should be a queryStringObject instead
        var queryStringObject = method == 'DELETE' || method == 'GET' ? payload : {};
        // Call the API
        app.client.request(undefined,path,method,queryStringObject,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode !== 200){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector(".formError").innerHTML = error;

              // Show the form error field on the form
              document.querySelector(".formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
     
            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    }
  }
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the phone_no and password, and use it to log the user in
    var newPayload = {
      'phone_no' : requestPayload.phone_no,
      'password' : requestPayload.password
    };

    app.client.request(undefined,'api/token','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed
      if(newStatusCode !== 200){

        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhtoken_ide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        
        app.setSessionToken(newResponsePayload);
        window.location = '/home';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    window.location = '/home';
  }

  if(formId == 'addVehicle'){
       
         document.getElementsByName("Hash")[0].value=responsePayload.Response.Hash;
         document.getElementsByName("Vehicle_Id")[0].value=responsePayload.Response.Vehicle_Id.toString();
         document.getElementsByName("TimeStamp")[0].value=responsePayload.Response.TimeStamp.toString();
         document.getElementsByName("Status")[0].value=responsePayload.Response.Status.toString();
         document.querySelector(".overlay").style.display='block';
         document.querySelector(".modal").style.display='block';
       
       
  }

  if(formId=='search'){

     app.loadInfoOnPage(responsePayload);
  }
  if(formId=='transferVehicle'){
   document.querySelector(".formError").style.display='none';
   document.querySelector(".formSuccess").style.display='none';
   document.querySelector(".transfer").style.display='none';
   app.loadBlockChainInfo(responsePayload);
    document.querySelector(".formSuccess").innerHTML = "Dealer's Detail updated successfully!";
    document.querySelector(".formSuccess").style.display="block";
  }

  if(formId=='saleVehicle'){
    document.querySelector(".formError").style.display='none';
    document.querySelector(".formSuccess").style.display='none';
    document.querySelector(".sale").style.display='none';
    app.loadBlockChainInfo(responsePayload);
    document.querySelector(".formSuccess").innerHTML = "Sales Detail updated successfully!";
     document.querySelector(".formSuccess").style.display="block";
           
  }
 
  if(formId=='registerVehicle'){
    document.querySelector(".formError").style.display='none';
    document.querySelector(".formSuccess").style.display='none';
    document.querySelector(".register").style.display='none';

    app.loadBlockChainInfo(responsePayload);
    document.querySelector(".formSuccess").innerHTML = "Registration Detail updated successfully!";
    document.querySelector(".formSuccess").style.display="block";
  }
  if(formId=='insuranceVehicle'){
    document.querySelector(".formError").style.display='none';
    document.querySelector(".formSuccess").style.display='none';
    document.querySelector(".insurance").style.display='none';
    app.loadBlockChainInfo(responsePayload);
      document.querySelector(".formSuccess").innerHTML = "Insurance Detail updated successfully!";
     document.querySelector(".formSuccess").style.display="block";
  }
  if(formId=='mortgageVehicle'){
    document.querySelector(".formError").style.display='none';
    document.querySelector(".formSuccess").style.display='none';
    document.querySelector(".mortgage").style.display='none';
     app.loadBlockChainInfo(responsePayload);
     document.querySelector(".formSuccess").innerHTML = "Mortgage Detail updated successfully!";
     document.querySelector(".formSuccess").style.display="block";
  }


};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem("token_id");
  
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){

   app.config.sessionToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : {};
  var tokenString = JSON.stringify(token.Response);

  localStorage.setItem("token_id",tokenString);
   
   

  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;

  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'token_id' : currentToken.token_id,
      'extend' : true,
    };
    app.client.request(undefined,'api/token','PUT',undefined,payload,function(statusCode,responsePayload){
  
          if(statusCode == 200){
           app.setSessionToken(responsePayload);
            callback(false);
         } else {
          
            app.setSessionToken(false);
             callback(true);
         
        }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      }

    });
  },1000 * 60);
};

app.loadBlockChainInfo = function(responsePayload){
      var div=document.getElementsByClassName("blockchainDetail")[0];
            div.getElementsByClassName("Hash")[0].value=responsePayload.Response.Hash.toString();
            div.getElementsByClassName("Vehicle_Id")[0].value=responsePayload.Response.Vehicle_Id.toString();
            div.getElementsByClassName("TimeStamp")[0].value=responsePayload.Response.TimeStamp.toString();
            div.getElementsByClassName("Status")[0].value=responsePayload.Response.Status.toString();
             document.querySelector(".overlay").style.display='block';
             document.querySelector(".blockchainDetail").style.display='block';

       
          div.getElementsByClassName("cta")[0].onclick=overlayDisable;
            function overlayDisable(e){
            document.querySelector(".overlay").style.display='none';
            document.querySelector(".blockchainDetail").style.display='none';
            document.querySelector(".formSuccess").style.display='none';
            document.querySelector(".formError").style.display='none';
          }

};

app.loadAddCheck = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for Transaction page
  if(primaryClass === 'homeAdd'){
     var phone = typeof(app.config.sessionToken.phone_no) == 'string' ? app.config.sessionToken.phone_no : false;
  if(!phone){
    app.logUserOut();
   }
 } 
}
app.loadHomeCheck = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for Transaction page
  if(primaryClass === 'search' ){
     var phone = typeof(app.config.sessionToken.phone_no) == 'string' ? app.config.sessionToken.phone_no : false;
  if(!phone){
    app.logUserOut();
   }
 } 

}
// Load data on the page
app.loadDataOnPage = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for Transaction page
  if(primaryClass === 'homeTrans'){
    app.loadTransactionPage();
  } 
};

// Load the dashboard page specifically
app.loadTransactionPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone_no) == 'string' ? app.config.sessionToken.phone_no : false;
  if(phone){
    // Fetch the user data
           
   
            app.client.request(undefined,'api/transaction','GET',undefined,undefined,function(statusCode,responsePayload){
              if(statusCode === 200){
                  
                 var allTrans = typeof(responsePayload.Response) == 'object' && responsePayload.Response instanceof Array && responsePayload.Response.length > 0 ? responsePayload.Response:[];
                     
                   if(allTrans.length > 0){
              
                 allTrans.forEach(function(element){
                 // //       //Make the check data into a table row
                  var table = document.getElementById("transListTable");
                  
                    var tr = table.insertRow(-1);
                    tr.classList.add('checkRow');
                    var td0 = tr.insertCell(0);
                    var td1 = tr.insertCell(1);
                    var td2 = tr.insertCell(2);
                    var td3 = tr.insertCell(3);

                
                    td0.innerHTML = element.Hash;
                    td1.innerHTML = element.Vehicle_Id;
                    td2.innerHTML = element.TimeStamp;
                    td3.innerHTML = element.Status;
                    
                    
                 });

                    
                  }else{
                   
                                         // Show 'you have no checks' message
                     document.getElementById("noTransMessage").style.display = 'table-row';
        
                 }
                
              } else if(statusCode == 403) {
                  app.logUserOut();
              }
              else{
                  document.querySelector(".formError").innerHTML=responsePayload.Error;
                  document.querySelector(".formError").style.display="block";
              }
          });
         
  } else {
    app.logUserOut();
  }
};

app.loadInfoOnPage=function(responsePayload){
  var phone = typeof(app.config.sessionToken.phone_no) == 'string' ? app.config.sessionToken.phone_no : false;
  if(phone){
   var allTrans = typeof(responsePayload.Response) == 'object' && responsePayload.Response instanceof Array && responsePayload.Response.length > 0 ? responsePayload.Response:[];
                     
                   if(allTrans.length > 0){

                  document.getElementById("noVehicleMessage").style.display='none';

                  var table = document.getElementById("infoListTable");
                  for(var i = table.rows.length - 1; i > 1; i--)
                  {
                   table. deleteRow(i);
                  }

                 allTrans.forEach(function(element){
                 // //       //Make the check data into a table row
                 
                  
                    var tr = table.insertRow(-1);
                    var td0 = tr.insertCell(0);
                    var td1 = tr.insertCell(1);
                    var td2 = tr.insertCell(2);
                    var td3 = tr.insertCell(3);
                    var td4 = tr.insertCell(4);
                    var td5 = tr.insertCell(5);
                  //  var td6 = tr.insertCell(6);
                    var td7 = tr.insertCell(6);
                  
                
                    td0.innerHTML = element._id;
                    td1.innerHTML = element.Type;
                    td2.innerHTML = element.Manufacturer;
                    td3.innerHTML = element.Model_No;
                    td4.innerHTML = element.Model_Year;
                    td5.innerHTML = element.Chassis_No;
                    td7.innerHTML = '<form method="get" action="api/info?Vehicle_Id='+element._id+'"><input type="submit" value="Info"/></form>';
                  
                  var selected = table.getElementsByClassName('selected');

                   tr.onclick=addClass;

                   function addClass(e){
                        
                        for(var i = 0 ;i<selected.length;i++)
                        {
                       
                          selected[i].classList.remove('selected');
                        }
                        e.target.parentNode.classList.toggle('selected');
                      
                   }
      
            
                    td7.addEventListener("submit", function(e){
                        e.preventDefault();
                     
                        var path = "api/info";
                        var method ="GET";
                        var queryStringObject={};
                            queryStringObject.Vehicle_Id=element._id;

                         //API CALL
                          app.client.request(undefined,path,method,queryStringObject,undefined,function(statusCode,responsePayload){
                          // Display an error on the form if needed
                          if(statusCode !== 200){

                            if(statusCode == 403){
                              // log the user out
                              app.logUserOut();

                            } else {

                              // Try to get the error from the api, or set a default error message
                              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

                              // Set the formError field with the error text
                              document.querySelector(".formError").innerHTML = error;

                              // Show the form error field on the form
                              document.querySelector(".formError").style.display = 'block';
                            }
                          } else {
                            // If successful, send to form response processor
                            //app.formResponseProcessor(formId,payload,responsePayload);
                              if(responsePayload.Response && responsePayload.Response.BasicDetail[0]){
                              document.getElementsByName("Type_Detail")[0].value="Type: "+responsePayload.Response.BasicDetail[0].Type;
                              document.getElementsByName("Info_Vehicle_Id")[0].value="Vehicle_Id: "+responsePayload.Response.BasicDetail[0]._id;
                              document.getElementsByName("Info_Status")[0].value="Status: New";
                              document.getElementsByName("Manufacturer_Detail")[0].value="Manufacturer: "+responsePayload.Response.BasicDetail[0].Manufacturer;
                              document.getElementsByName("Model_year_Detail")[0].value="Model Year: "+responsePayload.Response.BasicDetail[0].Model_Year;
                              document.getElementsByName("Model_no_Detail")[0].value="Model No: "+responsePayload.Response.BasicDetail[0].Model_No;
                              document.getElementsByName("Chassis_no_Detail")[0].value="Chassis No: "+responsePayload.Response.BasicDetail[0].Chassis_No;
                              }else{
                              document.getElementsByName("Type_Detail")[0].value="Type: ";
                              document.getElementsByName("Vehicle_Id")[0].value="Vehicle_Id: ";
                              document.getElementsByName("Info_Status")[0].value="Status: ";
                              document.getElementsByName("Manufacturer_Detail")[0].value="Manufacturer: ";
                              document.getElementsByName("Model_year_Detail")[0].value="Model Year: ";
                              document.getElementsByName("Model_no_Detail")[0].value="Model No: ";
                              document.getElementsByName("Chassis_no_Detail")[0].value="Chassis No: ";

                              }
                              if(responsePayload.Response && responsePayload.Response.TransferDetail[0]){
                              document.getElementsByName("Dealer_name")[0].value="Dealer: "+responsePayload.Response.TransferDetail[0].Dealer;
                               document.getElementsByName("Info_Status")[0].value="Status: Transfered to Dealer";
                              document.getElementsByName("Transfer_date")[0].value="Transfer Date: "+responsePayload.Response.TransferDetail[0].Transfer_Date;
                              }else{
                              document.getElementsByName("Dealer_name")[0].value="Dealer: ";
                              document.getElementsByName("Transfer_date")[0].value="Transfer Date: ";
                              }
                              if(responsePayload.Response && responsePayload.Response.SalesDetail[0]){
                              document.getElementsByName("Buyer")[0].value="Buyer: "+responsePayload.Response.SalesDetail[0].Buyer;
                               document.getElementsByName("Info_Status")[0].value="Status: Sold";
                              document.getElementsByName("Sale_amount")[0].value="Sale Amount: "+responsePayload.Response.SalesDetail[0].SalesAmount;
                              document.getElementsByName("Adhaar")[0].value="Adhaar: "+responsePayload.Response.SalesDetail[0].Adhaar;
                              document.getElementsByName("Pan_no")[0].value="PAN No: "+responsePayload.Response.SalesDetail[0].PAN_no;
                              }else{
                              document.getElementsByName("Buyer")[0].value="Buyer: ";
                              document.getElementsByName("Sale_amount")[0].value="Sale Amount: ";
                              document.getElementsByName("Adhaar")[0].value="Adhaar: ";
                              document.getElementsByName("Pan_no")[0].value="PAN No: ";
                              }
                              if(responsePayload.Response && responsePayload.Response.RegistrationDetail[0]){
                              document.getElementsByName("Registration_no")[0].value="Registration No: "+responsePayload.Response.RegistrationDetail[0].Registration_No;
                               document.getElementsByName("Info_Status")[0].value="Status: Registered";
                              document.getElementsByName("Fee")[0].value="Fee: "+responsePayload.Response.RegistrationDetail[0].Fee;
                              document.getElementsByName("Date")[0].value="Date: "+responsePayload.Response.RegistrationDetail[0].Registration_Date;
                              document.getElementsByName("Expiry_date")[0].value="Expiry Date: "+responsePayload.Response.RegistrationDetail[0].Expiry_Date;
                              document.getElementsByName("Authority")[0].value="Authority: "+responsePayload.Response.RegistrationDetail[0].Authority;
                              document.getElementsByName("Location")[0].value="Location: "+responsePayload.Response.RegistrationDetail[0].Location;
                              }else{
                              document.getElementsByName("Registration_no")[0].value="Registration No: ";
                              document.getElementsByName("Fee")[0].value="Fee: ";
                              document.getElementsByName("Date")[0].value="Date: ";
                              document.getElementsByName("Expiry_date")[0].value="Expiry Date: ";
                              document.getElementsByName("Authority")[0].value="Authority: ";
                              document.getElementsByName("Location")[0].value="Location: ";
                              }
                              if(responsePayload.Response && responsePayload.Response.InsuranceDetail[0]){
                              document.getElementsByName("Policy_no")[0].value="Policy No: "+responsePayload.Response.InsuranceDetail[0].Policy_No;
                              document.getElementsByName("Company")[0].value="Company: "+responsePayload.Response.InsuranceDetail[0].Company;
                              document.getElementsByName("Date_Insurance")[0].value="Date: "+responsePayload.Response.InsuranceDetail[0].Policy_Date;
                              document.getElementsByName("Expiry_date_Insurance")[0].value="Expiry Date: "+responsePayload.Response.InsuranceDetail[0].Expiry_Date;
                              }else{
                              document.getElementsByName("Policy_no")[0].value="Policy No: ";
                              document.getElementsByName("Company")[0].value="Company: ";
                              document.getElementsByName("Date_Insurance")[0].value="Date: ";
                              document.getElementsByName("Expiry_date_Insurance")[0].value="Expiry Date: ";
                              }

                              if(responsePayload.Response && responsePayload.Response.MortgageDetail[0]){
                              document.getElementsByName("Finance_company")[0].value="Company: "+responsePayload.Response.MortgageDetail[0].Company;
                              document.getElementsByName("Amount")[0].value="Amount: "+responsePayload.Response.MortgageDetail[0].Amount;
                              document.getElementsByName("mortgageStatus")[0].value="Status: "+responsePayload.Response.MortgageDetail[0].Status;
                              }else{
                              document.getElementsByName("Finance_company")[0].value="Company: ";
                              document.getElementsByName("Amount")[0].value="Amount: ";
                              document.getElementsByName("mortgageStatus")[0].value="Status: ";
                              }

                              document.querySelector(".overlay").style.display='block';
                              document.querySelector(".modal").style.display='block';
                              var div = document.getElementsByClassName("horform")[0];
                               div.getElementsByClassName("cta")[0].onclick=overlayDisable;

                               function overlayDisable(){
                                 document.querySelector(".overlay").style.display="none";
                                 document.querySelector(".modal").style.display="none";

                               }
                        
                          }

                        });

                    });
                    
                    
              });
            }
            else{


                  var table = document.getElementById("infoListTable");
                  for(var i = table.rows.length - 1; i > 1; i--)
                  {
                   table. deleteRow(i);
                  }
                   document.getElementById("noVehicleMessage").style.display='block';
            }
          }
          else {
              app.logUserOut();
            }
}
// Init (bootstrapping)
app.init = function(){
    // Get the token from localstorage
  app.getSessionToken();

  // Bind all form submissions
  app.bindForms();

 // Bind logout logout button
  app.bindLogoutButton();

 // Bind buttons of rest of functionality(eg Mortagage etc)
  app.bindButtons();    
 
 // Load data on page
  app.loadDataOnPage();

 //check whether user is logged in 
 app.loadAddCheck();  

 // check whether user is logged in while redirecting to home
 app.loadHomeCheck();  



 // Renew token
  app.tokenRenewalLoop();
  
  


};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
