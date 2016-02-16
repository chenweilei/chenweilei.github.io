$.fn.tick=function(){
	this.each(function(){
		var oH=document.querySelector('.clock .hourRing span');
		var oM=document.querySelector('.clock .minRing span');
		var oS=document.querySelector('.clock .secRing span');
		var oH1=document.querySelector('.clock .hourRing');
		var oM1=document.querySelector('.clock .minRing');
		var oS1=document.querySelector('.clock .secRing');
		//画刻度s
		var s=60;
		for(var i=0; i<s; i++){
			var oI1=document.createElement('i');
			oI1.className='Sscale';
	          	oI1.style.transform='rotate('+6*i+'deg)';
	          	oH1.appendChild(oI1);
		}
		//画刻度m
		var m=60;
		for(var i=0; i<m; i++){
			var oI2=document.createElement('i');
			oI2.className='Mscale';
	          	oI2.style.transform='rotate('+6*i+'deg)';
	          	oM1.appendChild(oI2);
		}
		var h=12;
		for(var i=0; i<h; i++){
			var oI3=document.createElement('i');
			oI3.className='Hscale';
			oI3.innerHTML='<strong>'+i+'</strong>';
	          	oI3.style.transform='rotate('+30*i+'deg)';
			oI3.children[0].style.transform='rotate('+-i*30+'deg)'
	          	oS1.appendChild(oI3);
		}
		function tick(){
		    var oDate=new Date();
		    var h=oDate.getHours();
		    var m=oDate.getMinutes();
		    var s=oDate.getSeconds();
		    var ms=oDate.getMilliseconds();

		    oS.style.transform='rotate('+(h*30+m/60*30)+'deg)';
		    oM.style.transform='rotate('+(m*6+s/60*6)+'deg)';
		    oH.style.transform='rotate('+(s*6+ms/1000*6)+'deg)';
		}
		tick();
		setInterval(tick,30);
      });
}