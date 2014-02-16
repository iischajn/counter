'use strict';

module.exports = function(config, info) {
  var exports = {};
  var user_model = require('./../model/user');
  var dbHandler = (function(){
    var dbSysHandler = global.dbSysHandler;
    var user_db = global.mongojs('user',['index']);
    return {
      find:function(res, query, cb){
        user_db.index.findOne(query, dbSysHandler(res, cb));
      },
      add:function(res, query, cb){
        user_db.index.insert(query, dbSysHandler(res, cb));
      }
    }
  })();
  var logicFunc = {
    login:function(req, res) {
      var query = objectExtract(req, user_model, ['mobile','pwd']);
      if(!query.mobile || !query.pwd){
        page.reply(res, 'not_fullw_param');
        return false;
      }
      dbHandler.find(res, query, function(status, doc){
        if(doc){
          req.session.user = doc;
        }else{
          status = 'user_not_exist';
        }
        page.reply(res, status, doc);
      });
      
    },
    logout:function(req, res) {
      req.session.user = null;
      page.reply(res, 'ok');
    },
    reg:function(req, res) {
      var query = objectExtract(req, user_model);
      // console.log(query);
      if(!query.mobile || !query.pwd || !query.nick){
        page.reply(res, 'not_full_param');
        return false;
      }
      dbHandler.find(res, {mobile:query.mobile}, function(status, doc){
        if(doc){
          page.reply(res, 'user_has_exist');
        }else{
          dbHandler.add(res, query, function(status, doc){
              req.session.user = doc;
              page.reply(res, status, doc);
          })
        }
      });
    }
  }
  var route = function(req, res) {
    var want_func = req.param('f');
    var func = logicFunc[want_func];
    if(func){
      func(req, res);
    }else{
      page.reply(res, 'not_func');
    }
  }
  
  exports.route = route;
  return exports;
};