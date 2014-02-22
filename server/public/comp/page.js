module.exports = (function(){
	var msg_lib = {
      'not_full_param':'not fuck full param',
      'sys_err':'shit',
      'user_not_exist':'not user',
      'user_has_exist':'go login',
      'not_func':'not func do you want',
      'ok':'success'
    };
	var page_model = require('../model/page');
	var usre_model = require('../model/user');
	
	function go(res, path, opt){
		opt.user = object.merge(res.req.session.user, usre_model);
		opt = object.merge(opt, page_model);
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