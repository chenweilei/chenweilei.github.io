function Game(){
	//通过的关数
	this.pass = 1;
	//最高的过关数
	this.maxPass = 0;
	//方块的数量
	this.boxCount = 4;
	//错误的次数
	this.errConut = 0;
	//总的次数 15次
	this.totalCount = 15;

	//得到的分数
	this.grade = 0;
	//最高分数
	this.maxgrade = 0;
	//每一关的方块数量
	this.passBox = [3, 4, 5, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8];
	//当前关卡 目标方块的位置
	//[0, 1, 1, 1];
	this.curPassTargetBox = [];
	//当前关卡，翻过的正确方块的数量
	this.curPassOkBoxCount = 0;
	this.templ = '	<div class="box fl">\
						<div class="box_back"></div>\
						<div class="box_front"></div>\
					</div>';
	//当前的舞台元素
	this.stage = null;
	//分数对象
	this.oGrade = $('.grade');
	//游戏次数
	this.oCount = $('.count');
	this.bClick = false;
	this.init();

}

Game.prototype = {
	init: function(){
		this.updataBoxCount();
	},
	start: function(){
		this.creatRandBox();
		this._addClass();
	},
	_addClass: function(){
		var _this = this;
		for(var i=0; i<this.curPassTargetBox.length; i++){
			this.stage.children().removeClass('active target');
		}
		//为所有目标方块增加 target class
		for(var i=0; i<this.curPassTargetBox.length; i++){
			if(this.curPassTargetBox[i] != 0){
				this.stage.children().eq(i).addClass('target');
			}
		}
		//为所有目标方块添加 active
		var oTarget = this.stage.find('.target');
		clearTimeout(this.timer1);
		this.timer1 = setTimeout(function(){
			for(var i=0; i<oTarget.length; i++){	
				oTarget.eq(i).addClass('active')
			}
			clearTimeout(_this.timer2);
			_this.timer2 = setTimeout(function(){
				for(var i=0; i<oTarget.length; i++){	
					oTarget.eq(i).removeClass('active')
					clearTimeout(_this.timer3);
					_this.timer3 = setTimeout(function (){
						_this.bClick = true;
						_this.bAddClassTimer = true;
						_this.boxClick();
					},1000);
						
				}
			}, 1500)
		}, 1000)
	},
	//点击方块
	boxClick: function(){
		this.curPassOkBoxCount = 0;
		if(this.pass+this.errConut != 1){
			this.stage.html(this.stage.html());
		}
		var _this = this;
		_this.stage.children().each(function(k, v){
			//$(this).off('click', _this.fnClick)
			$(this).one('click', _this.fnClick.bind(_this,this))
		})

	},
	fnClick: function(ele){
		var _this = this;
		if(_this.bClick){
			$(ele).addClass('active')

			if($(ele).hasClass('target')){
				_this.curPassOkBoxCount++;
				_this.grade++;
				_this.updataGrade();
				if(_this.curPassOkBoxCount == _this.passBox[_this.pass-1]){
					//alert('过关了')
					_this.bClick = false;
					_this.pass++;
					_this.updataBoxCount();
					_this.creatRandBox();
					_this.updataStage();
					_this.updataPass()
					setTimeout(function(){
						_this.changeStage();

						_this._addClass()
					}, 1000)
				}
			}else{
				//alert('失败')
				_this.errConut++;
				_this.creatRandBox();
				_this.updataBoxCount();
				_this.updataStage();
				_this.updataPass()
				setTimeout(function(){
					_this.changeStage();
					_this._addClass()
				}, 1000);
				_this.bClick = false;
			}
		}else{
			return;
		}
	},
	//倒计时
	time: function(ele, fnCallBack){
		var n = 3;
		var timer = null;
		timer = setInterval(function(){
			n--;
			ele.html(n);
			if(n == 0){
				clearInterval(timer)
				fnCallBack && fnCallBack();
			}
		}, 1000)
	},
	//更新方块数量
	updataBoxCount: function(){
		switch(this.pass){
			case 1:
				this.boxCount = 4;
				break;

			case 2:
			case 3: 
				this.boxCount = 9;
				break;

			default:
				this.boxCount = 16;
				break;
		}
		this.updataStage();
	},
	//改变舞台元素
	updataStage: function(){
		this.stage = $('.box'+this.boxCount)
	},
	//切换舞台
	changeStage: function(){
		$('.stage').removeClass('cur');
		this.stage.addClass('cur');
		this.boxClick();
	},
	//更新分数
	updataGrade: function(){
		this.oGrade.html(this.grade)
	},
	//更新游戏次数
	updataPass: function(){
		var _this = this;
		console.log(this.pass+this.errConut)
		if(this.pass+this.errConut > 15){
			setTimeout(function (){
				_this.gameOver();
			}, 1500)
		}else{
			this.oCount.html(this.pass+this.errConut)
		}
	},
	//游戏结束
	gameOver: function(){
		var _this = this;
		$('body>div').removeClass('active')
		$('.p4').addClass('active');

		if(this.pass > this.maxPass){
			this.maxPass = this.pass;
		};
		if(this.grade > this.maxgrade){
			this.maxgrade = this.grade;
		}
		setTimeout(function(){
			_this.resetGame();
		}, 1000)
		$('title').html('我在美好记忆方块的得分是'+this.grade+'一起来玩吧！');
		alert('我在美好记忆方块的得分是'+this.grade);

		this.setL();
	},
	setL: function (){
		var d = new Date();
		var mhjy = window.localStorage.getItem('mhjy') || "{}";
		mhjy = JSON.parse(mhjy);
		var date = d.getFullYear() + this.toDou(d.getMonth()) + this.toDou(d.getDay());
		if(mhjy.time == date){
			mhjy.times += 1;
		}else{
			mhjy.time = date;
			mhjy.times = 1;
		}
		window.localStorage.setItem('mhjy',JSON.stringify(mhjy));
	},
	toDou: function(n){
		return n<10?'0'+n:''+n;
	},
	//重置游戏
	resetGame: function(){
		this.pass = 1;
		this.grade = 0;
		this.errConut = 0;
		this.updataGrade();
		this.updataPass();
		this.updataBoxCount();
		this.creatRandBox();
		$('.time').html('3');
		$('.time').css('display', 'block')
		for(var i=0; i<$('.stage').length; i++){
			$('.stage').removeClass('cur')
			$('.stage').eq(i).children().removeClass('active target')
		}
	},
	//创建随机方块的数组
	creatRandBox: function(){
		var num = 0;
		var tarNum = 0;
		var curPass = this.pass-1;
		this.curPassTargetBox = [];
		for(var i=0; i<this.boxCount; i++){
			if(this.passBox[curPass] == this.boxCount - num){
				this.curPassTargetBox.push(1);
			}else{
				if(Math.random()>1-(this.passBox[curPass]/this.boxCount)){
					if(tarNum == this.passBox[curPass]){
						this.curPassTargetBox.push(0)
					}else{
						this.curPassTargetBox.push(1)
						tarNum++;
					}
				}else{
					this.curPassTargetBox.push(0)
					num++;
				}
			}
		}
	},

};

