/*! 2014-02-09  */

'use strict';

module.exports = function(config, info) {
  var exports = {};
  var Data = require('../../public/data').Data;
  var data = new Data('http://localhost', 5984);
  var route = function(req, res) {
    	// req传参
		var uid = 'letica';

		var word_lib_item = {};
		var _data = {};
		_data.uid = uid;
		_data.word = req.param('word');
		var time = new Date().getTime();
		word_lib_item[time] = _data;

		//TODO 保存的时候需要先把数据取出来然后追加，不然会覆盖掉旧数据  ?
		// var users = data.findById('users', uid, function(err, dat_users) {
		//	console.log("users:" + JSON.stringify(dat_users));

		// });

		data.save('word_lib', word_lib_item, 
		function(err, docs) {
			if(err) {
				console.log("save error:" + err);
			} else {
				console.log("save success:" + docs);
				return true;
			}
		});
  }
  exports.route = route;
  return exports;
};
