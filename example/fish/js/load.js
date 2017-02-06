function load(arr, fn, fnEnd){
	if(!arr) return

	var json = {};
	var aCourse = [];
	for(var i=0; i<arr.length; i++){
		if(typeof(arr[i].src) == 'object'){
			for(var j = 0; j<arr[i].src.length; j++){
				aCourse.push({
					name: arr[i].name+(j+1),
					src: arr[i].src[j]
				})
			}
		}
		else{
			aCourse.push({
				name: arr[i].name,
				src: arr[i].src
			})
		}
	}

	//console.log(aCourse)
	var cur = 0;
	//console.log(arr)
	for(var i=0; i<aCourse.length; i++){
		(function(index){
			var oImg = new Image();
			oImg.src = aCourse[i].src;
			oImg.onload = function(){
				cur++;
				//console.log((cur*100/aCourse.length).toFixed(2))
				fn((cur*100/aCourse.length).toFixed(2))
				aCourse[index].img = oImg;
				//console.log(aCourse[index].img)
				if(cur == aCourse.length){
					fnEnd && fnEnd(aCourse)
				}
			}
			oImg.onerror = function(){
				cur++;
				fn((cur*100/aCourse.length).toFixed(2))
			}
		})(i);
	}


	
}