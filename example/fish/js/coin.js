function Coin(obj){
	this.coinImg = obj.coinImg || null;
	this.coinCountImg = obj.coinCountImg || null;
	this.x = obj.x || 0;
	this.y = obj.y || 0;
	this.n = 0;
	this.timer = null;
	this.coinCount = obj.count || 10;
	this.sCount = this.coinCount.toString();
	this.ctx = obj.ctx;
	this.status = 'show';
	this.animate(this.ctx)
	var _this = this;
	setTimeout(function(){
		_this.status = 'hide';
	}, 500)
}

Coin.prototype = {
	draw: function(ctx){
		ctx.save();
		ctx.drawImage(this.coinImg, 0, (this.n%10)*60, 60, 60, this.x, this.y, 60, 60)
		ctx.drawImage(this.coinCountImg, 36*10, 0, 36, 49, this.x+60, this.y+6, 36, 49)
		for(var i=0; i<this.sCount.length; i++){
			ctx.drawImage(this.coinCountImg, 36*this.sCount.charAt(i), 0, 36, 49, this.x+60+36+4+i*(36+4), this.y+6, 36, 49)
		}
		ctx.restore();
	},
	animate: function(ctx){
		var _this = this;
		clearInterval(this.timer)
		this.timer = setInterval(function(){
			_this.n++
		}, 30);
	}
};

