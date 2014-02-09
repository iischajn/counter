var operation = (function(){
	function save(obj) {
		var data = "word=" + JSON.stringify(obj);
		$.ajax({
			url: 'http://localhost:8888/counter/save',
			type: 'post',
			data :  data,
			datatype: "json",
			success: function(obj) {
				console.log("save:" + obj);
			}
		});
	}
	function load(uid) {
		$.ajax({
			url: 'http://localhost:8888/counter/load',
			type: 'get',
			data :  "uid=" + uid,
			datatype: "json",
			success: function(obj) {
				console.log("load:" + obj);
			}
		});
	}

	return {
		save: save,
		load: load
	};
})();