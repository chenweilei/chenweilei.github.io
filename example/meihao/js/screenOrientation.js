function ScreenOrientation(json){
	//默认垂直方向
	this.orientation = "vertical";
	//检测是否支持window.orientation
	this.isOrientation = (typeof window.orientation == "number" && typeof window.onorientationchange == "object");
	//手机切换到竖屏要做的事
	this.fnVertical = json.fnVertical || null;
	//手机切换到横屏要做的事
	this.fnHorizontal = json.fnHorizontal || null;

	//初始化
	this.init();
}

ScreenOrientation.prototype = {
	init: function(){
		this.bindEvent();
	},
	//获取设备的方向
	getOrientation: function(){
		//如果支持 window.orientation
		if(this.isOrientation){
			//0表示竖屏，正负90表示横屏（向左与向右）模式
			this.orientation = window.orientation == 0 ? "vertical" : "Horizontal";  
		}
		else{
			//根据高度与宽度判断是：横屏或竖屏
			this.orientation = window.innerWidth > window.innerHeight ? "Horizontal" : "vertical";  
		}
		//为body添加判断方向属性
		document.body.setAttribute("mob-orientation", this.orientation);
	},
	//更新屏幕的方向值
	updateorientation: function(){
		this.getOrientation();
		if(this.orientation == "vertical"){
			this.fnVertical && this.fnVertical();
		}else{
			this.fnHorizontal && this.fnHorizontal();
		}
	},
	//绑定手机旋转事件
	bindEvent: function(){
		window.addEventListener("orientationchange", this.updateorientation.bind(this), false);
	}
}