function init(){
	var game = new Game();

	$('#mp3')[0].play();

	//播放音乐
	$('.p1').click(function(){
		$('#mp3')[0].play();
	})

	//点击暂停音乐
	$('.misic-pause').on('click', function(ev){
		$('#mp3')[0].pause();
		ev.stopPropagation();
	})

	//点击播放音乐
	$('.misic-play').click(function(){
		$('#mp3')[0].play();
	});	

	//点击游戏规则
	$('.game-rule').click(function(){
		$('body>div').removeClass('active')
		$('.p2').addClass('active')
	})

	//点击返回主页
	$('.go-home').click(function(){
		$('body>div').removeClass('active')
		$('.p1').addClass('active')
	})

	$('.go-home2').click(function(){
		$('body>div').removeClass('active')
		$('.p1').addClass('active')
	})

	//点击开始游戏
	$('.start').click(function(){
		var mhjy = window.localStorage.getItem('mhjy') || "{}";
		mhjy = JSON.parse(mhjy);
		var fx = window.localStorage.getItem('isCanInfinity');
		if(mhjy.times >= 2 && fx != '1'){
			alert('你今日的闯关机会用完了，分享朋友圈可无限畅玩哦~');
		}else{
			$('body>div').removeClass('active')
			$('.p3').addClass('active');

			game.time($('.time'), function(){
				$('.time').css('display', 'none');
				$('.box4').addClass('cur')

				game.start();
			})
		}
		
	})

	//点击兑换
	$('.prize').click(function(){
		$.ajax({
			url: "./test.txt",
			data: {
				score: game.maxgrade
			},
			dataType: 'json',
			success: function (data){
				console.log(data);
				alert('兑换奖品');
			},
			error: function (){
				alert('服务器错误，请稍后再试');
			}
		})
	})
}


var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;

if (isWeixin) {
	document.addEventListener("WeixinJSBridgeReady", init, false);
}else{
	$(init)
}



