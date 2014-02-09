module.exports = function(grunt){
    // 项目配置
    var path = require('path');
    var banner = '/*! <%= grunt.template.today("yyyy-mm-dd ") %> */\n';
            
    var grunt_config = {};
    var concat = { options: { banner: banner, separator: '\n'}, dist: { files: {} }};
    var uglify = { options: { banner: banner },dist: { files: {} }};
    var cssmin = { options: { banner: banner },minify: { files: {} }};
    var create = { options: { banner: banner },dist: { files: {} }};

    var config = grunt.file.readJSON('config.json');
    var c_path = config.path;
    function files_map(file_path, in_arr){
        var out_arr = [];
        for(var i=0,len=in_arr.length;i<len;i++){
            out_arr.push(path.join(file_path, in_arr[i]));
        }
        return out_arr;
    }
    function files_grunt(pj_name, info){
        var route_path = path.join(c_path.server, pj_name, c_path.route, info.route+'.js');
        if(info.type == 'html'){
            var dev_path = path.join(c_path.static,c_path.dev,pj_name,info.route);
            var build_path = path.join(c_path.static,c_path.build,pj_name,info.route);
            var css_files = files_map(c_path.css+'/'+pj_name, info.css);
            var js_files = files_map(c_path.js+'/'+pj_name, info.js);
            var html_path = path.join(c_path.views, pj_name, info.html+'.ejs');
            
            concat.dist.files[dev_path+'.css'] = css_files;
            concat.dist.files[dev_path+'.js'] = js_files;
            cssmin.minify.files[build_path+'.min.css'] = dev_path+'.css'; 
            uglify.dist.files[build_path+'.min.js'] = dev_path+'.js'; 
            create.dist.files[pj_name+'/'+info.route] = css_files.concat(js_files,html_path,route_path);
        }else{
            create.dist.files[pj_name+'/'+info.route] = [route_path];
        }    
        
    }
    function gruntInit(){
        for (var i in config.projects) {
            var item = config.projects[i];
            var pj_name = item.name;
            for (var j in item.net) {
                var info = item.net[j];
                files_grunt(pj_name, info);
            }
        }
    }
    gruntInit();//创建项目
    grunt_config.concat = concat;
    grunt_config.uglify = uglify;
    grunt_config.cssmin = cssmin;
    grunt_config.create = create;
    grunt.initConfig(grunt_config);
    // grunt.initConfig({
    //     concat: {
    //         options: {
    //             separator: ';',
    //         },
    //         dist: {
    //             files: {
    //               'public/build/counter.js': ['public/js/counter.js']
    //             }
    //         },
    //     },
    //     uglify: {
    //         options: {
    //             banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //         },
    //         dist: {
    //             files: {
    //                 'public/build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    //             }
    //         }               
    //     },
    //     jshint: {
    //         files: ['Gruntfile.js', 'public/js/counter.js', 'main.js', 'data.js'],
    //         options: {
    //             globals: {
    //                 jQuery: true,
    //                 console: true,
    //                 module: true
    //             }
    //         }
    //     },
    //     watch: {
    //         files: ['<%= jshint.files %>'],
    //         tasks: ['jshint', 'qunit']
    //     }
    // });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-create');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('create-project', ['create']);
    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['build']);
};