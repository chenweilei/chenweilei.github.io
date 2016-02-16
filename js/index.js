$(function(){
	/* 侧边栏 */
	var win=$(window);
	var doc=$(document);
	var oTips=$('.tips');
	var oTipsList=$('.tipsList');
	oTips.mouseenter(function(){
		oTips.stop().animate({'left':'-68px'});
		oTipsList.stop().animate({left:'0'});
	});
	oTipsList.mouseleave(function(){
		oTips.stop().animate({left:'0'});
		oTipsList.stop().animate({left:'-48px'});
	})
	/* 时钟 */
	var oTipPic1=$('.tipPic1');
	var oTick=$('.clock');
	oTick.tick();
	oTipPic1.mouseenter(function(){
		oTick.removeClass('bounceOut');
		oTick.addClass('bounceIn');
		oTick.show();
	});
	oTipPic1.mouseleave(function(){
		oTick.removeClass('bounceIn');
		oTick.addClass('bounceOut');
		oTick.fadeOut();
	});
	/* 日历 */
	var timer=null;
	var oTipPic2=$('.tipPic2');
	var oCalendar=$('#calendar');
	oCalendar.calendar();
	oTipPic2.mouseover(function(){
		oCalendar.removeClass('bounceOut');
		oCalendar.addClass('bounceIn');
		oCalendar.show();
		clearTimeout(timer);
	});
	oTipPic2.mouseout(function(){
		timer=setTimeout(function(){
			oCalendar.removeClass('bounceIn');
			oCalendar.addClass('bounceOut');
			oCalendar.fadeOut();
		},300);
	});
	/* 返回顶部 */
	var top=win.scrollTop();
	var bFlog=true;
	var oGoTop=$('.goTop');
	win.scroll(function(){
		top=win.scrollTop();
		if(win.scrollTop()>=300){
			oGoTop.fadeIn();
		}else{
			oGoTop.fadeOut();
		};
		if(!bFlog){
			clearInterval(timer);
		}
		bFlog=false;
	});
	oGoTop.click(function(){
		timer=setInterval(function(){
			top-=25;
			bFlog=true;
			win.scrollTop(top);
			if(win.scrollTop()==0){
				clearInterval(timer);
			}
		},30);
	});
	/* 导航 */
	var oLogo=$('.logo');
	var oNav=$('.nav');
	var hdPic=$('.hPic img');
	var oResume=$('.hPic a');
	setTimeout(function(){
		oLogo.fadeIn(function(){
			oNav.addClass('animated flipInX');
			oNav.show();
			setTimeout(function(){
				hdPic.addClass('animated bounceIn');
				hdPic.show();
			},30);
			setTimeout(function(){
				var oHpicP=$('.hPic p');
				oHpicP.dz();
			},100);
		});
	},100);
	/* 导航条鼠标移入 */
	var oSkillH2=$('.skill h2');
	var oWorksH2=$('.works h2');
	var oAboutH2=$('.about h2');;
	var aTop=[0,oResume.offset().top,oSkillH2.offset().top,oWorksH2.offset().top,oAboutH2.offset().top];
	var oNavList=$('.nav li');
	window.location.hash=0;
	for(var i=0; i<oNavList.length-1; i++){
		(function(index){
			oNavList[index].onclick=function(){
				window.location.hash=index;
				//top=aTop[window.location.hash.charAt(1)];
				var timer=setInterval(function(){
					top+=25;
					win.scrollTop(top);
					if(top>=aTop[index]){
						top=aTop[index];
						clearInterval(timer);
					}
				},30);
			}
			oNavList[index].onmouseover=function(){
				oNavList[oNavList.length-1].style.width=oNavList[index].offsetWidth+'px';
				//oNavList[oNavList.length-1].style.left=oNavList[index].offsetLeft+'px';
				move(oNavList[oNavList.length-1],{left:oNavList[index].offsetLeft},{easing:Tween.Elastic.easeOut});
				this.className='fl animated pulse';
			}
			oNavList[index].onmouseout=function(){
				oNavList[oNavList.length-1].style.width=oNavList[window.location.hash.charAt(1)].offsetWidth+'px';
				//oNavList[oNavList.length-1].style.left=oNavList[index].offsetLeft+'px';
				move(oNavList[oNavList.length-1],{left:oNavList[window.location.hash.charAt(1)].offsetLeft},{easing:Tween.Elastic.easeOut});
				this.className='fl animated';
			}
		})(i);
	}

	/* work栏鼠标移入 */
	var aFnName=[fnHtml,fnJs,fnHtml5];
	(function(){
		var oWork=$('.worksBox');
		var aDiv=oWork.find('div');
		aDiv.each(function(index){
			var aSpan=aDiv.eq(index).find('span');
			var oA=aDiv.eq(index).find('a');
			aSpan.css({bottom:-aSpan.height()});
			$(this).mouseenter(function(){
				aSpan.stop().animate({bottom:0});
				oA.click(function(){
					var oClose=$('.close');
					var oLaG=$('.htmlShow');
					var aUrl=['url(./images/hao360.jpg) no-repeat',
							   'url(./images/mtdetails.jpg) no-repeat',
							   'url(./images/mtindex.jpg) no-repeat',
							   'url(./images/mtlist.jpg) no-repeat',
							   'url(./images/oppo.jpg) no-repeat',
							   'url(./images/v360.jpg) no-repeat',
							   'url(./images/xiaomi.jpg) no-repeat',
							   'url(./images/youku.jpg) no-repeat',
							   'url(./images/yx.jpg) no-repeat'
							  ];
					var aLi=oLaG.find('li');
					for(var i=0; i<aLi.length; i++){
						$(aLi[i]).css({background:aUrl[i],backgroundSize:'cover'});
					}
					aFnName[index]();
					oClose.click(function(){
						var oHtmlBg=$('.htmlBg');
						oHtmlBg.fadeOut();
					});
					oLaG.lagou();
				});
			});
			$(this).mouseleave(function(){
				aSpan.stop().animate({bottom:-aSpan.height()});
			});
		});
	})();
});
function fnHtml(){
	var oHtmlBg=$('.htmlBg');
	oHtmlBg.fadeIn();
}
function fnJs(){
	
}
function fnHtml5(){
	
}