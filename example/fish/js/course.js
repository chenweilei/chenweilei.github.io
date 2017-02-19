	var aCourse = [
		{
			name: 'bg',
			src: "./images/game_bg_2_hd.jpg",
		},
		{
			name: 'bottom',
			src: "./images/bottom.png",
		},
		{
			name: 'bullet',
			src: "./images/bullet.png",
		},
		{
			name: 'cannon',
			src: [
				"./images/cannon1.png",
				"./images/cannon2.png",
				"./images/cannon3.png",
				"./images/cannon4.png",
				"./images/cannon5.png",
				"./images/cannon6.png",
				"./images/cannon7.png",
			]
		},
		{
			name: 'coin',
			src: [
				"./images/coinAni1.png",
				"./images/coinAni2.png",
			]
		},
		{
			name: 'coinText',
			src: "./images/coinText.png"
		},
		{
			name: 'fish',
			src: [
				"./images/fish1.png",
				"./images/fish2.png",
				"./images/fish3.png",
				"./images/fish4.png",
				"./images/fish5.png",
				"./images/fish6.png",
				"./images/fish7.png",
				"./images/fish8.png",
				"./images/fish9.png",
				"./images/fish10.png",
				"./images/fish11.png",
				"./images/fish12.png",
			]
		},
		{
			name: 'number_black',
			src: "./images/number_black.png",

		},
		// {
		// 	name: 'shark',
		// 	src: [
		// 		"./images/shark1.png",
		// 		"./images/shark2.png",
		// 	]
		// },
		{
			name: 'web',
			src: "./images/web.png"
		}
	];


	var CourseSize = {
		//+
		bottom_plus1: {x1: 47, y1: 75, w: 36, h: 29, x2: 612, y2: 738},
		bottom_plus2: {x1: 3, y1: 75, w: 36, h: 29, x2: 612, y2: 738},
		//-
		bottom_reduce1: {x1: 135, y1: 75, w: 36, h: 29, x2: 472, y2: 738},
		bottom_reduce2: {x1: 91, y1: 75, w: 36, h: 29, x2: 472, y2: 738},

		//大炮1
		cannon1: {w: 74, h: 74, x2: 554, y2: 751},
		//大炮2
		cannon2: {w: 74, h: 76, x2: 554, y2: 751},
		//大炮3
		cannon3: {w: 74, h: 76, x2: 554, y2: 751},
		//大炮4
		cannon4: {w: 74, h: 83, x2: 554, y2: 751},
		//大炮5
		cannon5: {w: 74, h: 85, x2: 554, y2: 751},
		//大炮6
		cannon6: {w: 74, h: 90, x2: 554, y2: 751},
		//大炮7
		cannon7: {w: 74, h: 94, x2: 554, y2: 751},

		//子弹1
		bullet1: {x1: 87, y1: 0, w: 22, h: 26, x2: 554, y2: 751},
		//子弹2
		bullet2: {x1: 61, y1: 0, w: 25, h: 29, x2: 554, y2: 751},
		//子弹3
		bullet3: {x1: 32, y1: 35, w: 26, h: 31, x2: 554, y2: 751},
		//子弹4
		bullet4: {x1: 30, y1: 82, w: 29, h: 33, x2: 554, y2: 751},
		//子弹5
		bullet5: {x1: 0, y1: 82, w: 30, h: 34, x2: 554, y2: 751},
		//子弹6
		bullet6: {x1: 30, y1: 0, w: 31, h: 35, x2: 554, y2: 751},
		//子弹7
		bullet7: {x1: 0, y1: 0, w: 30, h: 44, x2: 554, y2: 751},

		//渔网1
		web1: {x:332 , y: 372, w: 89, h: 89},
		//渔网2
		web2: {x:13 , y: 412, w: 110, h: 110},
		//渔网3
		web3: {x:177 , y: 370, w: 128, h: 128},
		//渔网4
		web4: {x:254 , y: 196, w: 150, h: 150},
		//渔网5
		web5: {x:0 , y: 244, w: 165, h: 165},
		//渔网6
		web6: {x:242 , y: 0, w: 182, h: 182},
		//渔网7
		web7: {x:20 , y: 20, w: 202, h: 202},

		//鱼1
		fish1: {w: 55, h: 37, len: 8},
		//鱼2
		fish2: {w: 78, h: 64, len: 8},
		//鱼3
		fish3: {w: 72, h: 56, len: 8},
		//鱼4
		fish4: {w: 77, h: 59, len: 8},
		//鱼5
		fish5: {w: 107, h: 122, len: 8},
		//鱼6
		fish6: {w: 105, h: 79, len: 12},
		//鱼7
		fish7: {w: 92, h: 151, len: 10},
		//鱼8
		fish8: {w: 174, h: 126, len: 12},
		//鱼9
		fish9: {w: 166, h: 183, len: 12},
		//鱼10
		fish10: {w: 178, h: 187, len: 10},
		//鱼11  鲨鱼1
		fish11: {w: 509, h: 270, len: 12},
		//鱼12	鲨鱼2
		fish12: {w: 516, h: 273, len: 12},

	};