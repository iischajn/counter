module.exports = (function(){
	function extract(req, obj_model, keys){
	    var obj = {};
	    for(var i in obj_model){
	      if(keys && keys.indexOf(i) == -1){
	        continue;
	      }
	      obj[i] = req.param(i) || obj_model[i];
	    }
	    return obj;
	}
	function override(obj, overrider_obj, keys){
	    var obj = {};
	    for(var i in obj){
	      if(keys && keys.indexOf(i) == -1){
	        continue;
	      }
	      if(overrider_obj[i] != undefined){
		      obj[i] = overrider_obj[i];
	      }
	    }
	    return obj;
	}
	function merge(obj, obj_model){
		obj = obj || {};
	    for(var i in obj_model){
	    	if(!obj[i]){
	    		obj[i] = obj_model[i];
	    	}	      
	    }
	    return obj;
	}
	return {
		extract:extract,
		override:override,
		merge:merge
	}
})();