$.fn.lagou=function(){
	this.each(function(){
		oUl=this;
	});
	var aLi=oUl.getElementsByTagName('li');
	
	for (var i=0; i<aLi.length; i++)
	{
		enter(aLi[i]);
		leave(aLi[i]);
	}
	
	function enter(obj){
		obj.onmouseenter=function (ev){
			var oEvent=ev || event;
			var n=getN(obj, oEvent);
			var oSpan=obj.children[0];
			
			switch (n)
			{
				case 0: // right
					oSpan.style.left='200px';
					oSpan.style.top=0;
					break;
					
				case 1: // bottom
					oSpan.style.left=0;
					oSpan.style.top='200px';
					break;
				
				case 2: // left
					oSpan.style.left='-200px';
					oSpan.style.top=0;
					break;
					
				case 3: // top
					oSpan.style.left=0;
					oSpan.style.top='-200px';
					break;
			}
			move(oSpan, {top:0, left:0},{duration:300});
		};
	}
	
	function leave(obj){
		obj.onmouseleave=function (ev){
			var oEvent=ev || event;
			var n=getN(obj, oEvent);
			var oSpan=obj.children[0];
			switch (n)
			{
				case 0: // right
					move(oSpan, {left:200, top:0},{duration:300});
					break;
					
				case 1: // bottom
					move(oSpan, {top:200, left:0},{duration:300});
					break;
				
				case 2: // left
					move(oSpan, {top:0, left:-200},{duration:300});
					break;
					
				case 3: // top
					move(oSpan, {top:-200, left:0},{duration:300});
					break;
			}
		};
	}
	
	function getN(obj, ev){
		var x=getPos(obj).left+obj.offsetWidth/2-ev.clientX;
		var y=getPos(obj).top+obj.offsetHeight/2-ev.clientY;
		
		var n=Math.round((d2a(Math.atan2(y, x))+180)/90)%4;
		return n;
	}

	function d2a(d){
		return d*180/Math.PI;
	}

	function getPos(obj){
	var top=0;
	var left=0;
	
	while(obj){
	
		top+=obj.offsetTop;
		left+=obj.offsetLeft;
		
		obj=obj.offsetParent;
	}
		
		return {top:top, left:left}
	};
}