'use strict';

module.exports = function(config, info) {
  var exports = {};
  var user_comp = require('./../comp/user');
  var route = function(req, res) {
    var action_index = req.param('f');
    user_comp.setInout(req, res);
    var func = user_comp.action[action_index];
    func ? func() : page.reply(res, 'not_func');
  }
  exports.route = route;
  return exports;
};