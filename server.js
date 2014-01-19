(function(){
	var exp = require("express");
	var app = exp();
	// var Data = require('./data').Data;
	// var data = new Data('http://localhost', 5984);
	// var cradle = require('cradle');

	app.use(exp.bodyParser());
	app.use(exp.methodOverride());
	app.use(exp.static(__dirname + '/bulid'));
	app.engine('.html', require('ejs').__express);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');

	app.listen(8888);
	console.log('Server running at http://localhost:8888/');

	// 渲染页面
	app.get('/', function(req, res) {
		res.render("index");  
	});

	// 保存word数据
	// app.post('/save', function(req, res) {
	// 	// req传参
	// 	var uid = 'letica';

	// 	var word_lib_item = {};
	// 	var _data = {};
	// 	_data.uid = uid;
	// 	_data.word = req.param('word');
	// 	var time = new Date().getTime();
	// 	word_lib_item[time] = _data;

	// 	//TODO 保存的时候需要先把数据取出来然后追加，不然会覆盖掉旧数据  ?
	// 	// var users = data.findById('users', uid, function(err, dat_users) {
	// 	//	console.log("users:" + JSON.stringify(dat_users));

	// 	// });

	// 	data.save('word_lib', word_lib_item, 
	// 	function(err, docs) {
	// 		if(err) {
	// 			console.log("save error:" + err);
	// 		} else {
	// 			console.log("save success:" + docs);
	// 			return true;
	// 		}
	// 	});
	// });

	// // 载入
	// app.post('/load', function(req, res) {
	// 	var uid = req.param('uid');

	// 	var words = data.findById('word_lib', uid, function(err, data_words) {
	// 		console.log("words:" + JSON.stringify(data_words));
			
	// 		// TODO 将数据通过模板展示到页面
	// 	});

	// });

	// 注册
	// 登录
	// 退出

})();