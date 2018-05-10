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

module.exports=helper;