/*! 2014-02-09  */

'use strict';

// module.exports = function(config, info) {
//   var exports = {};
//   var route = function(req, res) {
//   		var word = req.param('word');
//   		var mongojs = require('mongojs');
// 		var db = mongojs('counter', ['word']);
// 		word = JSON.parse(word);
// 		word.forEach(function(item){
// 			// db.word.save(item);
// 			db.word.findAndModify({
// 				query: { word: item.word },
// 				update: { $set: item},
// 				new: true
// 			}, function(err, doc, lastErrorObject) {
// 				console.log(err, doc);
// 				if(!err){
// 					// res.json(doc);
// 				}
// 			});
// 		});
// 		res.json({'status':'ok'});
//   }
//   exports.route = route;
//   return exports;
// };
// var mongojs = require('mongojs');
// var db = mongojs('counter', ['word']);
// db.word.remove();
