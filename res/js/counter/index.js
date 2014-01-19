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

$(function(){	
	function init(){
		page.bind();
	}
	init();
});

