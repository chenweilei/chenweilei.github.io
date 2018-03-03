//动画循环
window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame 
|| window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
function(callback) { 
	return window.setTimeout(function() { 
		return callback(Date.now()); 
	}, 1000 / 60);
});

window.cancelAnimationFrame || (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || 
function(timeid) {
	return clearTimeout(timeid); 
});

function Game(){
	this.canvas = $('#canvas')[0];
	this.ctx = this.canvas.getContext('2d');
	this.sW = window.innerWidth;
	this.sH = window.innerHeight;

	this.timer = null;
	this.FPS = 16;
	this.startTime = Date.now();
	this.endTime = Date.now();
	this.curTime = 0;
	this.disTime = 1000;
	this.n = 0;
	this.isTap = false;
	this.addqqTimer = null;
	this.dieID = 0;
	this.gradeEle = $('.time');

	this.addImgDisTime = 1100;

	//游戏状态
	this.gameStatus = 'ready';

	//图片下落的速度  300px每秒
	this.downSpeed = 200;
	//图片向右移动的速度
	this.rightSpeed = 130;

	//下落的图片数组
	this.gameIngImg = [];


	//是否开始计时
	this.isStartTime = false;
	//图片是否可以开始下落
	this.isImgMove = false;

	//loadImg
	this.aImgUrl = [];
	this.resourse = {};
	this.imagesLoaded = 0;
	this.imagesFailedToLoad = 0;

	this.init();
}
Game.prototype = {
	init: function(){
		this.scaleCanvas();
	},
	scaleCanvas: function(){
		this.canvas.style.width = this.sW+'px';
		this.canvas.style.height = this.sH+'px';
		this.canvas.width = 640;
		this.canvas.height = (640*this.sH/this.sW)|0 ;
		this.canvasScale = (640/this.sW).toFixed(2);
	},
	changeStage: function(){
		$('.p2').removeClass('flex');
		$('.p3').addClass('flex');
		$('.p2-img1').css('display', 'block')
		this.gradeEle.html('0.0')
		this.setP3Style();
		this.reset();
	},
	setP3Style: function(){
		var html = this.curTime;
		$('.p3-time').html(html)
		$('.p3-resimg').children().removeClass('active')
		console.log(this.dieID)
		var arr = this.dieID.split('/');
		var dieid = arr[arr.length-1];

		if(html < 1){
			window.shareDesc = '我一进家门就怼了三姑，卒';
			$('.p3-resimg').children().eq(0).addClass('active')
		}else if(html < 5){
			window.shareDesc = '我坚持了'+html+'秒，躲得了三姑，却躲不过大姨的灵魂拷问“还不找对象？';
			$('.p3-resimg').children().eq(1).addClass('active')
		}else if(html < 9){
			window.shareDesc = '我坚持了'+html+'秒，倒在了给二舅姥爷敬酒的路上';
			$('.p3-resimg').children().eq(2).addClass('active')
		}else if(html < 13){
			window.shareDesc = '我坚持了'+html+'秒，隔壁的熊孩子们来串门了，没想到吧！';
			$('.p3-resimg').children().eq(3).addClass('active')
		}else if(html < 17){
			window.shareDesc = '我坚持了'+html+'秒，大侄子：“我可以摸摸你的奖杯吗？”';
			$('.p3-resimg').children().eq(4).addClass('active')
		}else{
			window.shareDesc = '我坚持了'+html+'秒，我真是爸妈的小棉袄，姥姥的心头好，爷爷的掌中宝，全村人的骄傲！';
			$('.p3-resimg').children().eq(5).addClass('active')
		}
		window.shareTitle = '春节求生大作战，我坚持了'+html+'秒，你来试试！';
		console.log(window.shareTitle, window.shareDesc)

	},
	reset: function(){
		this.gameIngImg = [];
		this.curTime = 0;
		this.n = 0;
		this.gameStatus = 'ready';
		this.isStartTime = false;
		this.isImgMove = false;
		this.addImgDisTime = 1100;
		this.downSpeed = 200;
		clearInterval(this.addqqTimer);
	},
	//开始
	start: function(){
		this.timer = requestAnimationFrame(this.animateloop.bind(this));
	},
	//暂停
	stop: function(){
		//console.log(this.timer)
		cancelAnimationFrame(this.timer);
	},
	//获取图片
	getImage: function(str){
		return this.resourse[str];
	},
	//开始加载图片
	startLoad: function(){
		for(var i=0; i<this.aImgUrl.length; i++){
			this.preload2(this.aImgUrl[i])
		}
	},
	//加载过程
	preload2: function(url){
		var img = new Image();
		img.src = "./images/"+url;
		var _this = this;
		img.addEventListener('load', function(){
			_this.imagesLoaded++;

		})
		img.addEventListener('error', function(){
			_this.imagesFailedToLoad++;

		})
		this.resourse[url] = img;
	},
	//加载进度
	loading: function(){
		return ((this.imagesLoaded + this.imagesFailedToLoad) / this.aImgUrl.length) * 100;
	},
	//获取 m - n 之间的随机数()不包括m
	getRnd: function(m, n){
		return (Math.random()*(n-m)+m)|0
	},
	//添加掉落的图片
	addqq: function(){
		var _this = this;
		var n = 0;
		clearInterval(this.addqqTimer);
		this.addqqTimer = setInterval(function(){
			n++;
			//每隔1400毫秒 出现一次横向移动的文字
			if(n%1 == 0){
				//添加水平移动的文字
				var xobj1 = _this.getImage('game_ing_'+_this.getRnd(2, 32)+'.png');
				var xobj2 = _this.getImage('game_ing_'+_this.getRnd(2, 32)+'.png');

				var _xobj1 = {
					img: xobj1,
					id: xobj1.src,
					w: xobj1.width,
					h: xobj1.height,
					x: -xobj1.width,
					y: _this.getRnd(xobj1.height, _this.canvas.height),
					vy: 0,
					vx: _this.rightSpeed,
				};
				_this.gameIngImg.push(_xobj1)
			}

			//每隔 2600毫秒 出现一次 都是亲戚全靠你帮忙
			if(n%4 == 0){
				var obj3 = _this.getImage('game_ing_33.png');
				_this.gameIngImg.push({
					img: obj3,
					id: obj3.src,
					w: obj3.width,
					h: obj3.height,
					x: Math.random()<0.5?0:120,
					y: -obj3.height,
					vx: 0,
					vy: _this.downSpeed
				})
			}else{

				//添加垂直下落的文字
				var obj1 = _this.getImage('game_ing_'+_this.getRnd(1, 32)+'.png');
				var obj2 = _this.getImage('game_ing_'+_this.getRnd(1, 32)+'.png');
				var x = (Math.random()*_this.canvas.width - obj1.width/2) | 0;

				_this.gameIngImg.push({
					img: obj1,
					id: obj1.src,
					w: obj1.width,
					h: obj1.height,
					vx: 0,
					vy: _this.downSpeed,
					x: x,
					y: -obj1.height
				}, {
					img: obj2,
					id: obj2.src,
					w: obj2.width,
					h: obj2.height,
					vx: 0,
					vy: _this.downSpeed,
					x: x+obj1.width+_this.ME.w+40,
					y: -obj2.height
				})


			}

			//每隔 3900毫秒出现一次 buff
			if(n%6 == 0){
				var buffImg = _this.getImage('game_ing_0.png');
				_this.gameIngImg.push({
					img: buffImg,
					x: (Math.random()*_this.canvas.width - buffImg.width/2) | 0,
					y: -200,
					w: buffImg.width,
					h: buffImg.height,
					vy: 360,
					vx: 0,
					isbuff: true,
				})	
			}			


			//每隔 6500毫秒 出现一群熊孩子
			if(n%8 == 0){
				var childres = _this.getImage('childrens.png');
				_this.gameIngImg.push({
					id: childres.src,
					img: childres,
					x: (Math.random()*_this.canvas.width - childres.width/2) | 0,
					y: _this.getRnd(0, _this.canvas.height*2/3),
					w: childres.width,
					h: childres.height,
					vy: 800,
					vx: 0,
				})	
			}

			if(_this.curTime > 11){
				_this.downSpeed = 230;
			}
			if(_this.curTime > 17){
				_this.downSpeed = 250;
			}
			if(_this.curTime > 23){
				_this.downSpeed = 280;
				_this.addImgDisTime = 700;
			}
			if(_this.curTime > 29){
				_this.downSpeed = 310;
			}


		}, this.addImgDisTime)
	},
	//停止添加
	stopAddQQ: function(){
		clearInterval(this.addqqTimer);
	},
	//添加小人
	addME: function(){
		var meIMG = this.getImage('ME.png');
		this.ME = {
			img: meIMG,
			w: meIMG.width,
			h: meIMG.height,
			x: 100,
			y: this.canvas.height - meIMG.height
		};
	},
	//添加姑妈
	addGUMA: function(){
		var img = this.getImage('game_ing_1.png');
		this.gameIngImg.push({
			id: img.src,
			img: img,
			w: img.width,
			h: img.height,
			vx: 0,
			vy: this.downSpeed,
			x: 160,
			y: this.canvas.height-400
		})

		for(var i=0; i<3; i++){
			var otherImg1 = this.getImage('game_ing_'+this.getRnd(2, 31)+'.png');
			var otherImg2 = this.getImage('game_ing_'+this.getRnd(2, 31)+'.png');
			var otherX = (Math.random()*this.canvas.width - otherImg1.width/2) | 0;

			this.gameIngImg.push({
				id: otherImg1.src,
				img: otherImg1,
				w: otherImg1.width,
				h: otherImg1.height,
				vx: 0,
				vy: this.downSpeed,
				x: otherX,
				y: this.gameIngImg[this.gameIngImg.length-1].y-200
			}, {
				img: otherImg2,
				id: otherImg2.src,
				w: otherImg2.width,
				h: otherImg2.height,
				vx: 0,
				vy: this.downSpeed,
				x: otherX+otherImg1.width+this.ME.w+40,
				y: this.gameIngImg[this.gameIngImg.length-1].y-200
			})
		}
	},
	animateloop: function(){
		this.timer = requestAnimationFrame(this.animateloop.bind(this));
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		this.FPS = Date.now() - this.endTime;
		this.endTime = Date.now();

		if(this.isStartTime){
			this.n+=this.FPS;
			this.curTime = (this.n/1000).toFixed(1);
			//更新时间
			this.gradeEle.html(this.curTime)
		}

		//画下落的字
		for(var i=0; i<this.gameIngImg.length; i++){
			this.ctx.drawImage(this.gameIngImg[i].img, this.gameIngImg[i].x, this.gameIngImg[i].y)
			if(this.isImgMove){
				this.gameIngImg[i].x+=this.gameIngImg[i].vx*this.FPS/1000;
				this.gameIngImg[i].y+=this.gameIngImg[i].vy*this.FPS/1000;
			}
			if(this.gameIngImg[i].y >= this.canvas.height + this.gameIngImg[i].h || this.gameIngImg[i].x >= this.canvas.width + this.gameIngImg[i].w){
				this.gameIngImg.splice(i, 1)
				i--;
			}
		}
		//画人物
		if(this.ME){
			this.ctx.drawImage(this.ME.img, this.ME.x, this.ME.y)
		}

		for(var i=0; i<this.gameIngImg.length; i++){
			if(this.collision(this.ME, this.gameIngImg[i])){
				if(this.gameIngImg[i].isbuff === true){
					console.log('吃到buff了')
					this.n+=5000;
					this.gameIngImg.splice(i, 1)
					i--;
				}else{
					this.gameStatus = 'over';
					//死了
					this.dieID = this.gameIngImg[i].id;
					//停止游戏循环
					this.stop();
					//播放死掉的音乐
					if(bMusic){
						endbgm[0].muted = false;
						endbgm[0].currentTime = 0;
						endbgm[0].play();
						mp3[0].currentTime = 0;
						mp3[0].pause();
						$('.p1-music').addClass('pause')
						$('.p2-music').addClass('pause')
					}

					//切换场景
					this.changeStage();
				}
			}
		}

	},
	//碰撞检测
	collision: function(obj1, obj2){

		if(
			obj1.x>obj2.x+obj2.w || 
			obj1.y>obj2.y+obj2.h ||
			obj1.x+obj1.w < obj2.x ||
			obj1.y+obj1.h < obj2.y
		){
			return false;
		}else{
			return true;
		}

	},
	drag: function(){
		var _this = this;
		this.canvas.addEventListener('touchstart', function(ev){
			//console.log(ev)
			var mX = ev.touches[0].clientX*_this.canvasScale;
			var mY = ev.touches[0].clientY*_this.canvasScale;
		 	var disX = mX - _this.ME.x;
		 	var disY = mY - _this.ME.y;

			if(
				mX - _this.canvas.offsetLeft > _this.ME.x +_this.ME.w || 
				mX - _this.canvas.offsetLeft < _this.ME.x || 
				mY - _this.canvas.offsetTop > _this.ME.y +_this.ME.h || 
				mY - _this.canvas.offsetTop < _this.ME.y	
			){
				_this.isTap = false;
			}else{
				_this.isTap = true;
				if(_this.gameStatus === 'ready'){
					//点击小人时，开启计时
					_this.isStartTime = true;
					//提示 图片消失
					$('.p2-img1').css('display', 'none');
					//开始添加下落图片
					_this.addqq();
					//图片开启移动
					_this.isImgMove = true;

					_this.gameStatus = 'start';
				}
			}

			document.addEventListener('touchmove', _this.fntouchmove.bind(_this, disX, disY), false);
			document.addEventListener('touchend', _this.fntouchend.bind(_this), false);

			ev.preventDefault();
		}, false)

	},
	fntouchmove: function(x, y, ev){
		//console.log(ev.clientX*this.canvasScale - x, ev.clientX*this.canvasScale - y)
		if(this.isTap){
			this.ME.x = ev.touches[0].clientX*this.canvasScale - x;
			this.ME.y = ev.touches[0].clientY*this.canvasScale - y;

			if(this.ME.x<0){
				this.ME.x = 0;
			}
			if(this.ME.y<0){
				this.ME.y = 0;
			}
			if(this.ME.x > this.canvas.width-this.ME.w){
				this.ME.x = this.canvas.width-this.ME.w
			}
			if(this.ME.y > this.canvas.height-this.ME.h){
				this.ME.y = this.canvas.height-this.ME.h
			}
		}
		if(!$('.p3').hasClass('flex')){
			ev.preventDefault();
		}
	},
	fntouchend: function(ev){
		document.removeEventListener('touchmove', this.fntouchmove, false);
		document.removeEventListener('touchend', this.fntouchend, false);
	}
}

