'use strict';

module.exports = function(config, info) {
  var exports = {};

  var route = function(req, res) {
    var projects = [];
    for (var i in config.projects) {
          projects.push(config.projects[i]);
    }
    console.log(res);
    page.go(res, 'public/index', {
      title:'导航页',
      projects: projects
    });
  }
  exports.route = route;
  return exports;
};

