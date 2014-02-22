module.exports = (function() {
  var user_model = require('./../model/user');
  var user_db = require('./../db/user');
  var crypto = require('crypto');
  var req, res;
  var setInout = function(in_req, out_res){
    req = in_req;
    res = out_res;
  }
  var handle = {
    loginCb:function(status, doc){
      if(doc){
        req.session.user = doc;
      }else{
        status = 'user_not_exist';
      }
      page.reply(res, status, doc);
    },
    logoutCb:function(){
      req.session.user = null;
      page.reply(res, 'ok');
    },
    regCb:function(status, doc){
      req.session.user = doc;
      page.reply(res, status, doc);
    }
  };
  var action = {
    login:function() {
      var query = object.extract(req, user_model, ['mobile','pwd']);
      var md5 = crypto.createHash('md5');
      query.pwd = md5.update(query.pwd).digest('base64');
      if(!query.mobile || !query.pwd){
        page.reply(res, 'not_fullw_param');
        return false;
      }
      user_db.find(res, query, handle.loginCb);      
    },
    logout:function() {
      handle.logoutCb();
    },
    reg:function() {
      var query = object.extract(req, user_model);
      if(!query.mobile || !query.pwd || !query.nick){
        page.reply(res, 'not_full_param');
        return false;
      }
      user_db.exist(res, {mobile:query.mobile},function(status){
        if(status){
          page.reply(res, 'user_has_exist');
        }else{
          var md5 = crypto.createHash('md5');
          query.pwd = md5.update(query.pwd).digest('base64');
          user_db.add(res, query, handle.regCb);
        }
      });
    }
  };
  
  return {
    action:action,
    setInout:setInout
  }
})();