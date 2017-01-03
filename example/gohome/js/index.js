$(function(){
	var curIndex = 0;
	var count = 0;
	var A , B, C, D;
	var time;
	var aTimeL = [9, 9, 9];
	var aTimeR = [9, 9];
	var eleTimeL = $('.time_l'), eleTimeR = $('.time_r');
	var swiper = new Swiper('.swiper-container', {
		direction : 'vertical',
		onTransitionEnd: function(swiper){
			console.log(swiper.activeIndex)
			curIndex = swiper.activeIndex;
			//swiperAnimate(swiper); 
			if(curIndex == 2 && count == 0){
				reload('data-src3', null, null, function(){
					count = 1;
				})
			}
			if(curIndex == 3){
				swiper.lockSwipeToNext()
			}
		},
		onInit: function(swiper){ 
			//alert(1)
			//swiperAnimateCache(swiper); 
			swiperAnimate(swiper); 
		},
		onSlideChangeStart: function(swiper){
			
		},
		onSlideChangeEnd: function(swiper){
			//alert(curIndex)
			swiperAnimate(swiper);

			if(curIndex == 2){
				swiper.lockSwipeToNext()
				eleTimeL.each(function(key){
					$(this).css({
						'background-position': '0 -108vw',
					})
				})
				eleTimeR.each(function(key){
					$(this).css({
						'background-position': '0 -108vw'
					})
				})
			} 
			if(curIndex == 3){
				setTimeout(function(){
					eleTimeL.each(function(key){
						console.log(key, aTimeL)
						$(this).css({
							'background-position': '0 -'+parseInt(aTimeL[key])*12+'vw',
							'transition-delay': key*1+'s',
							'-webkit-transition-delay': key*1+'s'
						})
					})
					eleTimeR.each(function(key){
						$(this).css({
							'background-position': '0 -'+parseInt(aTimeR[key])*12+'vw',
							'transition-delay': key*1+3+'s',
							'-webkit-transition-delay': key*1+3+'s'
						})
					})
				}, 1000)
			}
		} 
	})
	reload('data-src1',null, null, function(){
		$('.swiper-container').css({
			'min-height': $('.warp').height()
		})
		//alert(1)
		var aErr = false;
		setTimeout(function(){
			reload('data-src2', null, null)
		}, 800)
		//A框；
		$('input[name=A]').blur(function(){
			if($(this).val()>99 || $(this).val()<30){
				alert('请输入一个30-99之间的数字')
				aErr = true;
				$(this).css({
					"background-color": "#cf474f"
				})
				return
			}else{
				$(this).css({
					"background": "none"
				})
				aErr = false;
				A = $(this).val();
			}
		})
		//B框；
		$('input[name=B]').blur(function(){
			if($(this).val()>365 || $(this).val()<0){
				alert('请输入一个0-365之间的数字')
				aErr = true;
				$(this).css({
					"background-color": "#cf474f"
				})
				return
			}else{
				$(this).css({
					"background": "none"
				})
				aErr = false;
				B = $(this).val();
			}
		})
		//C框；
		$('input[name=C]').blur(function(){
			if($(this).val()>365 || $(this).val()<0){
				alert('请输入一个0-365之间的数字')
				aErr = true;
				$(this).css({
					"background-color": "#cf474f"
				})
				return
			}else{
				$(this).css({
					"background": "none"
				})
				aErr = false;
				C = $(this).val();
			}
		})
		$('.p3_btn').click(function(){
			if(aErr === true){
				alert('请输入合理的数字')
				return
			}
			swiper.unlockSwipeToNext();
			A = $('input[name=A]').val();
			B = $('input[name=B]').val();
			C = $('input[name=C]').val();
			time = ((C - C*3/4) * (99 - A) * B).toFixed(2);
			var _aTimeL = time.toString().split('.')[0];
			var _aTimeR = time.toString().split('.')[1];
			//console.log(_aTimeL, _aTimeR)
			if(_aTimeL.length == 2){
				aTimeL = [0, _aTimeL[0], _aTimeL[1]];
				console.log(aTimeL)
			}
			if(_aTimeL.length == 3){
				aTimeL = _aTimeL;
			}
			aTimeR = _aTimeR;
			console.log(aTimeL, aTimeR)
			swiper.slideNext();
		})
	})

})