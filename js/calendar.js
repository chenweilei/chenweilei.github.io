$.fn.calendar=function(){
	this.each(function(){
		var _this=this;
		calendar();
		function calendar(){
		    var oSp=_this.getElementsByTagName('span')[0];
		    var oUl=_this.getElementsByTagName('ul')[0];
		    var oP=_this.getElementsByClassName('calendarBox_prev')[0];
		    var oN=_this.getElementsByClassName('calendarBox_next')[0];
		    var now=0;
		    oP.onclick=function(ev){
		        var oEvent=ev || event;
		        now--;
		        set();
		        oEvent.cancelBubble=true;
		    };
		    oN.onclick=function(ev){
		        var oEvent=ev || event;
		        now++;
		        set();
		        oEvent.cancelBubble=true;
		    };  
		    set();
		    function set(){
		        //设置span
		        var oDate=new Date();
		        oDate.setMonth(oDate.getMonth()+now);
		        var year=oDate.getFullYear();
		        var mon=oDate.getMonth();
		        oSp.innerHTML=year+'年'+(mon+1)+'月';
		        var oSstr=oSp.innerHTML;

		        oUl.innerHTML='';
		        //创建空li
		        var oDate=new Date();
		        oDate.setMonth(oDate.getMonth()+now);
		        oDate.setDate(1);
		        var week=oDate.getDay();
		        (week==0) && (week=7)
		        for(var i=0; i<week-1; i++){
		            var oLi=document.createElement('li');
		            oUl.appendChild(oLi);
		            oLi.style.background='none';
		        }

		        //创建日期
		        var oDate=new Date();
		        oDate.setMonth(oDate.getMonth()+now);
		        oDate.setMonth(oDate.getMonth()+1,1);
		        oDate.setDate(0);
		        var totalDay=oDate.getDate();
		        for(var i=0; i<totalDay; i++){
		            var oLi=document.createElement('li');
		            oLi.innerHTML=i+1;
		            oUl.appendChild(oLi);
		        }
		        var aLi=oUl.children;
		        var oDate=new Date();
		        oDate.setMonth(oDate.getMonth()+now);
		        if(now==0){
		            //设置字体颜色
		            for(var i=0; i<aLi.length; i++){
		                if(i%7==5 || i%7==6 || aLi[i].innerHTML==oDate.getDate())
		                {
		                    aLi[i].className='calendarBox_week';
		                    if(aLi[i].innerHTML==oDate.getDate())
		                    {
		                        aLi[i].innerHTML='今天'
		                    }
		                }
		                if(aLi[i].innerHTML<oDate.getDate()){
		                    aLi[i].className='calendarBox_past';
		                }
		            }
		        }
		        else if(now<0){
		            for(var i=0; i<aLi.length; i++){
		                aLi[i].className='calendarBox_past';
		            }
		        }
		        else{
		            for(var i=0; i<aLi.length; i++){
		                if(i%7==5 || i%7==6){
		                    aLi[i].className='calendarBox_week';
		                }
		            }
		        }
		    };
		};
	});
}
