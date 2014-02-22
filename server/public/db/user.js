module.exports = (function() {
  var dbSysHandler = global.dbSysHandler;
  var user_db = global.mongojs('user',['index']);
  return {
    find:function(res, query, cb){
      user_db.index.findOne(query, dbSysHandler(res, cb));
    },
    exist:function(res, query, cb){
      user_db.index.findOne(query, dbSysHandler(res, function(s,doc){
        doc ? cb(1, doc) : cb(0, doc);
      }));
    },
    add:function(res, query, cb){
      user_db.index.insert(query, dbSysHandler(res, cb));
    }
  }
})();