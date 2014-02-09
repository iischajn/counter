'use strict';

module.exports = function(config, info) {
  var exports = {};
  var html = info.html;
  var route = function(req, res) {
    res.render("counter/"+html,{
     title:'文字记录器',
     css:['/dev/counter/'+html+'.css'],
     js:['/dev/counter/'+html+'.js']
    });
  }
  exports.route = route;
  return exports;
};