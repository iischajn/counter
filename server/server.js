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
	var way = {
		static:config.path.static,
		views:config.path.views,
		layout:config.path.layout
	};
	app.use(partials());
	app.use(exp.bodyParser());
	app.use(exp.methodOverride());
	app.use(exp.static(way.static));
	app.engine('.ejs', require('ejs').__express);
	app.set('views', way.views);
	app.set('view engine', 'ejs');
	app.set('view options', {defaultLayout:way.layout});


	app.listen(8888);
	console.log('Server running at http://localhost:8888/');
	// 渲染页面
	function routeInit(){
		function redirectIndex(parent){
			return function(req, res){
        		res.redirect('/'+parent+'/index');
	        }
	    }
	    function createNet(pj_name, info){
    	    var route = path.join(pj_name, info.route);
            var route_path = path.join(pj_name, config.path.route, info.route);
            console.log(info.type+' Net running at http://localhost:8888/'+route+' By '+ route_path);
            if(info.type == "post"){
            	app.post('/'+route, require('./'+route_path)(config, info).route);
            }else{
            	app.get('/'+route, require('./'+route_path)(config, info).route);
            }
	    }
		
		app.get('/', redirectIndex('public'));
        
        for (var i in config.projects) {
            var item = config.projects[i];
            var pj_name = item.name;
            app.get('/'+pj_name, redirectIndex(pj_name));

            for (var i in item.net) {
                var info = item.net[i];
	            if(info.status != "online"){
	            	continue;
	            }
	            createNet(pj_name, info)
            }
        }
    }
    routeInit();

	// app.get('/public/index', require('./public/route/index')(config).route);

	// app.get('*', function(req, res){
	//     res.render('404', {title: 'No Found',css:[],js:[]});
	// });
	

	// 注册
	// 登录
	// 退出

})();