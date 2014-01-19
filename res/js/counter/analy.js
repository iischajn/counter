var analy = (function(){
	var WORD_REGEXP = /(\b\w+\b)|[\u2E80-\u9FFF]/g;
	function parse(text){
		var word_arr = text.match(WORD_REGEXP);
		var ret_arr = build(word_arr);
		return ret_arr;
	}
	function createItem(word){
		var item = {};
		item.times = 1;
		item.word = word;
		item.len = word.length;
		return item;
	}
	function build(in_arr){
		var ret_arr = [];
		var ret_obj = {};
		$.each(in_arr, function(i, word){
			if(!word) {
				return;
			}
			var item = ret_obj[word];
			if(item){
				item.times++;
			}else{
				item = createItem(word);
				ret_obj[word] = item;
			}
		});
		$.each(ret_obj, function(i, obj){
			ret_arr.push(obj);
		});
		return ret_arr;

	}
	
	return {
		parse:parse
	};
})();



	
