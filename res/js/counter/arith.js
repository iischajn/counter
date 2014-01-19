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