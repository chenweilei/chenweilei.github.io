$.fn.dz=function(){
	this.each(function(){
		var str=this.innerHTML;
		var reg=/\<br\>/g;
		str=str.replace(reg,function(n){
			return '$';
		});
		//alert(str);
		this.innerHTML='';
		for(var i=0; i<str.length; i++){
			if(str.charAt(i)=='$'){
				var oBr=document.createElement('br');
				this.appendChild(oBr);
			}
			else{
				var oSpan=document.createElement('span');
				oSpan.innerHTML=str.charAt(i);
				this.appendChild(oSpan);
			}
		}
		var aSpan=this.getElementsByTagName('span');
            var timer=null;
            var i=0;
            timer=setInterval(function(){
                aSpan[i].className='on';

                i++;
                if(i==aSpan.length){
                    clearInterval(timer);
                }
            },100);
	});
}