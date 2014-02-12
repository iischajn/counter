/*! 2014-02-09  */

'use strict';

module.exports = function(config, info) {
  var exports = {};
  var route = function(req, res) {
    var mongojs = require('mongojs');
    var db = mongojs('counter', ['word']);
    var word_list = null;
    db.word.find({}, function(err, doc, lastErrorObject){
      if(!err){
        word_list = doc;
      }
    });
    res.json(word_list);
  }
  exports.route = route;
  return exports;
};