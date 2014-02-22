(function(){
	var mongojs = require('mongojs');
    
	function readJSON(filepath) {
		var fs = require('fs');
		var src = fs.readFileSync(filepath);
		var result = JSON.parse(src);
		return result;
	};
	var dbSysHandler = function(res, cb){
      return function(err, doc, errObject){
        err ? page.reply(res, 'sys_err', errObject) : cb('ok', doc);
      }
    }
    
	var toArray = Function.call.bind(Array.prototype.slice);
	
	global.page = require('./comp/page');
	global.object = require('./comp/object');
    global.mongojs = mongojs;
	global.toArray = toArray;
	global.readJSON = readJSON;
    global.dbSysHandler = dbSysHandler;
})();