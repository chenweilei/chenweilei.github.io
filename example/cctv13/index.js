//图片资源
 resource=[	
 			'./images/bg1.jpg',
			'./images/bg2.jpg',
			'./images/bg3.jpg',
			'./images/bg4.jpg',
			'./images/left254-114.png',

			'./images/music.png',
			'./images/p2yun.png',
			'./images/p3m333-61.png',
			'./images/p4m456-58.png',
			'./images/p5-92-167.png',
			'./images/p5bg1-640-1032.png',
			'./images/p5bg2-640-343.png',
			'./images/p5bg3-640-274.png',
			'./images/p6Bg2-640-600.png',

			'./images/p6Bg3-640-600.png',
			'./images/p6Bg4-640-240.png',
			'./images/p6Bg-640-1049.png',
			'./images/p6L-456-177.png',
			'./images/p7Bg1-640-1032.png',
			'./images/p7Bg2-640-483.png',
			'./images/p7Bg3-640-557.png',
			'./images/p7Bg4-640-390.png',
			'./images/p7Bg5-640-560.png',
			'./images/p7Bg6-637-487.png',

			'./images/p7Bg7-640-620.png',
			'./images/p7Bg-640-1032.png',
			'./images/p8Bg1-640-1032.png',
			'./images/p8Bg2-623-329.png',
			'./images/p8Bg3-640-820.png',
			'./images/p8Bg4-640-550.png',
			'./images/p8Bg5-640-496.png',
			'./images/p8Bg6-640-532.png',
			'./images/p8Bg7-640-417.png',
			'./images/p8Bg640-1032.png',

			'./images/p9Bg1-640-600.png',
			'./images/p9Bg2-640-412.png',
			'./images/p9Bg3-640-380.png',
			'./images/p9Bg4-640-340.png',
			'./images/p9Bg5-640-340.png',
			'./images/p9Bg6-640-470.png',
			'./images/p9Bg7-640-412.png',
			'./images/p9Bg640-1032.png',
			'./images/p10Bg1-640-750.png',
			'./images/p10Bg2-640-370.png',
			'./images/p10Bg3-640-280.png',

			'./images/p10Bg4-640-364.png',
			'./images/p10Bg5-640-442.png',
			'./images/p10Bg6-640-500.png',
			'./images/p10Bg7-640-714.png',
			'./images/p10Bg640-1032.png',
			'./images/p11Bg1-640-1032.png',
			'./images/p11Bg2-640-500.png',
			'./images/p11Bg3-640-800.png',
			'./images/p11Bg4-640-680.png',

			'./images/p11Bg5-640-850.png',
			'./images/p11Bg640-1032.png',
			'./images/p12Bg1-640-1032.png',
			'./images/p12Bg2-640-760.png',
			'./images/p12Bg3-640-600.png',
			'./images/p12Bg640-1032.png',
			'./images/p13Bg1-400-314-b0r0.png',
			'./images/p13Bg2-340-340-t505l0.png',
			'./images/p13Bg3-500-400-t0l0.png',
			'./images/p13Bg4-560-252-t306r0.png',
			'./images/p13Bg5-420-400-t417r0.png',

			'./images/p13Bg6-460-500-t413l0.png',
			'./images/p13Bg7-180-370-t240l150.png',
			'./images/p13Bg640-1032.png',
			'./images/p14Bg1txt-480-375-t168l54.png',
			'./images/p14Bg2txt-260-36-t543l274.png',
			'./images/p14Bg3cctv-188-40-t824.png',
			'./images/p14Bg640-1032.png',
			'./images/page2wall640-514.png',
			'./images/page3-640-477.png',
			'./images/page4-640-390.png',
			'./images/top65-86.png',
			'./images/page2Txt.png',

			'./images/p15bg1-640-500.png'

		];

//资源加载
! function() {
	var t = function(t) {
	    if ("function" != typeof t) throw new Error("Invalid callback");
	    this.cb = t, this.images = [], this.sounds = [], this.__cachedSnds = {}
	};
	t.prototype.addImage = function(t) {
	    this.images.push(t)
	}, t.prototype.addSound = function(t) {
	    this.sounds.push(t)
	}, t.prototype.addImages = function(t) {
	    "object" == typeof t && t.length && (this.images = this.images.concat(t))
	}, t.prototype.addSounds = function(t) {
	    "object" == typeof t && t.length && (this.sounds = this.sounds.concat(t))
	}, t.prototype.load = function() {
	    for (var t = this.images.length, o = 0, n = this.sounds.length, i = this.cb, s = t + n, e = function() {
	        o++, i("progress", o / s), o == s && i("complete")
	    }, r = 0; r < this.images.length; r++) {
	        var h = new Image;
	        h.onload = function() {
	            this.onload = null, e()
	        }, h.onerror = function() {
	            this.onerror = null, i("error", this.src), e()
	        }, h.src = this.images[r]
	    }
	    var u = this;
	    for (r = 0; r < this.sounds.length; r++) {
	        var a = this.sounds[r],
	            c = new Audio(a);
	        c.__dturl = a, c.oncanplaythrough = function() {
	            clearTimeout(this.__timeoutId), this.oncanplaythrough = null, this.onerror = null, u.__cachedSnds[this.__dturl] = this, e()
	        }, c.onerror = function() {
	            clearTimeout(this.__timeoutId), this.oncanplaythrough = null, this.onerror = null, i("error", this.__dturl), e()
	        }, c.__timeoutId = setTimeout(function(t) {
	            t.oncanplaythrough()
	        }, 100, c), c.load()
	    }
	}, t.prototype.getSound = function(t) {
	    return this.__cachedSnds[t] || null
	}, window.Preloader = {
	    create: function(o) {
	        return new t(o)
	    }
	}
	}();

