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

		$('#oper').delegate('a', 'click', function(){
			var oper = $(this).data('oper');
			if(oper == 'save') {
				if(result.length > 0) {
					operation.save(result);
				} else {
					alert("Please insert your article and analyse it first!");
				}
			} else if(oper == 'load') {
				var uid = 'letica';
				operation.load(uid);
			}
		});

		$('#clear').on('click', function(){
			result = [];
			$('#textarea').val('');
			$('#result table>tbody').html('');
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

