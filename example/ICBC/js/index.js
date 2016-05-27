(function(win, doc){
	//答题结果，对应某种类型
	var res={
		jq:{
			index:'0',
			tit:'探险达人',
			con:'您是高风险探险达人，勇于尝试多种投资，作为理财的弄潮儿，时刻走在金融市场的前沿！<br>加强投资理财知识，您一定是未来的“巴菲特”！'
		},
		cz:{
			index:'1',
			tit:'投资大赢家',
			con:'您是投资理财达人，在金融市场运筹帷幄，茁壮成长。未来的投资大赢家，没错，就是你！'
		},
		ph:{
			index:'2',
			tit:'知人善任的大Boss',
			con:'会投资，善于专人专用，这是您最大的智慧。将自己的资产交由理财专人打理，达到均衡投资，平衡收益，您是知人善任的大Boss'
		},
		wj:{
			index:'3',
			tit:'理智沉稳的思想者',
			con:'您思维谨慎、理智，追求稳妥，不冒进。您更加喜欢踏踏实实的打理您的“小金库”，有条不紊，一定会得到自己的收获。'
		},
		bs:{
			index:'4',
			tit:'踏踏实实的黄牛系',
			con:'您是踏踏实实的“老黄牛”，相对于那些需要承担风险的理财升值投资，您更加青睐通过自己辛勤的耕耘来获取自己踏踏实实的财富。'
		}
	}
	$(function(){
		var oTit=$('#mainTitle'),
			oPage1=$('.mainBg');
			oP1=$('#people1'),
			oP2=$('#people2'),
			oP3=$('#people3'),
			oP4=$('#people4'),
			oStarBtn=$('#but'),
			oPage2=$('.contBg'),
			oTNum=$('.tNum');
			oP2T=$('#bookBg'),
			aDd=$('#bookBg dd'),
			oLoad=$('.loadBar i'),
			oLoadBar=$('.loadBar span'),
			oPage3=$('.page3'),
			aP3_tit_div=$('.p3_tit div'),
			oP3reg_top=$('.p3reg_top'),
			oP3_btn=$('.p3_btn'),
			oPage4=$('.page4'),
			oP4_btn=$('.p4_btn'),
			oShare=$('.share'),
			aT=$('.t1');

		//总得分
		var total=0;
		//根据得分算出的类型
		var type='';

		//预加载图片
		CWLload('data-src', 'bg', oLoad, oLoadBar, function(){
			oPage1.css({
				opacity:1
			});
			oPage1.on('webkitTransitionEnd', p1Show);
		});

		//第一页
		function p1Show(){
			oTit.css({
				transition : '1s all ease ', 
				webkitTransition : '1s all ease ', 
				webkitTransform : 'translate3d(0px, 0px, 0px)', 
				transform : 'translate3d(0px, 0px, 0px)'
			})
			oTit.on('webkitTransitionEnd', end1);
			oPage1.off('webkitTransitionEnd', p1Show);
		}

		function end1(){
			oP1.css({
				transition : '1s all ease ', 
				webkitTransition : '1s all ease ', 
				webkitTransform : 'translate3d(0px, 0px, 0px)', 
				transform : 'translate3d(0px, 0px, 0px)'
			});
			oP2.css({
				transition : '1s all ease .4s', 
				webkitTransition : '1s all ease .4s', 
				webkitTransform : 'translate3d(0px, 0px, 0px)', 
				transform : 'translate3d(0px, 0px, 0px)'
			});
			oP3.css({
				transition : '1s all ease .8s', 
				webkitTransition : '1s all ease .8s', 
				webkitTransform : 'translate3d(0px, 0px, 0px)', 
				transform : 'translate3d(0px, 0px, 0px)'
			});
			oP4.css({
				transition : '1s all ease 1.2s', 
				webkitTransition : '1s all ease 1.2s', 
				webkitTransform : 'translate3d(0px, 0px, 0px)', 
				transform : 'translate3d(0px, 0px, 0px)'
			});
			oP4.on('webkitTransitionEnd', end5);
			
			oTit.off('webkitTransitionEnd', end1);
		}

		function end5(){
			oStarBtn.css({
				transition : '1s all ease ', 
				webkitTransition : '1s all ease ', 
				webkitTransform : 'translate3d(0px, 0px, 0px)', 
				transform : 'translate3d(0px, 0px, 0px)'
			});

			oP4.off('webkitTransitionEnd', end5);
		}

		//点击开始答题按钮
		oStarBtn.tap(function(){
			oPage1.addClass('getOut');
			oPage2.css({
				opacity:1
			});
		});
		//点击每一题
		aDd.each(function(index, item){
			$(item).tap(function(){
				//console.log($(this).attr('data-score'));
				$(this).addClass('active');
				total+=parseInt($(this).attr('data-score'));
				//console.log($(this).parents()[2]);
				if($($(this).parents()[2]).attr('data-T')=='9'){
					//alert('最后一题');
					fnTotal(total);
					oP3reg_top.html(res[type]['con']);
					aP3_tit_div.eq(parseInt(res[type]['index'])).addClass('active');
					oPage2.css({
						webkitTransform : 'translate3d(-16rem, 0px, 0px)', 
						transform : 'translate3d(-16rem, 0px, 0px)'
					});
					oPage3.css({
						opacity:1
					});
					CWLload('data2-src', 'bg');
					CWLload('dataImg-src', 'img');
				}
				else{
					$($(this).parents()[2]).next().addClass('active');
					oTNum.css({
						webkitTransform: 'translate3d(0rem, -'+parseInt($($(this).parents()[2]).attr('data-T'))*1.85+'rem, 0rem)',
						transform: 'translate3d(0rem, -'+parseInt($($(this).parents()[2]).attr('data-T'))*1.85+'rem, 0rem)'
					});
				}
			});
		});

		//点击抽红包
		oP3_btn.tap(function(){
			oPage4.css({
				opacity:1
			});
			oPage3.css({
				webkitTransform : 'translate3d(-16rem, 0px, 0px)', 
				transform : 'translate3d(-16rem, 0px, 0px)'
			});
		});

		oP4_btn.tap(function(){
			oShare.css({
				display:'block'
			});
		});
		/*
		    算分
		进取型 120-170
		成长型 97-120
		平衡型 55-97
		稳健型 20-55
		保守型 0-19	
		*/
		function  fnTotal(n){
			if(n>=120){
				//进取型
				type='jq';
			}else if(n>=97){
				//成长型
				type='cz';
			}else if(n>=55){
				//平衡型
				type='ph';
			}else if(n>=20){
				//稳健型
				type='wj';
			}else{
				//保守型
				type='bs';
			}
		}
		//微信config
		$.ajax({
			url: 'http://a.liveapp.com.cn/iwx/config/get_jsconfig',
			data:{
				url: location.href,
				callback: 'wxConfig'
			},
			type: 'GET',
			dataType:'jsonp',
			success: function(json){
				//console.log(json.data);
				var data=json.data;
				wx.config({
					debug: false,
					appId: data.appId,
					timestamp:data.timestamp ,
					nonceStr:data.nonceStr ,
					signature:data.signature,
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'onMenuShareQZone'
					]
				});
			}
		});
		wx.ready(function () {
			//分享到朋友圈
			wx.onMenuShareTimeline({
				title: '工行一分钟',
				link: 'http://icbc.uliveapp.com/',
				imgUrl: 'http://icbc.uliveapp.com/images/people3-192-206.png',
				success: function () { 
					alert('分享朋友圈成功');
					oShare.css({
						display:'none'
					});
				},
				cancel: function () { 
				    alert('分享朋友圈失败');
				}
			});	
			//分享给微信好友
			wx.onMenuShareAppMessage({
				title: '工行一分钟', 
				desc: '测试文字测试文字测试文字测试文字', 
				link: 'http://icbc.uliveapp.com/', 
				imgUrl: 'http://icbc.uliveapp.com/images/people3-192-206.png', 
				type: 'link', 
				success: function () { 
					alert('分享给朋友成功')
					oShare.css({
						display:'none'
					});
				},
				cancel: function () { 
					alert('分享给朋友失败')
				}
			});
		});
	});
})(window, document)
