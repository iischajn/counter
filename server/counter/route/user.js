


// var mongojs = require('mongojs');
// var user_db = mongojs('user', ['index']);

'use strict';

module.exports = function(config, info) {
  var exports = {};
  var html = info.html;
  var route = function(req, res) {
  	page.go(res, "counter/"+html, {
      title:'用户列表',
      user:req.session.user,
      css:['/dev/counter/'+html+'.css'],
      js:['/dev/counter/'+html+'.js']
    });
  }
  exports.route = route;
  return exports;
};