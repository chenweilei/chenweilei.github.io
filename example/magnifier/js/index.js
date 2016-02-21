window.onload=function(){
	var oBox=document.getElementById('box');
	var oM=document.getElementById('mBox');
	var oB=document.getElementById('bBox');
	var oS=document.getElementById('sBox');
	var oMag=document.getElementById('mag');
	var aBtn=oS.getElementsByTagName('li');
	var aImg=oM.getElementsByTagName('img');
	var aImgUrl=['url(./images/Biphone1.jpg) no-repeat 0 0','url(./images/Biphone2.jpg) no-repeat 0 0'];

	for(var i=0; i<aBtn.length; i++){
		(function(index){
			aBtn[i].onmouseover=function(){
				for(var i=0; i<aBtn.length; i++){
					aBtn[i].className='';
					aImg[i].className='';
				}
				this.className='active';
				aImg[index].className='show';
				oB.style.background=aImgUrl[index];
			}
		})(i);
	}

	oM.onmouseenter=function(){
		oMag.style.display='block';
		document.onmousemove=function(ev){
			var ev=ev || event;
			var top=ev.clientY-oBox.offsetTop-oMag.offsetHeight/2;
			var left=ev.clientX-oBox.offsetLeft-oMag.offsetWidth/2;
			if(top<=0){
				top=0;
			}else if(top>=190){
				top=190;
			}
			if(left<=0){
				left=0;
			}else if(left>=190){
				left=190;
			}
			oMag.style.top=top+'px';
			oMag.style.left=left+'px';
			var x=left*790/190;
			var y=top*790/190;
			oB.style.backgroundPosition=-x+'px '+-y+'px';
		}
	}
	oM.onmouseleave=function(){
		oMag.style.display='none';
	}
}