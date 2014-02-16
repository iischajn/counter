/*! 2014-02-09  */

'use strict';

module.exports = function(config, info) {
  var exports = {};
  var route = function(req, res) {
  		var word = req.param('word');
  		
  		var mongojs = global.mongojs;

		var db = mongojs('counter', ['word']);
		word = JSON.parse(word);
		word.forEach(function(item){
			db.word.findAndModify({
				query: { word: item.word },
				update: { $inc:{times: item.times} },
				new: true,
				upsert:true
			});
		});
		res.json({'status':'ok'});
  }
  exports.route = route;
  return exports;
};
