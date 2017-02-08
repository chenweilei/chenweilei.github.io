function load(resources, fnLoad, fnLoadEnd){
	if(!resources)return
	var total;
	var n = 0;
	var arr = [];
	var res = {};
	for(var name in resources){
		arr.push(resources[name])
	}
	total = arr.length;

	for(var name in resources){
		(function(name){
			var oImg = new Image();
			console.log(resources[name])
			oImg.src = './images/'+resources[name];
			oImg.onload = function(){
				n++;
				res[name] = oImg;
				//console.log(res)
				fnLoad(n/total.toFixed(2)*100)

				if(n == total){
					fnLoadEnd(res)
				}
			};
			oImg.onerror = function(){
				n++;
				fnLoad(n/total.toFixed(2)*100)
			}
		})(name)
	}

}