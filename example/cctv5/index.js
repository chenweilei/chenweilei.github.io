//图片资源
var resource=['bg1.jpg',
				'bg2.jpg',
				'bg3.jpg',
				'bg4.jpg',
				'logo437-374.png',
				'top65-86.png',
				'left254-114.png',
				'page2wall640-514.png',
				'page3-640-477.png',
				'page4-640-390.png',
				'page2Txt.png',
				'p3m333-61.png'
			];

//资源加载
function load(arr,fn){
	var n=0; 
	var oLogo=$('.logo');
	for(var i=0; i<arr.length; i++){
		var oImg=new Image();
		oImg.src='./images/'+arr[i];
		oImg.onload=function(){
			//console.log(n);
			oLogo.css({
				'transform':'scale('+Math.floor(n/(arr.length-1))+')',
				'opacity':Math.floor(n/(arr.length-1)),
				'-webkit-filter':'blur('+Math.floor(100*(1-n/(arr.length-1)))+'px)'
			});
			if(n==arr.length-1){
				
				oLogo[0].addEventListener('webkitTransitionEnd',logoLoad);
			}
			function logoLoad(){
				fn && fn();
				//console.log('成功');
				oLogo[0].removeEventListener('webkitTransitionEnd',logoLoad);
			}
			n++;
		}
	}
}

//打字效果
function typewrite(obj,str,fn,time1,time2){
	time1=time1 || '1s';
	time2=time2 || 200;
	str=str.replace(/\<br\>/g,'$');
	for(var i = 0; i < str.length; i++){
		if(str.charAt(i)=='$'){
			var oBr=document.createElement('br');
			obj[0].appendChild(oBr);
		}
		else{
			var oSpan=document.createElement('span');
			oSpan.innerHTML=str.charAt(i);
			obj[0].appendChild(oSpan);
		}
	}
	var aSpan=obj[0].getElementsByTagName('span');
	for(var i=0; i<aSpan.length; i++){
		aSpan[i].style.transition=time1+' all ease';
	}
	var timer=null;
	var i=0;
	timer=setInterval(function(){
		aSpan[i].className='on';

		i++;
		if(i==aSpan.length){
			clearInterval(timer);
			aSpan[i-1].addEventListener('webkitTransitionEnd',end);
		}
		function end(){
			fn && fn();
			aSpan[i-1].removeEventListener('webkitTransitionEnd',end);
		}
	},time2);
}

//第一屏切换到第二屏效果
function p1ToP2(json){
	json=json || {};
	json.oPW.css({
		'top':'1.5rem',
		'font-size':'0.9rem',
		'line-height':'1.25rem'
	});
	json.oPW[0].addEventListener('webkitTransitionEnd',pwEnd);
	function pwEnd(){
		json.oP1.css({'display':'block'});
		json.oP2.css({'display':'block'});
		json.oPW.css({'display':'none'});
		json.oPage2Bg.css({'width':'16rem'});
		setTimeout(function(){
			json.oTxtWallP.css({'opacity':'1'});
		},700);
		json.oTxtWallP[0].addEventListener('webkitTransitionEnd',txtWallEnd);
	}
	function txtWallEnd(){
		typewrite(json.oTxtWallSp,'The <br> Great Wall', function(){
			json.oTxtBg.css({'width':'12.325rem'});
			json.oTxtBg[0].addEventListener('webkitTransitionEnd',txtBgEnd);
		},'.5s',100)
		
	}
	function txtBgEnd(){
		json.oText.find('span')[0].className='animated zoomInUp';
		setTimeout(function(){
			json.oText.find('span')[1].className='animated zoomInUp';
			json.oText.find('span')[1].addEventListener('webkitAnimationEnd', toL);
		},300);
	}
	function toL(){
		json.oP2ToL[0].className='p2ToL animated fadeInUp infinite';
	}
}