function load(arr,fnLoading,fnEnd){
	var oLoadBar=$('.loadBar i');
	var oLoading=$('.loading');
	var oLoad=$('.loadBar span');

	var loader = Preloader.create(function(type, val) {
		switch (type) {
			case "complete":
				//加载完成后的动作break;
				oLoading.css({'display': 'none'});
				fnEnd && fnEnd()
			break;
			case "progress":
			//console.log(val);
				oLoadBar.css({width: 100*val+'%'});
				oLoad.html( Math.floor(100*(val.toFixed(2)))+'%');
				// $('.double-bounce3').html(parseInt(val*100)+"%");
			break;
		}
	});
	loader.addImages(arr);
	loader.load();
}
//资源加载

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

/*
//7-11页重力感应
function gravity(obj){
	return
	if(window.DeviceMotionEvent){
		window.addEventListener('devicemotion',function(ev){
			var acc=ev.accelerationIncludingGravity;

			var x=acc.x.toFixed(2);
			var y=acc.y.toFixed(2);
			var z=acc.z.toFixed(2);

			obj.css({
				transform: 'translate3d(120px, 0, -320px) rotateY('+1*x+'deg) rotateX('+1*y+'deg)'
			});
		})
	}
}
*/

//第一屏切换到第二屏效果
function p1ToP2(json){
	json=json || {};
	json.oPW.css({
		'top':'1.5rem',
		'font-size':'0.9rem',
		'line-height':'1.25rem'
	});
	json.oP2yun.css({
		display:'block',
		opacity:'0.7',
	});
	setTimeout(function(){
	json.oP2yun.css({
		'transition':'30s all linear',
		transform:'translate3d(0,0,0)'
	});
	},100);
	json.oPW[0].addEventListener('webkitTransitionEnd',pwEnd);
	function pwEnd(ev){
		if(ev.propertyName=='line-height'){
			json.oP1.css({'display':'block'});
			json.oP2.css({'display':'block'});
			json.oPW.css({'display':'none'});
			json.oPage2Bg.css({'width':'16rem'});
			setTimeout(function(){
				json.oTxtWallP.css({
						transition:'1s all ease',
						'opacity':'1',
						transform:'translate3d(0,0,0)'
					});
			},700);
			json.oTxtWallP[0].addEventListener('webkitTransitionEnd',txtWallEnd);
		}
	}
	function txtWallEnd(ev){
		if(ev.propertyName=='transform'){
			typewrite(json.oTxtWallSp,'The <br> Great Wall', function(){
				json.oTxtBg.css({'width':'12.325rem'});
				json.oTxtBg[0].addEventListener('webkitTransitionEnd',txtBgEnd);
			},'.5s',100)
		}
	}
	function txtBgEnd(){
		json.oText.find('span').eq(0).css({
			transition:'1s all ease',
			opacity:'1',
			transform:'translate3d(0, 0, 0)'
		});
		setTimeout(function(){
			json.oText.find('span').eq(1).css({
				transition:'1s all ease',
				opacity:'1',
				transform:'translate3d(0, 0, 0)'
			});
			json.oText.find('span')[1].addEventListener('webkitTransitionEnd', toL);
		},300);
	}

	function toL(){
		json.oP2ToL[0].className='p2ToL addAni';
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
		json.oP3Tit.css({
			transition:'1s all ease',
			'opacity':'1',
			transform:'translate3d(0,0,0)'
		});
		json.oP3Tit[0].addEventListener('webkitTransitionEnd',end);
	},200);

	function end(ev){
		if(ev.propertyName=='transform'){
			typewrite(json.oP3titEng, 'Beijing Hangzhou the <br> Grande Canale', function(){
				json.oP3verse.find('span').eq(0).css({
					transition:'1s all ease',
					opacity:'1',
					transform:'translate3d(0, 0, 0)'
				});
				setTimeout(function(){
					json.oP3verse.find('span').eq(1).css({
						transition:'1s all ease',
						opacity:'1',
						transform:'translate3d(0, 0, 0)'
					});
					json.oP3verse.find('span')[1].addEventListener('webkitTransitionEnd', end2);
				},300);
			},'.5s',100);
		}
	}

	function end2(){
		json.oP3M.css({'width':'14rem'});
		json.oP3M[0].addEventListener('webkitTransitionEnd',end3);
	}

	function end3(){
		json.oP3Tol[0].className='p3ToL addAni';
	}
}

