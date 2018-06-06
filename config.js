/*
 *
 * Config the environment 
 */

 //create an object naming environment
 var environment={};

 //define the staging environment
 environment.staging={
    'envName':'staging',
    'templateGlobals':{
      'appName' : 'VehiclePOC',
      'companyName' : 'NotARealCompany, Inc.',
      'yearCreated' : '2018',
      'baseUrl' : 'http://localhost:8080/'
    }
  
 };


 //export the environment variabes based on cmmd-line input ;defaut is staging 
  var currEnvironment = typeof(process.env.NODE_ENV)=='string'?process.env.NODE_ENV.toLowerCase():'';

 //check the current environment is one of the environment above ,if not,default to staging area
  var environmentToExport = typeof(environment[currEnvironment])=='object'?environment[currEnvironment]:environment['staging'];

module.exports=environmentToExport;