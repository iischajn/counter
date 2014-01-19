module.exports = function(grunt){
    // 项目配置
    var banner = '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n';
            
    var grout_config = {};
    var concat = { options: { banner: banner, separator: '\n'}, dist: { files: {} }};
    var uglify = { options: { banner: banner },dist: { files: {} }};
    var cssmin = { options: { banner: banner },minify: { files: {} }};

    var config = grunt.file.readJSON('config.json');
    var path = config.path;
    function files_map(file_path, in_arr){
        var out_arr = [];
        for(var i=0,len=in_arr.length;i<len;i++){   
            out_arr.push([file_path, in_arr[i]].join('/'));
        }
        return out_arr;
    }
    function files_grunt(pj_name, name, info){
        var file_path = '/'+pj_name;
        var dev_path = path.dev+file_path+'/'+name;
        var build_path = path.build+file_path+'/'+name;
        var css_files = files_map(path.css+file_path, info.css);
        var js_files = files_map(path.js+file_path, info.js);
        concat.dist.files[dev_path+'.css'] = css_files;
        concat.dist.files[dev_path+'.js'] = js_files;
        cssmin.minify.files[build_path+'.min.css'] = dev_path+'.css'; 
        uglify.dist.files[build_path+'.min.js'] = dev_path+'.js'; 
    }
    for (var i in config.projects) {
        var item = config.projects[i];
        var pj_name = item.name;
        for (var page_name in item.pages) {
            var page_info = item.pages[page_name];
            files_grunt(pj_name, page_name, page_info);
        }
    };
    grout_config.concat = concat;
    grout_config.uglify = uglify;
    grout_config.cssmin = cssmin;
    grunt.initConfig(grout_config);
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('build', ['concat', 'uglify', 'cssmin']);
    grunt.registerTask('default', ['build']);
};