//第二屏切换到第三屏效果
function p2ToP3(json){
	json=json || {};
	/*
	oP3Tit:oP3Tit,
	oP3titEng:oP3titEng,
	oP3verse:oP3verse,
	oP3M:oP3M,
	oP3Tol:oP3Tol,
	oP3Bg:oP3Bg
	*/
	json.oP3Bg.css({'width':'16rem'});
	setTimeout(function(){
		json.oP3Tit[0].className='animated p3Tit fadeIn';
		json.oP3Tit[0].addEventListener('webkitAnimationEnd',end);
	},200);

	function end(){
		typewrite(json.oP3titEng, 'Beijing Hangzhou the <br> Grande Canale', function(){
			json.oP3verse.find('span')[0].className='animated zoomInUp';
			setTimeout(function(){
				json.oP3verse.find('span')[1].className='animated zoomInUp';
				json.oP3verse.find('span')[1].addEventListener('webkitAnimationEnd', end2);
			},300);
		},'.5s',100);
	}

	function end2(){
		json.oP3M.css({'width':'14rem'});
		json.oP3M[0].addEventListener('webkitTransitionEnd',end3);
	}

	function end3(){
		json.oP3Tol[0].className='p3ToL animated fadeInUp infinite';
	}
}

//第三屏切换到第四屏效果
function p3ToP4(json){
	json=json || {};
	json.oP4Bg.css({'width':'16rem'});
	setTimeout(function(){
		json.oP4Tit[0].className='animated p3Tit fadeIn';
		json.oP4Tit[0].addEventListener('webkitAnimationEnd',end);
	},200);

	function end(){
		typewrite(json.oP4titEng, 'Dujiang Dam', function(){
			json.oP4M.css({'width':'14rem'});
			json.oP4M[0].addEventListener('webkitTransitionEnd',end2);
		},'1s',200);
	}

	function end2(){
		json.oP4verse.find('span')[0].className='animated zoomInUp';
		setTimeout(function(){
			json.oP4verse.find('span')[1].className='animated zoomInUp';
			json.oP4verse.find('span')[1].addEventListener('webkitAnimationEnd', end3);
		},300);
	}
	function end3(){
		json.oP4Tol[0].className='p3ToL animated fadeInUp infinite';
	}
}

//第四屏切换到第五屏效果
function p4ToP5(json){
	json.oP5Bg1[0].className='p5Bg1 animated fadeIn';
	json.oP5Bg1[0].addEventListener('webkitAnimationEnd', end);

	function end(){
		json.oP5Bg2[0].className='p5Bg2 animated fadeIn';
		json.oP5Bg2[0].addEventListener('webkitAnimationEnd', end2);
	}

	function end2(){
		json.oP5Bg3[0].className='p5Bg3 animated fadeIn';
		json.oP5Bg3[0].addEventListener('webkitAnimationEnd', end3);
	}

	function end3(){
		typewrite(json.oP5txt, '陵迁谷变 ，斗转星移', function(){
			json.oP5Top[0].className='p5Top animated fadeInUp infinite';
		},'1.2s',240)
	}
}

