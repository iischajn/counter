/*! 2014-02-09  */

'use strict';

module.exports = function(config, info) {
  var exports = {};

  var Data = require('../../public/data').Data;
  var data = new Data('http://localhost', 5984);

  var route = function(req, res) {
    var uid = req.param('uid');
	var words = data.findById('word_lib', uid, function(err, data_words) {
		console.log("words:" + JSON.stringify(data_words));
		// TODO 将数据通过模板展示到页面
	});
  }
  exports.route = route;
  return exports;
};