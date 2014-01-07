$(function(){
	var page = (function(){
		function bindEvent(){
			var result = [];
			$('#analyse').on('click', function(){
				var text = $('#textarea').val();
				result = analy.parse(text);
				
				createResult('result', result.sort(arith.times));
			});

			$('#sort').delegate('a', 'click', function(){
				$('#sort .alert').removeClass('alert');
				$(this).addClass('alert');

				var sort = $(this).data('sort');
				createResult('result', result.sort(arith[sort]));
			});

			$('#clear').on('click', function(){
				$('#textarea').val('');
				$('#result').html('');
			});
		}
		function createResult(domId, result){
			$.template("ResultTmpl", tmpl.mkTmpl());	
			$('#' + domId + ' table>tbody').html($.tmpl("ResultTmpl", result));
		}
		return {
			bind:bindEvent
		};
	})();

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

	var tmpl = (function(){
		function mkResultTmpl() {
			var arr = [];
			arr.push('<tr><td>${word}</td><td>${times}</td><td>${len}</td></tr>');
			return arr.join(" ");
		}

		return {
			mkTmpl:mkResultTmpl
		};
	})();

	var arith = (function(){
		function sortByTimes(a, b){
			return b.times - a.times;
		}
		function sortByLen(a, b) {
			return b.len - a.len;
		}

		return {
			times:sortByTimes,
			len:sortByLen
		};
	})();

	function init(){
		page.bind();
	}
	init();

});

