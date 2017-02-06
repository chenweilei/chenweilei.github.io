/*
	name: '捕鱼达人',
	ver: 1.0.0,
	author: 'willyChen'
*/

window.onload = function(){
	var loadBox = document.querySelectorAll('#load span')[0];
	var showFps = document.querySelector('#showfps');
	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');
	//储存背景，控制条， 加减按钮的图像数据
	var surface_bg = null;
	//加号按下时的图像数据
	var surface_bg_plus = null;
	//减号按下时的图像数据
	var surface_bg_reduce = null;
	//加减号按下的状态    false/'plus'/'reduce';
	var bPlusDown = false;
	//用于计算帧数率
	var lastTime = 0;
	//帧数率
	var fpt = 60;
	//鱼的速度
	var vFish = 60;
	//大炮的角度
	var connonDeg = 0;
	//加号1/减号1
	var oBottom_plus1, oBottom_reduce1;
	//加号2/减号2
	var oBottom_plus2, oBottom_reduce2;
	//底部控制条图片对象
	var oImgBottom = null;
	//鱼的数组
	var aFish = [];
	//死鱼数组;
	var aDieFish = [];
	//子弹的数组
	var aBullet = [];
	//渔网数组;
	var aWeb = [];
	//游戏动画循环
	var gameTimer = null;

	//金币数量
	var nGold = 100;

	//鱼死时显示获得金币数组;
	var aDieFishGold = [];


	load(aCourse,function(progress){
		loadBox.innerHTML = "加载进度"+progress+"%";

		//资源加载完成
		if(progress == 100){
			//alert('加载完成')
			loadBox.parentNode.style.display = 'none';
		}
	}, function(aCourse){
		//console.log(aCourse)

		//画背景
		if(findCourse(aCourse, 'bg')){
			ctx.drawImage(findCourse(aCourse, 'bg'), 0, 0)
		}

		//画底部控制条，画加/减号
		oImgBottom = findCourse(aCourse, 'bottom');
		if(oImgBottom){

			//画控制条
			ctx.drawImage(oImgBottom, 0, 0, 765, 71, 129, 699, 765, 71)
			//画加号
			oBottom_plus1 = CourseSize.bottom_plus1;
			oBottom_plus2 = CourseSize.bottom_plus2;
			ctx.drawImage(
				oImgBottom, 
				oBottom_plus1.x1, 
				oBottom_plus1.y1, 
				oBottom_plus1.w, 
				oBottom_plus1.h, 
				oBottom_plus1.x2, 
				oBottom_plus1.y2, 
				oBottom_plus1.w, 
				oBottom_plus1.h
			)
			//画减号
			oBottom_reduce1 = CourseSize.bottom_reduce1;
			oBottom_reduce2 = CourseSize.bottom_reduce2;
			ctx.drawImage(
				oImgBottom, 
				oBottom_reduce1.x1, 
				oBottom_reduce1.y1, 
				oBottom_reduce1.w, 
				oBottom_reduce1.h, 
				oBottom_reduce1.x2, 
				oBottom_reduce1.y2, 
				oBottom_reduce1.w, 
				oBottom_reduce1.h
			)
		}
		//储存背景，控制条，加减按钮
		surface_bg = ctx.getImageData(0,0, 1024, 768);
		surface_bg_plus = createCanvas(findCourse(aCourse, 'bg'), oImgBottom, oBottom_plus1, oBottom_plus2, oBottom_reduce1, oBottom_reduce2, 'plus');
		surface_bg_reduce = createCanvas(findCourse(aCourse, 'bg'), oImgBottom, oBottom_plus1, oBottom_plus2, oBottom_reduce1, oBottom_reduce2, 'reduce');

		//画大炮
		var cannon = new Cannon();
		var cannonImg;
		drawCannon();

		//子弹图片对象
		var bulletImg;
		if(findCourse(aCourse, 'bullet')){
			bulletImg = findCourse(aCourse, 'bullet');
		} 

		//渔网图片对象
		var webImg;
		if(findCourse(aCourse, 'web')){
			webImg = findCourse(aCourse, 'web');
		} 

		//金币数字图片对象;
		var goldNumImage;
		if(findCourse(aCourse, 'number_black')){
			goldNumImage = findCourse(aCourse, 'number_black');
		} 

		//金币图片对象
		var goldImg;
		if(findCourse(aCourse, 'coin2')){
			goldImg = findCourse(aCourse, 'coin2');
		} 

		var getGoldNumImg;
		if(findCourse(aCourse, 'coinText')){
			getGoldNumImg = findCourse(aCourse, 'coinText');
		} 


		//点击鼠标时
		canvas.onmousedown = function(ev){
			var bbox = windowToCanvas(canvas, ev.clientX, ev.clientY)
			connonDeg = radToDeg(Math.atan((cannon.y - bbox.y)/(bbox.x - cannon.x)));
			if(connonDeg<0){
				connonDeg = connonDeg+180;
			}

			ctx.save()
			ctx.translate(472, 711)
			ctx.putImageData(surface_bg, 0, 0, 472, 711, 177, 57);
			ctx.restore()

			var bInRectPlus = mouseInRect({
				mx: bbox.x,
				my: bbox.y,
				tarX: oBottom_plus1.x2,
				tarY: oBottom_plus1.y2,
				tarW: oBottom_plus1.w,
				tarH: oBottom_plus1.h,				
			});
			var bInRectReduce = mouseInRect({
				mx: bbox.x,
				my: bbox.y,
				tarX: oBottom_reduce1.x2,
				tarY: oBottom_reduce1.y2,
				tarW: oBottom_reduce1.w,
				tarH: oBottom_reduce1.h,
			});
			if(bInRectPlus){
				//console.log('点的是加号')
				cannon.type+=1;
				if(cannon.type>6){
					cannon.type = 0;
				}
				oBottomPlus('plus')
				drawCannon()
			}else if(bInRectReduce){
				//console.log('点的是减号')
				cannon.type-=1;
				if(cannon.type<0){
					cannon.type = 6;
				}
				oBottomPlus('reduce')
				drawCannon()
			}else{
				//alert(1)
				if(nGold == 0){
					alert('没有金币了')
					return
				}

				cannon.deg = connonDeg;
				cannon.draw(ctx, cannonImg)
				//console.log(cannon)
				cannon.animate(ctx, cannonImg, surface_bg)


				var bulletVec = vector2d(0, -100);
				bulletVec.normalize()
				bulletVec.rotate(degToRad(90-connonDeg))
				//子弹速度
				bulletVec.scale(200)
				var oBullet = new Bullet({
					img: bulletImg,
					type: cannon.type,
					w: CourseSize["bullet"+(cannon.type+1)].w,
					h: CourseSize["bullet"+(cannon.type+1)].h,
					posX: CourseSize["bullet"+(cannon.type+1)].x1,
					posY: CourseSize["bullet"+(cannon.type+1)].y1,
					deg: connonDeg,
					vec: bulletVec
				});

				aBullet.push(oBullet)

				//金币数量减少
				nGold -= (cannon.type+1)*10;
				if(nGold <= 0){
					nGold = 0;
				}
				//console.log(nGold)
			}
		}

		function animation(now){
			//更新每秒帧数率
			if(!now){
				now = +new Date;
			}
			fps = calculateFps(now);
			//showFps.innerHTML = "fps："+Math.floor(fps);

			//重画背景
			if(bPlusDown === false){
				ctx.putImageData(surface_bg, 0, 0)
			}else if(bPlusDown === 'plus'){
				ctx.putImageData(surface_bg_plus, 0, 0)
			}else if(bPlusDown === 'reduce'){
				ctx.putImageData(surface_bg_reduce, 0, 0)
			}

			//循环鱼
			for(var i=0; i<aFish.length; i++){
				aFish[i].draw(ctx)
				if(aFish[i].status == 'life'){
					aFish[i].x+=aFish[i].vec.vx/fps;
					aFish[i].y+=aFish[i].vec.vy/fps;
				}

				//鱼出界
				if(objInCanvas(aFish[i].x, aFish[i].y)){
					aFish.splice(i, 1)
					i--;
					//console.log(aFish)
				}
			}

			//循环子弹
			for(var i=0; i<aBullet.length; i++){
				aBullet[i].draw(ctx)
				aBullet[i].x+=aBullet[i].vec.vx/fps;
				aBullet[i].y+=aBullet[i].vec.vy/fps;
				if(aBullet[i].x<-50 || aBullet[i].x>1024+50 || aBullet[i].y<-50 || aBullet[i].y>768+50){
					aBullet.splice(i, 1)
					i--;
					//console.log(aFish)
				}
			}

			//子弹，鱼碰撞检测
			for(var i=0; i<aBullet.length; i++){
				for(var j=0; j<aFish.length; j++){
					var bDraw = canvasCollision(aBullet[i], aFish[j]);
					if(bDraw){

						aWeb.push({
							x: aBullet[i].x,
							y: aBullet[i].y,
							w: CourseSize['web'+(aBullet[i].type+1)].w,
							h: CourseSize['web'+(aBullet[i].type+1)].h,
							type: aBullet[i].type
						})

						aBullet.splice(i, 1);
						i--;
						break;
					}
				}
			}

			//画金币
			if(aDieFishGold.length>0){
				for(var i=0; i<aDieFishGold.length; i++){
					aDieFishGold[i].draw(ctx)
					//aDieFishGold[i].animate(ctx)
					// ;(function(index){
					// 	setTimeout(function(){
					// 		aDieFishGold.splice(index, 1)
					// 	}, 500)
					// })(i)
					if(aDieFishGold[i].status == 'hide'){
						aDieFishGold.splice(i, 1)
					}
				}
			}

			//画渔网
			;(function(){
				if(aWeb.length>0){
					for(var i=0; i<aWeb.length; i++){
						drawWeb(ctx, aWeb[i], webImg);

						(function(index){
							setTimeout(function(){
								aWeb.splice(index, 1);
								i--;
							}, 150)
						})(i)

					}
				}
			})()

			//鱼和渔网碰撞检测
			for(var i=0; i<aFish.length; i++){
				for(var j=0; j<aWeb.length; j++){
					if(canvasCollision(aFish[i], aWeb[j])){
						aFish[i].status = 'die';
						aFish[i].n = 0;
						aFish[i].time = 80;
						aFish[i].animate(aFish[i].ctx, aFish[i].surface)

						removeDieFish()
					}
				}
			}
			//console.log(aDieFishGold)

			//画大炮
			drawCannon();

			//显示金币数量
			drawGoldNum(ctx, goldNumImage, nGold.toString())


			gameTimer = requestAnimationFrame(animation);
		}

		gameTimer = requestAnimationFrame(animation);

		//添加鱼
		setInterval(function(){
			addFish()
		}, 200)

		//移除死鱼
		function removeDieFish(){

			setTimeout(function(){
				for(var i=0; i< aFish.length; i++){

					if(aFish[i].status == 'die'){
						nGold+=(aFish[i].type+1)*10;
						if(nGold>999999){
							nGold = 999999;
						}
						var oCoin = new Coin({
							ctx: ctx,
							coinImg: goldImg,
							coinCountImg: getGoldNumImg,
							x: aFish[i].x+aFish[i].w/2,
							y: aFish[i].y,
							coinCount: aFish[i].type*10,
							count: (aFish[i].type+1)*10
						})
						aDieFishGold.push(oCoin)
						aFish.splice(i, 1)
						//console.log(aDieFishGold)
					}
				}
			}, 500)
		}



		//往鱼数组里面添加鱼
		function addFish(){

			//鱼的型号
			var fishType = rnd(0, 12);
			//鱼从左边出现还是右边出现，true在右边出现，false在左边出现
			var bScale = Math.random()<0.5 ? true : false;
			//鱼在X轴方向出现的位置
			var x = bScale ? 1024 : -550;
			//鱼的图片对象
			var oFishImg = findCourse(aCourse, 'fish'+(fishType+1));
			//鱼速度的方向
			var vDir = bScale ? -vFish : vFish;
			//鱼的角度
			var fishDeg = rnd(-60, 70);
			var vec;
			if(!bScale){
				vec = vector2d(100, 0);
			}else{
			 	vec = vector2d(-100, 0);
			}


			vec.normalize();
			vec.rotate(degToRad(fishDeg))
			vec.scale(60);

			var fish = new Fish({
				ctx: ctx,
				x: x,
				y: rnd(310, 450),
				w: CourseSize["fish"+(fishType+1)].w, 
				h: CourseSize["fish"+(fishType+1)].h,
				vec: vec,
				deg: fishDeg, //限制范围  -60 - 70
				length: CourseSize["fish"+(fishType+1)].len - 4,
				img: oFishImg,
				type: fishType,
				bScale: bScale,
				surface: surface_bg
			});
			aFish.push(fish)
		}

		//对象是否在画布外面
		function objInCanvas(x, y){
			//差值
			var step = 300; 
			if(x<0-step-400 || x>1024+step+200 || y<0-step || y>768+step){
				return true;
			}
			else{
				return false;
			}
		}


		//画大炮
		function drawCannon(){
			cannonImg = findCourse(aCourse, 'cannon'+(cannon.type+1));
			if(cannonImg){
				cannon.w = CourseSize['cannon'+(cannon.type+1)].w;
				cannon.h = CourseSize['cannon'+(cannon.type+1)].h;
				cannon.x = CourseSize['cannon'+(cannon.type+1)].x2;
				cannon.y = CourseSize['cannon'+(cannon.type+1)].y2;
				cannon.deg = connonDeg;
				cannon.draw(ctx, cannonImg)
			}
		}

		//显示金币数量
		function drawGoldNum(ctx, img, sGold){
			var n = sGold.length;

			if(sGold.length<6){
				for(var i=0; i<6-n; i++){
					sGold = 0+sGold;
				}
			}

			ctx.save();
			for(var i=0; i<sGold.length; i++){
				ctx.drawImage(img, 0, (9-sGold.charAt(i))*24, 20, 24, 150+i*(20+3), 742, 20, 24)
			}

			ctx.restore();
		}

		//点击加减号时的动画
		function oBottomPlus(str){
			bPlusDown = true;
			if(str == 'plus'){
				//console.log(1)
				bPlusDown = 'plus';
				ctx.drawImage(
					oImgBottom, 
					oBottom_plus2.x1, 
					oBottom_plus2.y1, 
					oBottom_plus2.w, 
					oBottom_plus2.h, 
					oBottom_plus2.x2, 
					oBottom_plus2.y2, 
					oBottom_plus2.w, 
					oBottom_plus2.h
				)
				setTimeout(function(){
					ctx.drawImage(
						oImgBottom, 
						oBottom_plus1.x1, 
						oBottom_plus1.y1, 
						oBottom_plus1.w, 
						oBottom_plus1.h, 
						oBottom_plus1.x2, 
						oBottom_plus1.y2, 
						oBottom_plus1.w, 
						oBottom_plus1.h
					)
					bPlusDown = false;
				}, 100)
			}else{
				bPlusDown = 'reduce';
				ctx.drawImage(
					oImgBottom, 
					oBottom_reduce2.x1, 
					oBottom_reduce2.y1, 
					oBottom_reduce2.w, 
					oBottom_reduce2.h, 
					oBottom_reduce2.x2, 
					oBottom_reduce2.y2, 
					oBottom_reduce2.w, 
					oBottom_reduce2.h
				)
				setTimeout(function(){
					ctx.drawImage(
						oImgBottom, 
						oBottom_reduce1.x1, 
						oBottom_reduce1.y1, 
						oBottom_reduce1.w, 
						oBottom_reduce1.h, 
						oBottom_reduce1.x2, 
						oBottom_reduce1.y2, 
						oBottom_reduce1.w, 
						oBottom_reduce1.h
					)
					bPlusDown = false;
				}, 100)
			}
		}

		//调试
		function debug(imageData,w, h, x, y){
			var canvas2 = document.createElement('canvas');
			canvas2.width = w;
			canvas2.height = h;
			canvas2.style.position = 'fixed';
			canvas2.style.top = '0px';
			canvas2.getContext("2d").putImageData(imageData, x, y, -x, -y, w, h)
			document.body.appendChild(canvas2)
		}
	})

	//计算帧数率
	function calculateFps(now) {
	    var fps = 1000 / (now - lastTime);
	    lastTime = now;
	    return fps; 
	}

	//创建离屏canvas返回加减号状态图像数据
	function createCanvas(bg, bottom, plus1, plus2, reduce1, reduce2, type){
		var canvas = document.createElement('canvas');
		canvas.width = 1024;
		canvas.height = 768;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(bg, 0, 0);
		ctx.drawImage(bottom, 0, 0, 765, 71, 129, 699, 765, 71)
		if(type == 'plus'){
			ctx.drawImage(bottom, plus2.x1, plus2.y1, plus2.w, plus2.h, plus2.x2, plus2.y2, plus2.w, plus2.h)
			ctx.drawImage(bottom, reduce1.x1, reduce1.y1, reduce1.w, reduce1.h, reduce1.x2, reduce1.y2, reduce1.w, reduce1.h)
		}else{
			ctx.drawImage(bottom, plus1.x1, plus1.y1, plus1.w, plus1.h, plus1.x2, plus1.y2, plus1.w, plus1.h)
			ctx.drawImage(bottom, reduce2.x1, reduce2.y1, reduce2.w, reduce2.h, reduce2.x2, reduce2.y2, reduce2.w, reduce2.h)
		}
		return ctx.getImageData(0,0, 1024, 768);
	}

	//画渔网
	function drawWeb(ctx, obj, webImg){
		//console.log(CourseSize, obj.type)
		//console.log(ctx)
		var w = CourseSize['web'+(obj.type+1)].w;
		var h = CourseSize['web'+(obj.type+1)].h;
		var x = CourseSize['web'+(obj.type+1)].x;
		var y = CourseSize['web'+(obj.type+1)].y;
		var x2 = obj.x;
		var y2 = obj.y;
		ctx.save();
		ctx.translate(x2, y2);
		// ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
		// ctx.fillRect(0-w/2, 0-w/2, w, h)
		ctx.drawImage(webImg, x, y, w, h, -w/2, -h/2, w, h)

		ctx.restore();
	}
}