//第三屏切换到第四屏效果
function p3ToP4(json){
	json=json || {};
	json.oP4Bg.css({'width':'16rem'});
	setTimeout(function(){
		json.oP4Tit.css({
			transition:'1s all ease',
			'opacity':'1',
			transform:'translate3d(0,0,0)'
		});
		json.oP4Tit[0].addEventListener('webkitTransitionEnd',end);
	},200);

	function end(ev){
		if(ev.propertyName=='transform'){
			typewrite(json.oP4titEng, 'Dujiang Dam', function(){
				json.oP4M.css({'width':'14rem'});
				json.oP4M[0].addEventListener('webkitTransitionEnd',end2);
			},'1s',200);
		}
	}

	function end2(){
		json.oP4verse.find('span').eq(0).css({
			transition:'1s all ease',
			opacity:'1',
			transform:'translate3d(0, 0, 0)'
		});
		setTimeout(function(){
			json.oP4verse.find('span').eq(1).css({
				transition:'1s all ease',
				opacity:'1',
				transform:'translate3d(0, 0, 0)'
			});
			json.oP4verse.find('span')[1].addEventListener('webkitTransitionEnd', end3);
		},300);
	}
	function end3(){
		json.oP4Ch.css({
			webkitTransition:'1s all ease',
			transition:'1s all ease',
			opacity:'1',
			transform:'translate3d(0, 0, 0)',
			webkitTransform:'translate3d(0, 0, 0)'
		});
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
	json.oP6Bg2[0].className='p6Bg2 animated fadeIn';
	json.oP6Bg2[0].addEventListener('webkitAnimationEnd', end2);

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
			json.oP6L[0].className='p6L addAni';
		},'1.2s',240)
	}
}

//第六屏切换到第七屏效果
function p6ToP7(json){

	json.oP7Bg1[0].className=' p7Bg1 animated  fadeIn  ';
	json.oP7Bg1[0].addEventListener('webkitAnimationEnd', end);

	function end(){
		json.oP7Bg2[0].className=' p7Bg2 animated  fadeIn   '; //' p7Bg2 animated  fadeInDownBig';
		json.oP7Bg2[0].addEventListener('webkitAnimationEnd', end2);
	}
	function end2(){
		json.oP7Bg3[0].className=' p7Bg3 animated  fadeIn   ';//'p7Bg3 animated   fadeInLeftBig';
		json.oP7Bg3[0].addEventListener('webkitAnimationEnd', end3);
	}
	function end3(){
		json.oP7Bg4[0].className=' p7Bg4 animated  fadeIn   ';//'p7Bg4  animated  fadeInRightBig';
		json.oP7Bg4[0].addEventListener('webkitAnimationEnd', end4);
	}
	function end4(){
		json.oP7Bg5[0].className=' p7Bg5 animated  fadeIn   ';//'p7Bg5 animated  fadeInUpBig ';
		json.oP7Bg5[0].addEventListener('webkitAnimationEnd', end5);
	}
	function end5(){
		json.oP7Bg6[0].className=' p7Bg6 animated  fadeIn   ';//'p7Bg6 animated   fadeInLeftBig ';
		json.oP7Bg6[0].addEventListener('webkitAnimationEnd', end6);
	}
	function end6(){
		json.oP7Bg7[0].className=' p7Bg7 animated  fadeIn   ';//'p7Bg7 animated fadeInRightBig ';
		json.oP7Bg7[0].addEventListener('webkitAnimationEnd', end7);
	}
	function end7(){
		json.oP7Tit[0].className='p7tit animated fadeInDownBig';
		json.oP7Tit[0].addEventListener('webkitAnimationEnd', end8);
	}
	function end8(){
		json.oP7Det.find('a')[0].className='p7det animated  fadeInLeftBig ';
		json.oP7Det.find('a')[0].addEventListener('webkitAnimationEnd', end9);
	}
	function end9(){
		json.oP7Det.css({
			transition:'1s all ease',
			'color':'rgba(255, 255, 255, 1)'
		});
	}
}
//第七屏切换到第八屏效果
function p7ToP8(json){

	json.oP8Bg1[0].className=' p8Bg1 animated  fadeIn  ';//' p8Bg1 animated  fadeIn ';
	json.oP8Bg1[0].addEventListener('webkitAnimationEnd', end);

	function end(){
		json.oP8Bg2[0].className=' p8Bg2 animated  fadeIn ';//' p8Bg2 animated fadeInDownBig';
		json.oP8Bg2[0].addEventListener('webkitAnimationEnd', end2);
	}
	function end2(){
		json.oP8Bg3[0].className=' p8Bg3 animated  fadeIn  ';//'p8Bg3 animated   fadeInLeftBig';
		json.oP8Bg3[0].addEventListener('webkitAnimationEnd', end3);
	}
	function end3(){
		json.oP8Bg4[0].className=' p8Bg4 animated  fadeIn ';//'p8Bg4  animated  fadeInRightBig';
		json.oP8Bg4[0].addEventListener('webkitAnimationEnd', end4);
	}
	function end4(){
		json.oP8Bg5[0].className=' p8Bg5 animated  fadeIn ';//'p8Bg5 animated  fadeInUpBig ';
		json.oP8Bg5[0].addEventListener('webkitAnimationEnd', end5);
	}
	function end5(){
		json.oP8Bg6[0].className=' p8Bg6 animated  fadeIn ';//'p8Bg6 animated   fadeInLeftBig ';
		json.oP8Bg6[0].addEventListener('webkitAnimationEnd', end6);
	}
	function end6(){
		json.oP8Bg7[0].className=' p8Bg7 animated  fadeIn';//'p8Bg7 animated fadeInRightBig ';
		json.oP8Bg7[0].addEventListener('webkitAnimationEnd', end7);
	}
	function end7(){
		json.oP8Tit[0].className='p8tit animated fadeInDownBig';
		json.oP8Tit[0].addEventListener('webkitAnimationEnd', end8);
	}
	function end8(){
		json.oP8Det.find('a')[0].className='p8det animated  fadeInLeftBig ';
		json.oP8Det.find('a')[0].addEventListener('webkitAnimationEnd', end9);
	}
	function end9(){
		json.oP8Det.css({
			transition:'1s all ease',
			'color':'rgba(255, 255, 255, 1)'
		});
	}
}

