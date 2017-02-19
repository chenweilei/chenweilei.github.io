function Bullet(obj){
	this.x = obj.x || 554;
	this.y = obj.y || 751;
	this.w = obj.w || 0;
	this.h = obj.h || 0;
	this.type = obj.type || 0;
	this.vec = obj.vec || null;
	this.img = obj.img || null;
	this.deg = obj.deg || 0;
	this.posX = obj.posX || 0;
	this.posY = obj.posY || 0;
}

Bullet.prototype = {
	draw: function(ctx){
		ctx.save();
		ctx.translate(this.x, this.y)
		ctx.rotate(degToRad(90 - this.deg))

		ctx.drawImage(this.img, this.posX, this.posY,  this.w, this.h, 0-this.w/2, 0-this.h/2, this.w, this.h)

		// ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
		// ctx.fillRect(0-this.w/2, 0-this.w/2, this.w, this.h)

		ctx.restore()
	}
}