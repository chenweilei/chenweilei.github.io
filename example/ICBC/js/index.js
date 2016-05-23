(function(win, doc){
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
			aT=$('.t1');

			//总得分
			var total=0;

			CWLload('data-src', 'bg', oLoad, oLoadBar, function(){
				//alert(1);
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

			aDd.each(function(index, item){
				$(item).tap(function(){
					//console.log($(this).attr('data-score'));
					$(this).addClass('active');
					total+=parseInt($(this).attr('data-score'));
					//console.log($(this).parents()[2]);
					if($($(this).parents()[2]).attr('data-T')=='9'){
						alert('最后一题');
						fnTotal(total);
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
				alert('您的得分为'+n+'：进取型');
			}else if(n>=97){
				//成长型
				alert('您的得分为'+n+'：成长型');
			}else if(n>=55){
				//平衡型
				alert('您的得分为'+n+'：平衡型');
			}else if(n>=20){
				//平衡型
				alert('您的得分为'+n+'：平衡型');
			}else{
				//保守型
				alert('您的得分为'+n+'：保守型');
			}
		}
	});
})(window, document)