//第八屏切换到第九屏效果
function p8ToP9(json){

	json.oP9Bg1[0].className=' p9Bg1 animated  fadeIn';
	json.oP9Bg1[0].addEventListener('webkitAnimationEnd', end);

	function end(){
		json.oP9Bg2[0].className=' p9Bg2 animated  fadeIn';//' p9Bg2 animated fadeInDownBig';
		json.oP9Bg2[0].addEventListener('webkitAnimationEnd', end2);
	}
	function end2(){
		json.oP9Bg3[0].className=' p9Bg3 animated  fadeIn';//'p9Bg3 animated   fadeInLeftBig';
		json.oP9Bg3[0].addEventListener('webkitAnimationEnd', end3);
	}
	function end3(){
		json.oP9Bg4[0].className=' p9Bg4 animated  fadeIn';//'p9Bg4  animated  fadeInRightBig';
		json.oP9Bg4[0].addEventListener('webkitAnimationEnd', end4);
	}
	function end4(){
		json.oP9Bg5[0].className=' p9Bg5 animated  fadeIn';//'p9Bg5 animated  fadeInUpBig ';
		json.oP9Bg5[0].addEventListener('webkitAnimationEnd', end5);
	}
	function end5(){
		json.oP9Bg6[0].className=' p9Bg6 animated  fadeIn';//'p9Bg6 animated   fadeInLeftBig ';
		json.oP9Bg6[0].addEventListener('webkitAnimationEnd', end6);
	}
	function end6(){
		json.oP9Bg7[0].className=' p9Bg7 animated  fadeIn';//'p9Bg7 animated fadeInRightBig ';
		json.oP9Bg7[0].addEventListener('webkitAnimationEnd', end7);
	}
	function end7(){
		json.oP9Tit[0].className='p9tit animated fadeInDownBig';
		json.oP9Tit[0].addEventListener('webkitAnimationEnd', end8);
	}
	function end8(){
		json.oP9Det.find('a')[0].className='p9det animated  fadeInLeftBig ';
		json.oP9Det.find('a')[0].addEventListener('webkitAnimationEnd', end9);
	}
	function end9(){
		json.oP9Det.css({
			transition:'1s all ease',
			'color':'rgba(255, 255, 255, 1)'
		});
	}
}

//第九屏切换到第十屏效果
function p9ToP10(json){

	json.oP10Bg1[0].className=' p10Bg1 animated  fadeIn ';
	json.oP10Bg1[0].addEventListener('webkitAnimationEnd', end);

	function end(){
		json.oP10Bg2[0].className=' p10Bg2 animated  fadeIn';//' p10Bg2 animated fadeInDownBig';
		json.oP10Bg2[0].addEventListener('webkitAnimationEnd', end2);
	}
	function end2(){
		json.oP10Bg3[0].className=' p10Bg3 animated  fadeIn';//'p10Bg3 animated   fadeInLeftBig';
		json.oP10Bg3[0].addEventListener('webkitAnimationEnd', end3);
	}
	function end3(){
		json.oP10Bg4[0].className=' p10Bg4 animated  fadeIn';//'p10Bg4  animated  fadeInRightBig';
		json.oP10Bg4[0].addEventListener('webkitAnimationEnd', end4);
	}
	function end4(){
		json.oP10Bg5[0].className=' p10Bg5 animated  fadeIn';//'p10Bg5 animated  fadeInUpBig ';
		json.oP10Bg5[0].addEventListener('webkitAnimationEnd', end5);
	}
	function end5(){
		json.oP10Bg6[0].className=' p10Bg6 animated  fadeIn';//'p10Bg6 animated   fadeInLeftBig ';
		json.oP10Bg6[0].addEventListener('webkitAnimationEnd', end6);
	}
	function end6(){
		json.oP10Bg7[0].className=' p10Bg7 animated  fadeIn';//'p10Bg7 animated fadeInRightBig ';
		json.oP10Bg7[0].addEventListener('webkitAnimationEnd', end7);
	}
	function end7(){
		json.oP10Tit[0].className='p10tit animated fadeInDownBig';
		json.oP10Tit[0].addEventListener('webkitAnimationEnd', end8);
	}
	function end8(){
		json.oP10Det.find('a')[0].className='p10det animated  fadeInLeftBig ';
		json.oP10Det.find('a')[0].addEventListener('webkitAnimationEnd', end9);
	}
	function end9(){
		json.oP10Det.css({
			transition:'1s all ease',
			'color':'rgba(255, 255, 255, 1)'
		});
	}
}

