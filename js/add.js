function json2url(json){
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function jsonp(json){
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.cbName=json.cbName || 'cb';
	
	
	var fnName='jsonp'+Math.random();
	fnName=fnName.replace('.','');
	
	window[fnName]=function(data){
		json.success && json.success(data);	
		
		//删除
		oHead.removeChild(oS);
	}
	
	json.data[json.cbName]=fnName;
	
	var oS=document.createElement('script');	
	oS.src=json.url+'?'+json2url(json.data);
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);	
}
// JavaScript Document
 //版权 北京智能社©, 保留所有权利
//t  当前时间
//b  初始值
//c  总距离
//d  总时间
//var cur=fx(t,b,c,d)
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return -c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return -c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t+b}return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return -c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t*t+b}return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0){return b}if(t==d){return b+c}if((t/=d/2)<1){return c/2*Math.pow(2,10*(t-1))+b}return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1){return -c/2*(Math.sqrt(1-t*t)-1)+b}return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return -0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else{if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else{if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b}}}},easeInOut:function(t,b,c,d){if(t<d/2){return Tween.Bounce.easeIn(t*2,0,c,d)*0.5+b}else{return Tween.Bounce.easeOut(t*2-d,0,c,d)*0.5+c*0.5+b}}}};
function move1(obj,json,options){
	options=options || {};
	var n=0;
	var duration=options.duration || 1000;
	var easing=options.easing || Tween.Linear;
	var star={};
	var dis={};
	for(var name in json){
		star[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-star[name];
	}
	var count=Math.floor(duration/30);
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			var cur=easing(duration*n/count,star[name],dis[name],duration);
			if(name=='opacity'){
				obj.style[name]=cur;
			}
			else{
				obj.style[name]=cur+'px';
			}
		}	
		if(n==count){
			clearInterval(obj.timer);
			options.fn && options.fn();
		}
	},30);
};
function getStyle(obj,sName){
	return (obj.currentStyle || getComputedStyle(obj,false))[sName];
};
function rand(n,m){
	return Math.floor(Math.random()*(m-n)+n);
};
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
function calendar(obj){
	var oDiv=document.createElement('div');
	oDiv.id='calendar';
	oDiv.className='calendarBox_calendar';
	var oCalender=document.getElementById('calendar');
	var oSp=oCalender.getElementsByTagName('span')[0];
	var oUl=oCalender.getElementsByTagName('ul')[0];
	var oP=oCalender.getElementsByClassName('calendarBox_prev')[0];
	var oN=oCalender.getElementsByClassName('calendarBox_next')[0];

	var top=obj.offsetTop+obj.offsetHeight+20;
	var left=obj.offsetLeft;
	obj.onfocus=function(){
		oCalender.style.display='block';
		oCalender.style.top=top+'px';
		oCalender.style.left=left+'px';
	}
	obj.onclick=function(ev){
		var oEvent=ev || event;
		oEvent.cancelBubble=true;
	}
	/*
	document.onclick=function(){
		oCalender.style.display='none';
	}
	*/
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
				aLi[i].onclick=function(ev){
					var oEvent=ev || event;
					if(this.innerHTML<oDate.getDate()){
						return;
					}
					if(this.innerHTML=='今天'){
						obj.value=oSstr+tod(oDate.getDate())+'日';
						//oCalender.style.display='none';
					}
					else{
						obj.value=oSstr+tod(this.innerHTML)+'日';
						//oCalender.style.display='none';
					}
					oEvent.cancelBubble=true;
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
				aLi[i].onclick=function(ev){
					if(!this.innerHTML){
						return;
					}
					else{
						var oEvent=ev || event;
						obj.value=oSstr+tod(this.innerHTML)+'日';
						//oCalender.style.display='none';
						oEvent.cancelBubble=true;
					}
				}
			}
		}
		function tod(n){
			return n<10 ? '0'+n : ''+n ;
		}
	};
};

