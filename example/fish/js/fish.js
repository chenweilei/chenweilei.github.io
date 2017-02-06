function Fish(obj){
	this.x = obj.x || 0;
	this.y = obj.y || 0;
	this.w = obj.w || 0;
	this.h = obj.h || 0;
	this.type = obj.type || 0;
	this.vec = obj.vec;
	this.deg = obj.deg || 0;
	this.timer1 = null;
	this.length = obj.length || 4;
	this.img = obj.img || null;
	this.bScale = obj.bScale || false;
	this.surface = obj.surface;
	this.ctx = obj.ctx;
	this.n = 0;
	this.status = 'life';
	this.time = 180;

	this.animate(this.ctx, this.surface)
}

Fish.prototype = {
	draw: function(ctx){
		var _this = this;

		ctx.save()

		ctx.translate(this.x+this.w/2, this.y+this.h/2)
		ctx.rotate(degToRad(this.deg))
		if(this.bScale){
			ctx.scale(-1, 1)
		}
		// ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
		// ctx.fillRect(0-this.w/2, 0-this.w/2, this.w, this.h)
		if(this.status == 'life'){
			ctx.drawImage(this.img, 0, 0+this.h*(this.n%this.length),  this.w, this.h, 0-this.w/2, 0-this.w/2, this.w, this.h)
		}else{
			ctx.drawImage(this.img, 0, 0+this.h*(this.length + this.n%4),  this.w, this.h, 0-this.w/2, 0-this.w/2, this.w, this.h)
		}

		ctx.restore()
	},
	animate: function(ctx, surface){
		clearInterval(this.timer1)
		var _this = this;
		if(this.deg <0){
			var deg = Math.abs(this.deg)
			var w = this.w*Math.cos(degToRad(deg)) + this.h*Math.cos(degToRad(90 - deg));
			var h = this.w*Math.sin(degToRad(deg)) + this.h*Math.sin(degToRad(90 - deg));
		}else{
			var w = this.w*Math.cos(degToRad(this.deg)) + this.h*Math.cos(degToRad(90 - this.deg));
			var h = this.w*Math.sin(degToRad(this.deg)) + this.h*Math.sin(degToRad(90 - this.deg));
		}

		this.timer1 = setInterval(function(){
			_this.n++;

		}, this.time);

	}
};