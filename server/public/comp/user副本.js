module.exports = (function() {
  var user_model = require('./../model/user');
  var user_db = require('./../db/user');
  
  var handler = {
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
    regCb:function(){
      req.session.user = doc;
      page.reply(res, status, doc);
    }
  }
  
  return {
    login:function(req, res) {
      var query = object.extract(req, user_model, ['mobile','pwd']);
      if(!query.mobile || !query.pwd){
        page.reply(res, 'not_fullw_param');
        return false;
      }
      user_db.find(res, query, handler.loginCb);      
    },
    logout:function(req, res) {
      handler.logoutCb();
    },
    reg:function(req, res) {
      var query = object.extract(req, user_model);
      if(!query.mobile || !query.pwd || !query.nick){
        page.reply(res, 'not_full_param');
        return false;
      }
      user_db.exist(res, ({mobile:query.mobile},function(status){
        if(status){
          page.reply(res, 'user_has_exist');
        }else{
          user_db.add(res, query, handler.regCb);
        }
      });
    }
  }
  // return {
  //   login:function(req, res) {
  //     var query = object.extract(req, user_model, ['mobile','pwd']);
  //     if(!query.mobile || !query.pwd){
  //       page.reply(res, 'not_fullw_param');
  //       return false;
  //     }
  //     user_db.find(res, query, function(status, doc){
  //       if(doc){
  //         req.session.user = doc;
  //       }else{
  //         status = 'user_not_exist';
  //       }
  //       page.reply(res, status, doc);
  //     });
      
  //   },
  //   logout:function(req, res) {
  //     req.session.user = null;
  //     page.reply(res, 'ok');
  //   },
  //   reg:function(req, res) {
  //     var query = object.extract(req, user_model);
  //     if(!query.mobile || !query.pwd || !query.nick){
  //       page.reply(res, 'not_full_param');
  //       return false;
  //     }
  //     user_db.find(res, {mobile:query.mobile}, function(status, doc){
  //       if(doc){
  //         page.reply(res, 'user_has_exist');
  //       }else{
  //         user_db.add(res, query, function(status, doc){
  //             req.session.user = doc;
  //             page.reply(res, status, doc);
  //         })
  //       }
  //     });
  //   }
  // }
})();