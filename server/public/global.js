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
        err ? replyPage(res, 'sys_err', errObject) : cb('ok', doc);
      }
    }
    var objectExtract = function(req, obj_model, keys){
	    var obj = {};
	    for(var i in obj_model){
	      if(keys && keys.indexOf(i) == -1){
	        continue;
	      }
	      obj[i] = req.param(i) || obj_model[i];
	    }
	    return obj;
	}
	var objectMerge = function(obj, obj_model){
		obj = obj || {};
	    for(var i in obj_model){
	    	if(!obj[i]){
	    		obj[i] = obj_model[i];
	    	}	      
	    }
	    return obj;
	}
	
	// var objectOverride = function(param, model_obj, keys){
	//     var obj = {};
	//     for(var i in model_obj){
	//       if(keys && keys.indexOf(i) == -1){
	//         continue;
	//       }
	//       obj = req.param(i) || model_obj[i];
	//     }
	//     return obj;
	// }
	var toArray = Function.call.bind(Array.prototype.slice);
	var page = (function(){
		var msg_lib = {
	      'not_full_param':'not fuck full param',
	      'sys_err':'shit',
	      'user_not_exist':'not user',
	      'user_has_exist':'go login',
	      'not_func':'not func do you want',
	      'ok':'success'
	    };
		var page_model = require('./model/page');
		var usre_model = require('./model/user');
		function go(res, path, opt){
			opt.user = objectMerge(res.req.session.user, usre_model);
			opt = objectMerge(opt, page_model);
			res.render(path, opt);
		}
		function reply(res, status, data){
		    res.json({'status':status, 'data':data, 'msg':msg_lib[status]});
		}
		return {
			go:go,
			reply:reply
		}
	})();
	global.page = page;
	global.readJSON = readJSON;
	global.toArray = toArray;
    global.mongojs = mongojs;
    global.dbSysHandler = dbSysHandler;
    global.objectExtract = objectExtract;
})();