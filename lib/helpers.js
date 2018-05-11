var crypto = require('crypto');

//Container for all the helper
var helper = {};



//create a SHA256 hash 
helper.hash = function(str)
{
	if(typeof(str)=='string' && str.length>0)
	{
		var hash = crypto.createHmac('sha256','thisIsAlsoASecret').update(str).digest('hex');

		return hash;
	}
	else
	{
		return {};
	}
}



//Random Token generation with the required length as an argument
helper.createRandomString = function(str){
	var strlength = typeof(str)=='number' && str>0?str:false;
	if(strlength){
        var str='';
        var list ='abcdefghijklmnopqrst0123456789';
        for(i=1;i<=20;i++)
        {
        	var randomChar=list.charAt((Math.floor((Math.random()*list.length))));
        	str+=randomChar;
        }
        return str;
	}
  else{
		return false;
	}
}

module.exports=helper;