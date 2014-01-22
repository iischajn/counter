(function(){
	var fs = require('fs');
	var path = require('path');

	function readJSON(filepath) {
		var src = fs.readFileSync(filepath);
		var result = JSON.parse(src);
		return result;
	};
	var toArray = Function.call.bind(Array.prototype.slice);

	var exp = require("express");
	var partials = require('express-partials')

	var app = exp();
	var config = readJSON('config.json');
	app.use(partials());
	// var Data = require('./data').Data;
	// var data = new Data('http://localhost', 5984);
	// var cradle = require('cradle');

	app.use(exp.bodyParser());
	app.use(exp.methodOverride());
	app.use(exp.static(__dirname + '/build'));
	app.engine('.ejs', require('ejs').__express);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.set('view options', {defaultLayout:'public/layout'});


	app.listen(8888);
	console.log('Server running at http://localhost:8888/');

	// 渲染页面
	app.get('/', function(req, res) {
		var projects = [];
		for (var i in config.projects) {
	        projects.push(config.projects[i]);
	    };
		res.render("index",{
			title:'导航页',
			projects: projects, 
			css:[],
			js:[]
		});  
	});

	app.get('*', function(req, res){
	    res.render('404', {title: 'No Found'});
	});
	// app.get('/', routes.index);
	// app.get('/users', user.list);
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