//第十屏切换到第十一屏效果
function p10ToP11(json){

	json.oP11Bg1[0].className=' p11Bg1 animated  fadeIn';
	json.oP11Bg1[0].addEventListener('webkitAnimationEnd', end);

	function end(){
		json.oP11Bg2[0].className=' p11Bg2 animated  fadeIn';//' p11Bg2 animated fadeInDownBig';
		json.oP11Bg2[0].addEventListener('webkitAnimationEnd', end2);
	}
	function end2(){
		json.oP11Bg3[0].className=' p11Bg3 animated  fadeIn';//'p11Bg3 animated   fadeInLeftBig';
		json.oP11Bg3[0].addEventListener('webkitAnimationEnd', end3);
	}
	function end3(){
		json.oP11Bg4[0].className=' p11Bg4 animated  fadeIn';//'p11Bg4  animated  fadeInRightBig';
		json.oP11Bg4[0].addEventListener('webkitAnimationEnd', end4);
	}
	function end4(){
		json.oP11Bg5[0].className=' p11Bg5 animated  fadeIn';//'p11Bg5 animated  fadeInUpBig ';
		json.oP11Bg5[0].addEventListener('webkitAnimationEnd', end5);
	}
	function end5(){
		json.oP11Tit[0].className='p11tit animated fadeInDownBig';
		json.oP11Tit[0].addEventListener('webkitAnimationEnd', end6);
	}
	function end6(){
		json.oP11Det.find('a')[0].className='p11det animated  fadeInLeftBig ';
		json.oP11Det.find('a')[0].addEventListener('webkitAnimationEnd', end7);
	}
	function end7(){
		json.oP11Det.css({
			transition:'1s all ease',
			'color':'rgba(255, 255, 255, 1)'
		});
	}
}

//第十一屏切换到第十二屏效果
function p11ToP12 (json){
	json.oP12Bg1.css({
		transition:'2s all ease',
		webkitTransition:'1s all ease',
		transform: 'translate3d(0, 0, 0)'
	})
	json.oP12txt.css({
		transition:'2s all ease',
		webkitTransition:'2s all ease 1.8s',
		height:'10rem',
		opacity:'1'
	});
	json.oP12Bg2.css({
		transition:'1s all ease',
		webkitTransition:'1s all ease 3.8s',
		opacity:'1'
	})
	json.oP12Bg3.css({
		transition:'1s all ease',
		webkitTransition:'1s all ease 5s',
		opacity:'1'
	})
}
//第十二屏切换到第十三屏效果
function p12ToP13 (json){
	json.oP13Bg1.css({
		webkitTransition:'1s all ease',
		transition:'1s all ease',
		transform:'scale(1)',
		webkitTransform:'scale(1)',
	});
	/*
	json.oP13Bg1[0].addEventListener('webkitTransitionEnd', end);
	function end(){
	*/
		json.oP13Bg2.css({
			webkitTransition:'1s all ease .5s',
			transition:'1s all ease .5s',
			transform:'scale(1)',
			webkitTransform:'scale(1)',
		});
	/*
		json.oP13Bg2[0].addEventListener('webkitTransitionEnd', end2);
	}
	function end2(){
	*/
		json.oP13Bg3.css({
			webkitTransition:'1s all ease .8s',
			transition:'1s all ease .8s',
			transform:'scale(1)',
			webkitTransform:'scale(1)',
		});
	/*
		json.oP13Bg3[0].addEventListener('webkitTransitionEnd', end3);
	}
	function end3(){
	*/
		json.oP13Bg4.css({
			webkitTransition:'1s all ease 1.2s',
			transition:'1s all ease 1.2s',
			transform:'scale(1)',
			webkitTransform:'scale(1)',
		});
	/*
		json.oP13Bg4[0].addEventListener('webkitTransitionEnd', end4);
	}
	function end4(){
	*/
		json.oP13Bg5.css({
			webkitTransition:'1s all ease 1.6s',
			transition:'1s all ease 1.6s',
			transform:'scale(1)',
			webkitTransform:'scale(1)',
		});
	
		json.oP13Bg5[0].addEventListener('webkitTransitionEnd', end5);
	
	function end5(){
	
		json.oP13Bg6.css({
			webkitTransition:'1s all ease',
			transition:'1s all ease',
			opacity:'1'
		});
		json.oP13Bg6[0].addEventListener('webkitTransitionEnd', end6);
	}
	function end6(){
		typewrite(json.oP13txt1, '我们看到未来看到梦想', function(){
			typewrite(json.oP13txt2, '这是雄心创造的', function(){
				json.oP13Bg7.css({
					webkitTransition:'1s all ease',
					transition:'1s all ease',
					opacity:'1',
					height:'9.25rem'
				});
				json.oP13Bg7[0].addEventListener('webkitTransitionEnd', end7);
			}, '1.2s', 240)
		},'1.2s',240)
	}

	function end7(){
		json.oP13Ch.css({
			webkitTransition:'1s all ease',
			transition:'1s all ease',
			opacity:'1',
			transform:'translate3d(0, 0, 0)',
			webkitTransform:'translate3d(0, 0, 0)'
		});
	}
}
//第十三屏切换到第十四屏效果
function p13ToP14(json){
	json.oP14Bg1.css({
		webkitTransition:'1.5s all ease',
		transition:'1.5s all ease',
		opacity:'1',
		height:'9.375rem'
	});
	json.oP14Bg1[0].addEventListener('webkitTransitionEnd', end);

	function end(){
		json.oP14Bg2.css({
			webkitTransition:'1.5s all ease',
			transition:'1.5s all ease',
			opacity:'1',
			width:'6.5rem'
		});
		json.oP14Bg2[0].addEventListener('webkitTransitionEnd', end2);
	}

	function end2(){
		json.oP14txt.css({
			webkitTransition:'1s all ease',
			transition:'1s all ease',
			opacity:'1',
			transform:'translate3d(0, 0, 0)',
			webkitTransform:'translate3d(0, 0, 0)'
		});
		json.oP14txt[0].addEventListener('webkitTransitionEnd', end3);
	}

	function end3(){
		json.oP14Bg3.css({
			webkitTransition:'1.5s all cubic-bezier(0, 0, 0.85, 0.04)',
			transition:'1.5s all ease',
			opacity:'1',
			transform:'translate3d(0, 0, 0)',
			webkitTransform:'translate3d(0, 0, 0)'
		});
	}
}