function init(){
	var game = new Game();
	
	//音乐开关 默认 关掉
	window.bMusic = false; 

	//音乐
	window.mp3 = $('#mp3');
	window.endbgm = $('#endbgm');
	endbgm[0].loop = false;

	$('.p1-music').tap(function(ev){

		if($(this).hasClass('pause')){
			bMusic = true;
			$(this).removeClass('pause')
			$('.p2-music').removeClass('pause')
			mp3[0].play();
			endbgm[0].muted = true;
			endbgm[0].play();
			//endbgm[0].play();
		}else{
			bMusic = false;
			$(this).addClass('pause')
			$('.p2-music').addClass('pause')
			mp3[0].pause();
		}

		ev.stopPropagation();
		return false;
	})
	$('.p2-music').tap(function(ev){

		if($(this).hasClass('pause')){
			bMusic = true;
			$(this).removeClass('pause')
			$('.p1-music').removeClass('pause')
			mp3[0].play();
			endbgm[0].muted = true;
			endbgm[0].play();
		}else{
			bMusic = false;
			$(this).addClass('pause')
			$('.p1-music').removeClass('pause')
			mp3[0].pause();
		}

		ev.stopPropagation();
		return false;
	})

	//图片预加载
	for(var i=0; i<32; i++){
		game.aImgUrl.push('game_ing_'+i+'.png')
	};
	game.aImgUrl.push('childrens.png')
	game.aImgUrl.push('ME.png')
	game.aImgUrl.push('game_ing_33.png')
	game.startLoad();
	var timer2 = null;
	timer2 = setInterval(function(){
		$('#loading-txt').html(game.loading().toString().substring(0, 5)+'%')

		if(game.loading() == 100){
			clearInterval(timer2)
			$('.loading').removeClass('flex')
			$('.p1').addClass('flex')


			//提示开启音乐
			setTimeout(function(){
				alert('开启音效更好玩哦')

			}, 500)

		}
	}, 30)


	//点击分享
	$('.sharebtn').tap(function(){
		$('.share').addClass('flex')
	})

	//关闭分享
	$('.share').tap(function(){
		$(this).removeClass('flex')
	})

	//点击挑战
	$('.p1-btn1').tap(function(ev){
		//alert(1)
		$('.p1').removeClass('flex')
		$('.p2').addClass('flex')

		//console.log(game.loading())
		if(game.loading() == 100){
			//开启动画循环
			game.start();
			//添加人物
			game.addME();
			//添加初始下落图片
			game.addGUMA();
			//开启人物拖拽
			game.drag();
		}

	})

	//重新开始
	$('.restart').tap(function(){
		game.init();
		$('.p3').removeClass('flex');
		$('.p2').addClass('flex');
		//开启动画循环
		game.start();
		//添加人物
		game.addME();
		//添加初始下落图片
		game.addGUMA();
		if(bMusic){
			mp3[0].play();
			$('.p1-music').removeClass('pause')
			$('.p2-music').removeClass('pause')
		}
	})

	
	//设置默认的分享标题
	window.shareTitle = '春节求生大作战，我坚持了0秒，你来试试！';
	//默认分享描述
	window.shareDesc = '我一进家门就怼了三姑，卒';
}	


var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;

if (isWeixin) {
	document.addEventListener("WeixinJSBridgeReady", init, false);
}else{
	$(init)
}