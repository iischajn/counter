/*! 2014-02-09  */

'use strict';

module.exports = function(config, info) {
  var exports = {};
  var route = function(req, res) {
    var mongojs = global.mongojs;
    // var db = mongojs('user', []);
    var word_db = mongojs('counter', ['word']);
    console.log(req.headers.cookie);
    var word_list;
    word_db.word.find({}, function(err, doc, lastErrorObject){
      if(!err){
        word_list = doc;
        res.json(word_list);
      }
    });
  }
  exports.route = route;
  return exports;
};

