(function() {
  var Data, cradle;

  cradle = require('cradle');

  Data = (function() {
    function Data(host, port) {
      this.connect = new cradle.Connection(host, port, {
        cache: true,
        raw: false
      });
      this.db = this.connect.database('counter');
    }

    Data.prototype.save = function(id, data, callback) {
      return this.db.save(id, data, function(err, res) {
        if (err) {
          return callback(err);
        } else {
          return callback(null, data);
        }
      });
    };

    // 查询视图view_name所有记录
    Data.prototype.find = function(view_name, callback) {
      return this.db.view('counter/' + view_name, {
        descending: true
      }, function(err, res) {
        var docs;
        if (err) {
          return callback(err);
        } else {
          docs = [];
          res.forEach(function(row) {
            return docs.push(row);
          });
          return callback(null, docs);
        }
      });
    };

    // 查询视图view_name下指定ids的记录
    Data.prototype.findById = function(view_name, ids, callback) {
      return this.db.view('counter/' + view_name, {
        descending: true
      }, function(err, res) {
        var docs;
        if (err) {
          return callback(err);
        } else {
          docs = [];
          res.forEach(function(row) {
            if(ids == row.uid) {
              return docs.push(row);
            } else {
              return docs;
            }
          });
          return callback(null, docs);
        }
      });
    };

    return Data;

  })();

  exports.Data = Data;

}).call(this);