//第五屏切换到第六屏效果
function p5ToP6 (json){
	json.oP6Bg1[0].className='p6Bg1 animated fadeIn';
	json.oP6Bg1[0].addEventListener('webkitAnimationEnd', end);

	function end(){
		json.oP6Bg2[0].className='p6Bg2 animated fadeIn';
		json.oP6Bg2[0].addEventListener('webkitAnimationEnd', end2);
	}

	function end2(){
		json.oP6Bg3[0].className='p6Bg3 animated fadeIn';
		json.oP6Bg3[0].addEventListener('webkitAnimationEnd', end3);
	}

	function end3(){
		json.oP6Bg4[0].className='p6Bg4 animated fadeIn';
		json.oP6Bg4[0].addEventListener('webkitAnimationEnd', end4);
	}

	function end4(){
		typewrite(json.oP6txt, '今天的我们用什么改变世界 ？', function(){
			json.oP6L[0].className='p6L animated fadeInUp infinite';
		},'1.2s',240)
	}
}
load(resource,function(){
	var oPW=$('.titleW'),  			//全局标题
	
	//第一页元素获取
		oP1=$('.titleP1'),			//第一页标题
		oPageTop=$('.page1Top'),	//第一页向上箭头

	//第二页元素获取
		oP2=$('.titleP2'),			//第二页标题
		oPage2Bg=$('.page2Bg'),	//第二页背景图
		oTxtWallP=$('.txtWall .page2P1'),	//第二页 长城
		oTxtWallSp=$('.txtWall .page2P2'),	// 长城英文写法
		oText=$('.text'),						//诗句
		oP2ToL=$('.p2ToL'),				//向左箭头
		oTxtBg=$('.txtBg'),					//长城米数图片

	//第三页元素获取
		oP3Tit=$('.p3Tit'),
		oP3titEng=$('.p3TitEng'),
		oP3verse=$('.p3Verse'),
		oP3M=$('.p3M'),
		oP3Tol=$('.p3ToL'),
		oP3Bg=$('.page3Bg'),

	//第四页元素获取
		oP4Tit=$('.p4Tit'),
		oP4titEng=$('.p4TitEng'),
		oP4verse=$('.p4Verse'),
		oP4M=$('.p4M'),
		oP4Tol=$('.p4ToL'),
		oP4Bg=$('.page4Bg'),
		oLongTapBg=$('.longTapBg'),

	//第五页元素获取
		oP5Bg1=$('.p5Bg1'),
		oP5Bg2=$('.p5Bg2'),
		oP5Bg3=$('.p5Bg3'),
		oP5txt=$('.p5txt'),
		oP5Top=$('.p5Top'),

	//第六页元素获取
		oP6Bg1=$('.p6Bg1'),
		oP6Bg2=$('.p6Bg2'),
		oP6Bg3=$('.p6Bg3'),
		oP6Bg4=$('.p6Bg4'),
		oP6txt=$('.p6txt'),
		oP6L=$('.p6L'),

	//当前页
		activePage=1;
	//page1打字
	typewrite(oPW,'伟大的时代<br>缔造伟大的工程',function(){
		oPageTop[0].className='page1Top addAni';
	});

	var oGoBack=$('#goBack');
	var swiperV1 = new Swiper('#v1>.swiper-container-v', {
		direction:'vertical',
		followFinger : false,
		effect : 'fade',
		eyboardControl:true,
		onSlideChangeStart: function(swiper){
			//activePage=mySwiper.activeIndex
			switch(swiper.activeIndex){
				case 0:
					activePage=1;
				break;
				case 1:
					activePage=2;
					//滑到第二页时调用
					p1ToP2({oPW:oPW, 
							  oP1: oP1, 
							  oP2: oP2, 
							  oPage2Bg:oPage2Bg, 
							  oTxtWallP:oTxtWallP, 
							  oTxtWallSp:oTxtWallSp,
							  oTxtBg:oTxtBg,
							  oText:oText,
							  oP2ToL:oP2ToL
						});
				break;
			}
			//console.log('1-2'+activePage);
		},
		allowSwipeToPrev : true
	});
	var swiperH1 = new Swiper('#h1>.swiper-container-h', {
		direction:'horizontal',
		followFinger : false,
		spaceBetween: 0,
		//allowSwipeToPrev : false,
		onSlideChangeEnd: function(swiper){
			switch(swiper.activeIndex){
				case 0:
					activePage=2;
				break;
				case 1:
					activePage=3;
					//滑到第三页时调用
					p2ToP3({
						oP3Tit:oP3Tit,
						oP3titEng:oP3titEng,
						oP3verse:oP3verse,
						oP3M:oP3M,
						oP3Tol:oP3Tol,
						oP3Bg:oP3Bg
					});
				break;
				case 2:
					activePage=4;
					//滑到第四页时调用
					p3ToP4({
						oP4Tit:oP4Tit,
						oP4titEng:oP4titEng,
						oP4verse:oP4verse,
						oP4M:oP4M,
						oP4Tol:oP4Tol,
						oP4Bg:oP4Bg
					});
					//将swiper锁定不让滑动
					swiper.lockSwipes();
				        $(document).on('touchstart',function(ev){
				            ev.preventDefault();
				        });
					$(document).longTap(function(){
						oLongTapBg[0].className='longTapBg animated fadeIn';
						oLongTapBg.css({'transform':'scale(35)'});
						oLongTapBg[0].addEventListener('webkitTransitionEnd',end);
					});
					function end(){
						swiper.slideNext();
						oLongTapBg[0].removeEventListener('webkitTransitionEnd',end);
					}
				break;
				case 3:
					activePage=5;
					//滑到第五页时
					p4ToP5({
						oP5Bg1:oP5Bg1,
						oP5Bg2:oP5Bg2,
						oP5Bg3:oP5Bg3,
						oP5txt:oP5txt,
						oP5Top:oP5Top
					});
				break;
			}
			console.log('2-5'+activePage);
			if(activePage>2){
				swiperV1.lockSwipeToPrev();
			}
			else{
				swiperV1.unlockSwipeToPrev();
			}
			//alert(activePage);
		},
		keyboardControl:true
	});
	var swiperV2 = new Swiper('#v2>.swiper-container-v', {
		direction:'vertical',
		followFinger : false,
		spaceBetween: 0,
		//allowSwipeToPrev : false,
		onSlideChangeEnd: function(swiper){
			//activePage=mySwiper.activeIndex
			switch(swiper.activeIndex){
				case 0:
					activePage=5;
				break;
				case 1:
					activePage=6;
					//滑到第六页时
					p5ToP6({
						oP6Bg1:oP6Bg1,
						oP6Bg2:oP6Bg2,
						oP6Bg3:oP6Bg3,
						oP6Bg4:oP6Bg4,
						oP6txt:oP6txt,
						oP6L:oP6L,
					});
				break;
			}
			console.log('5-6'+activePage);
			//alert(activePage);
		},
		keyboardControl:true
	});
	var swiperH2 = new Swiper('#h2>.swiper-container-h', {
		direction:'horizontal',
		followFinger : false,
		spaceBetween: 0,
		//allowSwipeToPrev : false,
		onSlideChangeStart: function(swiper){
			switch(swiper.activeIndex){
				case 0:
					activePage=6;
				break;
				case 1:
					activePage=7;
				break;
				case 2:
					activePage=8;
				break;
				case 3:
					activePage=9;
				break;
				case 4:
					activePage=10;
				break;
				case 5:
					activePage=11;
				break;
				case 6:
					activePage=12;
				break;
			}
			if(activePage>6){
				swiperV2.lockSwipeToPrev();
			}
			else{
				swiperV2.unlockSwipeToPrev();
			}
			console.log('6-12'+activePage);
			//alert(activePage);
		},
		keyboardControl:true
	});
	var swiperV3 = new Swiper('#v3>.swiper-container-v', {
		direction:'vertical',
		spaceBetween: 0,
		followFinger : false,
		keyboardControl:true,
		onSlideChangeStart: function(swiper){
			//activePage=mySwiper.activeIndex
			switch(swiper.activeIndex){
				case 0:
					activePage=12;
				break;
				case 1:
					activePage=13;
				break;
			}
			console.log('12-13'+activePage);
			//alert(activePage);
		},
		//allowSwipeToPrev : false
	});
	var swiperH3 = new Swiper('#h3>.swiper-container-h', {
		direction:'horizontal',
		spaceBetween: 0,
		followFinger : false,
		//allowSwipeToPrev : false,
		onSlideChangeStart: function(swiper){
			switch(swiper.activeIndex){
				case 0:
					activePage=13;
				break;

				case 1:
					activePage=14;
				break;
			}
			if(activePage>13){
				swiperV3.lockSwipeToPrev();
			}
			else{
				swiperV3.unlockSwipeToPrev();
			}
			console.log('13-14'+activePage);
			//alert(activePage);
		},
		keyboardControl:true
	});
	var swiperV4 = new Swiper('#v4>.swiper-container-v', {
		direction:'vertical',
		followFinger : false,
		spaceBetween: 0,
		//allowSwipeToPrev : false,
		onSlideChangeStart: function(swiper){
			//activePage=mySwiper.activeIndex
			switch(swiper.activeIndex){
				case 0:
					activePage=14;
				break;
				case 1:
					activePage=15;
				break;
			}
			console.log('14-15'+activePage);
			if(activePage==15){
				swiperH3.lockSwipeToPrev();
				oGoBack.css({'display':'block'});
			}
			else{
				swiperH3.unlockSwipeToPrev();
				oGoBack.css({'display':'none'});
			}
			//alert(activePage);
		},
		keyboardControl:true
	});
	oGoBack.tap(function(){
		swiperV1.setWrapperTranslate(0,0,0);
		swiperH1.setWrapperTranslate(0,0,0);
		$('#h1').css({'opacity':'0'});
		swiperV2.setWrapperTranslate(0,0,0);
		swiperH2.setWrapperTranslate(0,0,0);
		swiperV3.setWrapperTranslate(0,0,0);
		swiperH3.setWrapperTranslate(0,0,0);
		swiperV4.setWrapperTranslate(0,0,0);
		activePage=2;
		console.log(activePage);
		oGoBack.css({'display':'none'});
	});
});