function random(n,m){
	return Math.floor(Math.random()*(m-n)+n);
}
function tod(n){
	return n<10 ? '0'+n : ''+n ;
}
window.onload=function(){
//返回顶部
	(function(){
		var oGoBack=document.getElementById('goBack');
		oGoBack.onclick=function(){
			move(0,1000);
		};
		var timer=null;
		var bFlog1=true;
		window.onscroll=function(){
			if(!bFlog1){
				clearInterval(timer);
			}
			bFlog1=false;
		}
		function move(target,time){
			var n=0;
			var star=document.documentElement.scrollTop|| document.body.scrollTop ;
			var dis=target-star;
			var count=Math.floor(time/30);

			clearInterval(timer);
			
			timer=setInterval(function(){
				n++;
				bFlog1=true;
				var cur=star+dis*n/count;
				document.documentElement.scrollTop=cur;
				document.body.scrollTop=cur;
				if(n==count){
					clearInterval(timer);
				}
			},30);
		}
	})();
//点击展示作品
	var oSamOpen=document.getElementById('samOpen');
	var oSamClose=document.getElementById('samClose');
	var oSamBox=document.getElementById('samBox');
	//点击打开
	oSamOpen.onclick=function(){
		oSamBox.style.display='block';
		var n=0;
		//列表选项卡
		(function(){
			var aBtn=document.getElementById('samList').getElementsByTagName('span');
			var aList=document.getElementById('samList').getElementsByTagName('li');
			var oUl=document.getElementById('samUl');
			var oBox=document.getElementById('samList_Box');
			var aLi=oUl.children;
			for(var i=0; i<aBtn.length; i++){
				(function(index){
					aBtn[i].onclick=function(){
						n=index;
						show(n);
						//oUl.style.top=-aLi[0].offsetHeight*index+'px';
						move1(oUl,{top:-aLi[0].offsetHeight*index},{easing:Tween.Elastic.easeOut});
						move1(oBox,{top:aList[index].offsetTop},{duration:100})
					}
				})(i);
			}
		})();
		show(n);
		function show(n){
			switch(n){
				case 0:
				//百度搜索
					(function(){
						var oT=document.getElementById('bdTxt');	
						var oUl=document.getElementById('bdSeachList');
						var oBtn=document.getElementById('bdSech');
						var iNow=-1;
						var oldValue='';
						oT.onkeyup=function(ev){
							var oEvent=ev || event;
							if(oEvent.keyCode==40 || oEvent.keyCode==38){
								return;	
							}
							if(oEvent.keyCode==13){
								window.open('https://www.baidu.com/s?wd='+oT.value,'_self');
								oT.value='';
							}
							jsonp({
								url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
								data:{
									wd:oT.value	
								},
								success:function(json){
									oUl.innerHTML='';
									var arr=json.s;
									if(arr.length){
										oUl.style.display='block';
									}else{
										oUl.style.display='none';
									}
									//DOM
									for(var i=0; i<arr.length; i++){
										var oLi=document.createElement('li');
										oLi.innerHTML=arr[i];
										oUl.appendChild(oLi);
										
										(function(index){
											oLi.onmouseover=function(){
												for(var i=0; i<oUl.children.length; i++){
													oUl.children[i].className='';
												}
												this.className='on';
												iNow=index;	
											};
											oLi.onmouseout=function(){
												for(var i=0; i<oUl.children.length; i++){
													oUl.children[i].className='';
												}	
											};
											oLi.onclick=function(){
												window.open('https://www.baidu.com/s?wd='+this.innerHTML,'_self');
												oT.value='';	
											};
										})(i);
									}
								}	
							});
							oldValue=oT.value;	
						};
						oT.onkeydown=function(ev){
							var aLi=oUl.children;
							
							var oEvent=ev || event;
							if(oEvent.keyCode==40){
								iNow++;
								if(iNow==aLi.length)iNow=-1;
								
								for(var i=0; i<aLi.length; i++){
									aLi[i].className='';
								}
								if(iNow==-1){
									oT.value=oldValue;
								}else{
									aLi[iNow].className='on';
									oT.value=aLi[iNow].innerHTML;	
								}
							}
							if(oEvent.keyCode==38){
								iNow--;
								if(iNow==-2)iNow=aLi.length-1;
								
								for(var i=0; i<aLi.length; i++){
									aLi[i].className='';
								}
								if(iNow==-1){
									oT.value=oldValue;
								}else{
									aLi[iNow].className='on';
									
									oT.value=aLi[iNow].innerHTML;	
								}
								return false;
							}
						};
						//点击搜索
						oBtn.onclick=function(){
							window.open('https://www.baidu.com/s?wd='+oT.value,'_self');
							oT.value='';	
						};	
						oT.onblur=function(){
							oUl.style.display='none';
							oT.value='';	
						}
					})();
				break;

				case 1:
				//照片墙
					(function(){
						var oPhotoWall=document.getElementById('photoWall');
						var aLi=oPhotoWall.getElementsByTagName('li');

						//转换布局
						var aPos=[];
						for(var i=0; i<aLi.length; i++){
							aPos.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
						}
						//console.log(JSON.stringify(aPos));
						for(var i=0; i<aLi.length; i++){
							aLi[i].index=i;
							aLi[i].style.left=aPos[i].left+'px';
							aLi[i].style.top=aPos[i].top+'px';
							aLi[i].style.position='absolute';
							aLi[i].style.margin='0px';
						}
						var zIndex=1;
						for(var i=0; i<aLi.length; i++){
							drag(aLi[i]);
						}
						function drag(obj){
							obj.onmousedown=function(ev){
								var oNear=null;
								var oEvent=ev || event;
								obj.style.zIndex=zIndex++;
								var disX=oEvent.clientX-obj.offsetLeft;
								var disY=oEvent.clientY-obj.offsetTop;
								document.onmousemove=function(ev){
									var oEvent=ev || event;
									var left=oEvent.clientX-disX;
									var top=oEvent.clientY-disY;

									//找最近
									oNear=finedNear(obj);
									console.log(oNear);
									obj.style.top=top+'px';
									obj.style.left=left+'px';
								};
								document.onmouseup=function(){
									document.onmousemove=null;
									document.onmouseup=null;
									if(oNear){
										move1(obj,aPos[oNear.index],{duration:200,easing:Tween.Elastic.easeOut});
										move1(oNear,aPos[obj.index],{duration:200,easing:Tween.Elastic.easeOut});
										var n=obj.index;
										obj.index=oNear.index;
										oNear.index=n;
									}
									else{
										move1(obj,aPos[obj.index],{duration:200,easing:Tween.Elastic.easeOut});
									}
									obj.releasecapture && obj.releasecapture();
								};
								obj.setcapture && obj.setcapture();
								return false;
							};
						};

						function finedNear(obj){
							var minDis=99999;
							var minIndex=-1;
							for(var i=0; i<aLi.length; i++){
								if(obj != aLi[i] )
								{
									if(collTest(obj,aLi[i]))
									{
										var dis=getDis(obj,aLi[i]);
										if(dis<minDis){
											minDis=dis;
											minIndex=i;
										}
									}
								}	
							}
							if(minIndex!=-1){
								return aLi[minIndex];
							}
							else{
								return null;
							}
						};

						function getDis(obj1,obj2){
							var a=(obj2.offsetLeft+obj2.offsetWidth/2)-(obj1.offsetLeft+obj1.offsetWidth/2);
							var b=(obj2.offsetTop+obj2.offsetHeight/2)-(obj1.offsetTop+obj1.offsetHeight/2);
							return c=Math.sqrt(a*a+b*b);
						};

						function collTest(obj1,obj2){
							var l1=obj1.offsetLeft;
							var t1=obj1.offsetTop;
							var r1=l1+obj1.offsetWidth;
							var b1=t1+obj1.offsetHeight;

							var l2=obj2.offsetLeft;
							var t2=obj2.offsetTop;
							var r2=l2+obj2.offsetWidth;
							var b2=t2+obj2.offsetHeight;

							if(l2>r1 || t2>b1 || l1>r2 || t1>b2){
								
								return false;
							}
							else{
								return true;
							}
						};
					})();
				break;

				case 2:
				//拉钩
					(function(){
						var oBtn=document.getElementById('change');
						var oUl=document.getElementById('lG');
						var aLi=oUl.getElementsByTagName('li');
						//点击换位置
						// 布局转换
						aPos=[];
						for (var i=0; i<aLi.length; i++)
						{
							aPos.push({
								left:aLi[i].offsetLeft,
								top:aLi[i].offsetTop
							});
						}
						
						for (var i=0; i<aLi.length; i++)
						{
							aLi[i].style.position='absolute';
							aLi[i].style.left=aPos[i].left+'px';
							aLi[i].style.top=aPos[i].top+'px';
							aLi[i].style.margin=0;
						}
						oBtn.onclick=function (){
							
							aPos.sort(function (){
								return Math.random()-0.5;
							});
							
							for (var i=0; i<aLi.length; i++)
							{
								move1(aLi[i], aPos[i]);
							}
						};

						for (var i=0; i<aLi.length; i++)
						{
							enter(aLi[i]);
							leave(aLi[i]);
						}
						
						function enter(obj){
							obj.onmouseenter=function (ev){
								var oEvent=ev || event;
								var n=getN(obj, oEvent);
								var oSpan=obj.children[1];
								
								switch (n)
								{
									case 0: // right
										oSpan.style.left='212px';
										oSpan.style.top=0;
										break;
										
									case 1: // bottom
										oSpan.style.left=0;
										oSpan.style.top='212px';
										break;
									
									case 2: // left
										oSpan.style.left='-212px';
										oSpan.style.top=0;
										break;
										
									case 3: // top
										oSpan.style.left=0;
										oSpan.style.top='-212px';
										break;
								}
								move1(oSpan, {top:0, left:0},{duration:300});
							};
						}
						
						function leave(obj){
							obj.onmouseleave=function (ev){
								var oEvent=ev || event;
								var n=getN(obj, oEvent);
								var oSpan=obj.children[1];
								switch (n)
								{
									case 0: // right
										move1(oSpan, {left:212, top:0},{duration:300});
										break;
										
									case 1: // bottom
										move1(oSpan, {top:212, left:0},{duration:300});
										break;
									
									case 2: // left
										move1(oSpan, {top:0, left:-212},{duration:300});
										break;
										
									case 3: // top
										move1(oSpan, {top:-212, left:0},{duration:300});
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
					})();
				break;

				case 3:
				//分块运动
					(function(){
						var oDiv=document.getElementById('case');
						var oImg=oDiv.getElementsByTagName('img')[0];
						var aSpan=[];
						var bFlag=false;
						aPath=['lsb1.jpg', 'lsb2.jpg', 'lsb3.jpg','lsb4.jpg'];
						
						// 创建span
						var Row=30;
						var Col=1;
						var W=900;
						var H=500;
						var width=W/Col;
						var height=H/Row;
						oDiv.children.length=1;
						for (var r=0; r<Row; r++){
							for (var c=0; c<Col; c++)
							{
								var oSpan=document.createElement('span');
								oSpan.style.width=width+'px';
								oSpan.style.height=height+'px';
								var left=c*width;
								var top=r*height;
								oSpan.style.left=left+'px';
								oSpan.style.top=top+'px';
								oSpan.style.backgroundPosition='-'+left+'px -'+top+'px';
								oDiv.appendChild(oSpan);
								aSpan.push(oSpan);
							}
						}
						var oBtn=document.getElementById('go');
						var now=0; // 当前点击次数
						oBtn.onclick=function (){
							if (bFlag)
							{
								return;
							}
							bFlag=true;
							now++;
							//  初始化
							for (var i=0; i<aSpan.length; i++)
							{	
								aSpan[i].style.opacity=0;
								aSpan[i].style.backgroundImage='url(./images/'+aPath[now%4];
							}
							var n=0; // 第几个
							var timer=setInterval(function (){
								(function (index){
									move1(aSpan[n], {opacity:1}, {duration:500,
										fn:function (){
											if (index == aSpan.length-1)
											{
												// 运动结束
												bFlag=false;
												oImg.src='./images/'+aPath[now%4];
												for (var i=0; i<aSpan.length; i++)
												{	
													aSpan[i].style.opacity=0;
													aSpan[i].style.backgroundImage='url(./images/'+aPath[now%4];
												}
											}
										}
									});
								})(n);
								
								n++;
								if (n == aSpan.length)
								{
									clearInterval(timer);
								}
							}, 30);
						};		
					})();
				break;

				case 4:
				//页码
					(function(){
						var oBtn=document.getElementById('pageNumberBtn');
						var aLi=document.getElementById('pageNumberBox').getElementsByTagName('li');
						
						//  布局转换
						var aPos=[];
						for (var i=0; i<aLi.length; i++){
							var left=aLi[i].offsetLeft;
							var top=aLi[i].offsetTop;
							aLi[i].style.background='rgb('+rand(0,256)+','+rand(0,256)+','+rand(0,256)+')';
							aLi[i].style.left=left+'px';
							aLi[i].style.top=top+'px';
							
							aPos.push({left:left, top:top});
						}
						
						for (var i=0; i<aLi.length; i++){
							aLi[i].style.position='absolute';
							aLi[i].style.margin=0;
						}
						oBtn.onclick=function (){
							var n=0;
							var timer=setInterval(function (){
								(function (index){
									move1(aLi[n], {top:0, left:0, width:0, height:0, opacity:0}, {
										duration:300,
										fn:function (){
											if (index == aLi.length-1){
												end();
											}
										}
									});
								})(n);
								n++;
								
								if (n == aLi.length){
									clearInterval(timer);
								}
							}, 100);
						};
						function end(){
							for (var i=0; i<aLi.length; i++){
								aLi[i].style.background='rgb('+rand(0,256)+','+rand(0,256)+','+rand(0,256)+')';
							}
							
							var n=aLi.length-1;
							var timer=setInterval(function (){
								var left=aPos[n].left;
								var top=aPos[n].top;
								move1(aLi[n], {left:left, top:top, width:200,height:200, opacity:1}, {
									duration:300
								});
								n--;
								if (n == -1)
								{
									clearInterval(timer);
								}
							}, 100);
						}
					})();
				break;

				case 5:
				//日历
					(function(){
						var oTxt=document.getElementById('calendarBox_text');
						calendar(oTxt);
						tick();
						setInterval(tick, 1000);
						function tick(){
							var oDate=new Date();
							var h=oDate.getHours();
							var m=oDate.getMinutes();
							var s=oDate.getSeconds();
							
							var str=tod(h)+tod(m)+tod(s);
							var oClock=document.getElementById('calendarBox_clock');
							var aSpan=oClock.getElementsByTagName('span');
							var h=60;
							
							for (var i=0; i<aSpan.length; i++)
							{
								var target=-str.charAt(i)*h;
								move1(aSpan[i], {'top':target},{duration:300});
							}
						}
					})();
				break;

				case 6:
				//苹果菜单/圆
					(function(){
						var oDiv=document.getElementById('ring');
						var R=oDiv.offsetWidth/2;
						var total=8; // 个数
						var aSpan=[];

						for (var i=0; i<total; i++){
							var oSpan=document.createElement('span');
							oSpan.style.background='url(./images/flower'+(i+1)+'.png)'
							oDiv.appendChild(oSpan);
							aSpan.push(oSpan);
						}

						var bFlag=true;
						oDiv.onclick=function (){
							var timer=null;
							if (bFlag){
								bFlag=false;
								clearTimeout(timer);
								for (var i=0; i<aSpan.length; i++){
									move2(aSpan[i], i/total*360,0,1);
								}
								timer=setTimeout(function(){
									bFlag=true;
									for (var i=0; i<aSpan.length; i++){
										move2(aSpan[i], 0,1,0);
									}
								},5000);
							}
						};
						function move2(obj, target,oStar,oEnd){
							var start=obj.a || 0;
							var dis=target-start;
							var count=Math.floor(1000/30);
							var n=0;
							clearInterval(obj.timer);
							obj.timer=setInterval(function (){
								n++;
								var cur=start+dis*n/count;
								var cur1=oStar+(oEnd-oStar)*n/count
								var x=R+Math.sin(a2d(cur))*R;
								var y=R-Math.cos(a2d(cur))*R;
								obj.style.left=x+'px';
								obj.style.top=y+'px';
								obj.style.opacity=cur1;
								
								if (n == count){
									clearInterval(obj.timer);
									obj.a=cur;
								}
							}, 30);
						}
						function a2d(a){
							return a*Math.PI/180;
						}
					})();
					(function(){
						var oDiv=document.getElementById('appleCase');
						var aImg=oDiv.getElementsByTagName('img');
						var oParent=document.getElementById('parent');
						document.onmousemove=function (ev){
							var oEvent=ev || event;
							for (var i=0; i<aImg.length; i++){
								var a=oEvent.clientX-(aImg[i].offsetLeft+aImg[i].offsetWidth/2+oParent.offsetLeft+100);
								var b=oEvent.clientY-(aImg[i].offsetTop+oDiv.offsetTop+aImg[i].offsetHeight/2+oParent.offsetTop);
								
								var c=Math.sqrt(a*a+b*b);
								// 感应距离
								var scale=(1-c/500);
								(scale<0.5) && (scale=0.5);
								aImg[i].style.width=scale*150+'px';
								aImg[i].style.height=scale*150+'px';
							}
						};
					})();
				break;

				case 7:
				//相册
					(function(){
						var oParent=document.getElementById('parent');
						var oDiv=document.getElementById('album');	
						var oUl=oDiv.children[0];
						var aLi=oUl.children;
						var aImg=oUl.getElementsByTagName('img');
						
						var divC=oDiv.offsetWidth/2;
						
						//计算ul的宽度
						oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
						
						oUl.onmousedown=function(ev){
							var oEvent=ev || event;
							var disX=oEvent.clientX-oUl.offsetLeft;
							
							document.onmousemove=function(ev){
								var oEvent=ev || event;	
								var left=oEvent.clientX-disX;
								
								if(left>=divC-(1-0.5)*aLi[0].offsetWidth){
									left=divC-(1-0.5)*aLi[0].offsetWidth;	
								}
								if(left<=divC-(aLi.length-0.5)*aLi[0].offsetWidth){
									left=divC-(aLi.length-0.5)*aLi[0].offsetWidth;		
								}
								
								oUl.style.left=left+'px';
																
								//求距离
								change();
							};
							document.onmouseup=function(){
								document.onmousemove=null;
								document.onmouseup=null;	
							};
							return false;
						};
						
						//让第几个居中
						oUl.style.left=divC-(2-0.5)*aLi[0].offsetWidth+'px';
						
						change();
						function change(){
							for(var i=0; i<aLi.length; i++){
								var l=Math.abs(aLi[i].offsetLeft+oUl.offsetLeft+aLi[i].offsetWidth/2-divC);
								
								var scale=1-l/500;
								scale<0.5 && (scale=0.5);
								
								aImg[i].style.width=400*scale+'px';
								aImg[i].style.height=512*scale+'px';
								aImg[i].style.marginLeft=-(aImg[i].offsetWidth-200)/2+'px';
								aImg[i].style.marginTop=-(aImg[i].offsetHeight-256)/2+'px';
								aLi[i].style.zIndex=scale*100000;
							}	
						}
					})();
				break;
			}
		}
	}
	//点击关闭
	oSamClose.onclick=function(){
		oSamBox.style.display='none';
	}
}
