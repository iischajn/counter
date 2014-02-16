'use strict';

module.exports = function(config, info) {
  var exports = {};
  var html = info.html;
  var route = function(req, res) {
    page.go(res, "counter/"+html, {
      title:'文字记录器',
      user:req.session.user,
      css:['/dev/counter/'+html+'.css'],
      js:['/dev/counter/'+html+'.js']
    });
  }
  exports.route = route;
  return exports;
};