function Yx(json){
	if(!json) return

	this.x = json.x;
	this.y = json.y;
	this.vec = json.vec;
	this.w = 115;
	this.h = 120;
	//元宵的状态
	/*
		初始奔跑的状态： life
		被抓住的状态： down
		被放下的状态： up
	*/
	this.status = 'life';
	this.img = json.img;
	this.n = 0;
	this.timer = null;
	this.animate();
}

Yx.prototype = {
	draw: function(ctx){
		switch(this.status){
			case 'life':
				ctx.drawImage(this.img, 115*(this.n%2), 0, 115, 120, this.x, this.y, 115, 120);
				break;

			case 'down':
				clearInterval(this.timer)
				this.vec.scale(0)
				ctx.save()
				ctx.globalCompositeOperation="destination-over";
				ctx.drawImage(this.img, 115*2, 0, 115, 120, this.x, this.y, 115, 120);
				ctx.restore()
				break;

			case 'up':
				clearInterval(this.timer)
				this.vec.scale(0)
				ctx.save()
				ctx.globalCompositeOperation="destination-over";
				ctx.fillStyle = '#fff';
				ctx.font = 18*ctx.canvas.width/window.innerWidth+'px aaa';
				ctx.textAlign = 'left';
				ctx.textBaseLine = 'middle';
				ctx.drawImage(this.img, 115*3, 0, 115, 120, this.x, this.y, 115, 120);
				if(!!this.text){
					ctx.fillText(this.text, this.textX, this.textY)
				}
				ctx.restore()
				break;

			case 'die':
				clearInterval(this.timer)
				ctx.drawImage(this.img, 0, 0, 160, 250, this.x-60, this.y-106, 160, 250);
				break;
		}
	},
	animate: function(){
		var _this = this;
		this.timer = setInterval(function(){
			_this.n++;
		}, 100);
	},
	clearText: function(){
		var _this = this;
		setTimeout(function(){
			_this.text = null;
		}, 300)
	}
};

