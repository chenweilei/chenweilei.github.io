function Cannon(obj){
	obj = obj || {};
	this.x = obj.x || 0;
	this.y = obj.y || 0;
	this.w = obj.w || 0;
	this.h = obj.h || 0;
	this.type = 0;
	this.deg = 0;
	this.n = 0;
	this.bReady = true;
}

Cannon.prototype = {
	draw: function(ctx, img){
		ctx.save()
		ctx.translate(this.x, this.y)
		ctx.rotate(degToRad(90 - this.deg))
		//ctx.translate(-this.x, -this.y)
		ctx.drawImage(img, 0, 0+this.h*this.n, this.w, this.h, 0-this.w/2, 0-this.h/2, this.w, this.h)
		ctx.restore()
	},
	animate: function(ctx, img, surface_bg){
		if(!this.bReady) return ;
		this.bReady = false;
		//console.log(1)
		this.n = 0;
		var _this = this;
		for(var i=1; i<5; i++){
			(function(index){

				setTimeout(function(){
					_this.n++;

					if(_this.n == 4){
						_this.bReady = true;
					}
				}, index*80)

			})(i);
		}
	}
};