//第十四屏切换到十五屏效果
function p14Top15(json){
	json.oP15Bg2[0].className='p15Bg2 animated fadeIn';

	json.oP15Bg2[0].addEventListener('webkitAnimationEnd', end);
	function end(){
		json.oP15More[0].className='p15more animated fadeInDownBig';
		json.oP15More[0].addEventListener('webkitAnimationEnd', end2);
	}
	function end2(){
		json.oP15A1[0].className='p15a1 animated fadeInLeftBig';
		json.oP15A1[0].addEventListener('webkitAnimationEnd', end3);
	}
	function end3(){
		json.oP15A2[0].className='p15a2 animated fadeInLeftBig';
		json.oP15A2[0].addEventListener('webkitAnimationEnd', end4);
	}
	function end4(){
		json.oP15Bg1.css({
			transition:'1s all ease',
			opacity:'1',
			transform:'translate3d(0, 0, 0)'
		});
	}
}

window.onload=function(){
	var oM=$('#music'); 
	oM[0].play();
	oM[0].loop=true;
}

Zepto(function(){
	load(resource,
		function(){

		},
		function(){
		//音乐
		//oA.setattribute('loop','loop');
		var oPW=$('.titleW'),  			//全局标题
		
		//第一页元素获取
			oP1=$('.titleP1'),			//第一页标题
			oPageTop=$('.page1Top'),	//第一页向上箭头
			oLogo=$('.logo'),

		//第二页元素获取
			oP2=$('.titleP2'),			//第二页标题
			oPage2Bg=$('.page2Bg'),	//第二页背景图
			oTxtWallP=$('.txtWall .page2P1'),	//第二页 长城
			oTxtWallSp=$('.txtWall .page2P2'),	// 长城英文写法
			oText=$('.text'),						//诗句
			oP2ToL=$('.p2ToL'),				//向左箭头
			oTxtBg=$('.txtBg'),					//长城米数图片
			oP2yun=$('.p2yun'),

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
			oP4Ch=$('.p4ChangeGif'),
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

		//第七页元素获取
			oP7=$('.page7'),
			oP7Bg1=$('.p7Bg1'),
			oP7Bg2=$('.p7Bg2'),
			oP7Bg3=$('.p7Bg3'),
			oP7Bg4=$('.p7Bg4'),
			oP7Bg5=$('.p7Bg5'),
			oP7Bg6=$('.p7Bg6'),
			oP7Bg7=$('.p7Bg7'),
			oP7Tit=$('.p7tit'),
			oP7Det=$('.p7det'),

		//第八页元素获取
			oP8=$('.page8'),
			oP8Bg1=$('.p8Bg1'),
			oP8Bg2=$('.p8Bg2'),
			oP8Bg3=$('.p8Bg3'),
			oP8Bg4=$('.p8Bg4'),
			oP8Bg5=$('.p8Bg5'),
			oP8Bg6=$('.p8Bg6'),
			oP8Bg7=$('.p8Bg7'),
			oP8Tit=$('.p8tit'),
			oP8Det=$('.p8det'),

		//第九页元素获取
			oP9=$('.page9'),
			oP9Bg1=$('.p9Bg1'),
			oP9Bg2=$('.p9Bg2'),
			oP9Bg3=$('.p9Bg3'),
			oP9Bg4=$('.p9Bg4'),
			oP9Bg5=$('.p9Bg5'),
			oP9Bg6=$('.p9Bg6'),
			oP9Bg7=$('.p9Bg7'),
			oP9Tit=$('.p9tit'),
			oP9Det=$('.p9det'),

		//第十页元素获取
			oP10=$('.page10'),
			oP10Bg1=$('.p10Bg1'),
			oP10Bg2=$('.p10Bg2'),
			oP10Bg3=$('.p10Bg3'),
			oP10Bg4=$('.p10Bg4'),
			oP10Bg5=$('.p10Bg5'),
			oP10Bg6=$('.p10Bg6'),
			oP10Bg7=$('.p10Bg7'),
			oP10Tit=$('.p10tit'),
			oP10Det=$('.p10det'),

		//第十一页元素获取
			oP11=$('.page11'),
			oP11Bg1=$('.p11Bg1'),
			oP11Bg2=$('.p11Bg2'),
			oP11Bg3=$('.p11Bg3'),
			oP11Bg4=$('.p11Bg4'),
			oP11Bg5=$('.p11Bg5'),
			oP11Tit=$('.p11tit'),
			oP11Det=$('.p11det'),

		//第十二页元素获取
			oP12Bg1=$('.p12Bg1'),
			oP12Bg2=$('.p12Bg2'),
			oP12Bg3=$('.p12Bg3'),
			oP12txt=$('.p12txt'),

		//第十三页元素获取
			oP13Bg1=$('.p13Bg1'),
			oP13Bg2=$('.p13Bg2'),
			oP13Bg3=$('.p13Bg3'),
			oP13Bg4=$('.p13Bg4'),
			oP13Bg5=$('.p13Bg5'),
			oP13Bg6=$('.p13Bg6'),
			oP13Bg7=$('.p13Bg7'),
			oP13txt1=$('.p13txt1'),
			oP13txt2=$('.p13txt2'),
			oLongTapBg2=$('.longTapBg2'),
			oP13Ch=$('.p13ChangeGif'),

		//第十四页元素获取
			oP14Bg1=$('.p14Bg1'),
			oP14Bg2=$('.p14Bg2'),
			oP14Bg3=$('.p14Bg3'),
			oP14txt=$('.p14txt'),

		//第十五页元素获取
			oP15Bg1=$('.p15Bg1'),
			oP15Bg2=$('.p15Bg2'),
			oP15More=$('.p15more'),
			oP15A1=$('.p15a1'),
			oP15A2=$('.p15a2'),

		//当前页
			activePage=1;
		//page1打字
		typewrite(oPW,'伟大的时代<br>缔造伟大的工程',function(){
			oPageTop[0].className='page1Top addAni';
		});
		//是否是第一次进入第四页
		var toP4count='4';
		//是否是第一次进入第十三页
		var toP13count='13';

		//阻止默认事件
		$(document).on('touchstart',touchstar);

		function touchstar(ev){
		    ev.preventDefault();
		}		

		oLogo.css({
			transition:'3s all ease',
			transform:'scale(1)',
			opacity: '1',
			'-webkit-filter':'blur(0px)'
		});
		var swiperV1 = new Swiper('#v1>.swiper-container-v', {
			direction:'vertical',
			followFinger : false,
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
								  oP2ToL:oP2ToL,
								  oP2yun:oP2yun
							});
					break;
				}
			},
			allowSwipeToPrev : true
		});
		var swiperH1 = new Swiper('#h1>.swiper-container-h', {
			direction:'horizontal',
			followFinger : true,
			spaceBetween: 0,
			//allowSwipeToPrev : false,
			onSlideChangeEnd: function(swiper){
				swiper.unlockSwipes();
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
							oP4Ch:oP4Ch,
							oP4Bg:oP4Bg
						});
						//将swiper锁定不让滑动
						//console.log(toP4count);
						if(toP4count=='4'){
							swiper.lockSwipes();
						}
						else{
							swiper.unlockSwipes();
						}
						$(document).longTap(function(){
							oP2yun.css({'display':'none'});
							oLongTapBg[0].className='longTapBg animated fadeIn';
							oLongTapBg.css({'transform':'scale(25)'});
							oLongTapBg[0].addEventListener('webkitTransitionEnd',end);
						});
						function end(){
							swiperH1.slideNext();
							oLongTapBg[0].removeEventListener('webkitTransitionEnd',end);
						}
					break;
					case 3:
						activePage=5;
						oLongTapBg.css({'display':'none'});
						//滑到第五页时
						toP4count='45';
						console.log(toP4count);
						p4ToP5({
							oP5Bg1:oP5Bg1,
							oP5Bg2:oP5Bg2,
							oP5Bg3:oP5Bg3,
							oP5txt:oP5txt,
							oP5Top:oP5Top
						});
					break;
				}
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
						toP4count==2;
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
			},
			keyboardControl:true
		});
		var swiperH2 = new Swiper('#h2>.swiper-container-h', {
			direction:'horizontal',
			followFinger : false,
			spaceBetween: 0,
			//allowSwipeToPrev : false,
			onSlideChangeEnd: function(swiper){
				switch(swiper.activeIndex){
					case 0:
						activePage=6;
					break;
					case 1:
						activePage=7;
						p6ToP7({
							oP7:oP7,
							oP7Bg1:oP7Bg1,
							oP7Bg2:oP7Bg2,
							oP7Bg3:oP7Bg3,
							oP7Bg4:oP7Bg4,
							oP7Bg5:oP7Bg5,
							oP7Bg6:oP7Bg6,
							oP7Bg7:oP7Bg7,
							oP7Tit:oP7Tit,
							oP7Det:oP7Det
						});
					break;
					case 2:
						activePage=8;
						p7ToP8({
							oP8:oP8,
							oP8Bg1:oP8Bg1,
							oP8Bg2:oP8Bg2,
							oP8Bg3:oP8Bg3,
							oP8Bg4:oP8Bg4,
							oP8Bg5:oP8Bg5,
							oP8Bg6:oP8Bg6,
							oP8Bg7:oP8Bg7,
							oP8Tit:oP8Tit,
							oP8Det:oP8Det
						});
					break;
					case 3:
						activePage=9;
						p8ToP9({
							oP9:oP9,
							oP9Bg1:oP9Bg1,
							oP9Bg2:oP9Bg2,
							oP9Bg3:oP9Bg3,
							oP9Bg4:oP9Bg4,
							oP9Bg5:oP9Bg5,
							oP9Bg6:oP9Bg6,
							oP9Bg7:oP9Bg7,
							oP9Tit:oP9Tit,
							oP9Det:oP9Det
						});
					break;
					case 4:
						activePage=10;
						p9ToP10({
							oP10:oP10,
							oP10Bg1:oP10Bg1,
							oP10Bg2:oP10Bg2,
							oP10Bg3:oP10Bg3,
							oP10Bg4:oP10Bg4,
							oP10Bg5:oP10Bg5,
							oP10Bg6:oP10Bg6,
							oP10Bg7:oP10Bg7,
							oP10Tit:oP10Tit,
							oP10Det:oP10Det
						});
					break;
					case 5:
						activePage=11;
						p10ToP11({
							oP11:oP11,
							oP11Bg1:oP11Bg1,
							oP11Bg2:oP11Bg2,
							oP11Bg3:oP11Bg3,
							oP11Bg4:oP11Bg4,
							oP11Bg5:oP11Bg5,
							oP11Tit:oP11Tit,
							oP11Det:oP11Det
						});
					break;
					case 6:
						activePage=12;
						setTimeout(function(){
							p11ToP12({
								oP12Bg1:oP12Bg1,
								oP12Bg2:oP12Bg2,
								oP12Bg3:oP12Bg3,
								oP12txt:oP12txt,
							});
						},300);
					break;
				}
				if(activePage>6){
					swiperV2.lockSwipeToPrev();
				}
				else{
					swiperV2.unlockSwipeToPrev();
				}
				//alert(activePage);
			},
			keyboardControl:true
		});
		var swiperV3 = new Swiper('#v3>.swiper-container-v', {
			direction:'vertical',
			spaceBetween: 0,
			followFinger : false,
			keyboardControl:true,
			onSlideChangeEnd: function(swiper){
				//activePage=mySwiper.activeIndex
				swiper.unlockSwipes();
				switch(swiper.activeIndex){
					case 0:
						activePage=12;
					break;
					case 1:
						activePage=13;
						setTimeout(function(){
							p12ToP13({
								oP13Bg1:oP13Bg1,
								oP13Bg2:oP13Bg2,
								oP13Bg3:oP13Bg3,
								oP13Bg4:oP13Bg4,
								oP13Bg5:oP13Bg5,
								oP13Bg6:oP13Bg6,
								oP13Bg7:oP13Bg7,
								oP13txt1:oP13txt1,
								oP13txt2:oP13txt2,
								oP13Ch:oP13Ch
							});
						},300);
						//将swiper锁定不让滑动
						if(toP13count=='13'){
							swiperV3 .lockSwipes();
						}
						else{
							swiper.unlockSwipes();
						}
						/*
						$('.page13').on('touchstart',function(ev){
						    ev.preventDefault();
						});
						*/
						$(document).longTap(function(){
							oLongTapBg2[0].className='longTapBg2 animated fadeIn';
							oLongTapBg2.css({'transform':'scale(20)'});
							oLongTapBg2[0].addEventListener('webkitTransitionEnd',end2);
						});
						function end2(){
							swiperH3.slideNext();
							oLongTapBg2[0].removeEventListener('webkitTransitionEnd',end2);
						}
					break;
				}
				//alert(activePage);
			},
			//allowSwipeToPrev : false
		});
		var swiperH3 = new Swiper('#h3>.swiper-container-h', {
			direction:'horizontal',
			spaceBetween: 0,
			effect : 'fade',
			followFinger : false,
			//allowSwipeToPrev : false,
			onSlideChangeEnd: function(swiper){
				switch(swiper.activeIndex){
					case 0:
						activePage=13;
					break;

					case 1:
						activePage=14;
						toP13count='1314';
						oLongTapBg2.css({'display':'none'});
						p13ToP14({
							oP14Bg1:oP14Bg1,
							oP14Bg2:oP14Bg2,
							oP14Bg3:oP14Bg3,
							oP14txt:oP14txt,
						})
					break;
				}
				if(activePage>13){
					swiperV3.lockSwipeToPrev();
				}
				else{
					swiperV3.unlockSwipeToPrev();
				}
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
						p14Top15({
							oP15Bg1:oP15Bg1,
							oP15Bg2:oP15Bg2,
							oP15More:oP15More,
							oP15A1:oP15A1,
							oP15A2:oP15A2,
						});
						$(document).off('touchstart', touchstar);
					break;
				}
				if(activePage==15){
					swiperH3.lockSwipeToPrev();
				}
				else{
					swiperH3.unlockSwipeToPrev();
				}
				//alert(activePage);
			},
			keyboardControl:true
		});
	})
})
