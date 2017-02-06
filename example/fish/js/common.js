
//在图片资源数组里面查找某一项，找到就返回图片对象，找不到返回null;
function findCourse(aCourse, str){
	for(var i=0; i<aCourse.length; i++){
		if(aCourse[i].name == str){
			//console.log(aCourse[i]["img"])
			return aCourse[i]["img"]
		}
	}
	return null
}



//将鼠标左边转换成canvas坐标
function windowToCanvas(canvas, x, y){
	var bbox = canvas.getBoundingClientRect();
	return {
		x: x-bbox.left*bbox.width/canvas.width,
		y: y-bbox.top*bbox.height/canvas.height,
	}
}


//弧度(radian) ->　角度(degree)
function radToDeg(radian){
	return radian*180/Math.PI;
}

//角度(degree) ->  弧度(radian)
function degToRad(degree){
	return degree*Math.PI/180;
}

//平面向量计算
var vector2d = function(x ,y){
    var vec = {
        //把x、y保存在对象的vx、vy中
        vx: x,
        vy: y,
        //scale方法可以让我们来放大或缩小向量
        scale: function(scale){
            vec.vx *= scale;
            vec.vy *= scale;
        },
        //向量的加法运算
        add: function(vec2){
            vec.vx += vec2.vx;
            vec.vy += vec2.vy;
        },
        //向量的减法运算
        sub: function(vec2){
            vec.vx -= vec2.vx;
            vec.vy -= vec2.vy;
        },
        //方向取反
        negate: function(){
            vec.vx = -vec.vx;
            vec.vy = -vec.vy;
        },
        //获取向量长度
        length: function(){
            return Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
        },
        //获取向量长度的平方
        lengthSquared: function(){
            return vec.vx * vec.vx + vec.vy * vec.vy;
        },
        //将向量转化为一个单位向量
        normalize: function(){
            var len = Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
            if(len){
                vec.vx /=len;
                vec.vy /=len;
            }
            //把向量的长度返回
            return len;
        },
        //向量的旋转
        rotate: function(angle){
            var vx = vec.vx,
                vy = vec.vy,
                cosVal = Math.cos(angle),
                sinVal = Math.sin(angle);
            vec.vx = vx * cosVal - vy * sinVal;
            vec.vy = vx * sinVal + vy * cosVal;
        },
        //toString方法可以把向量以文本形式输出，方便程序调试
        toString: function(){
            return '(' + vec.vx.toFixed(3) + ',' + vec.vy.toFixed(3) + ')';
        }
    };
    return vec;
};



/*
    name: 碰撞检测
    参数：
        obj1/obj2 = {
            img: imgEelment,
            x: x,
            y: y,
            w: width,
            h: height
        }
        boolean: true/false;
            true: 矩形碰撞检测之后进一步做像素级碰撞检测；
            false: 只做最基本的矩形碰撞检测
            不传时默认 false
    返回值：true/false
        true: 已经碰撞
        false: 没有碰撞
*/
function canvasCollision(obj1, obj2, boolean){
    boolean = boolean || false;
    //矩形碰撞检测
    if(obj1.x>obj2.x+obj2.w || obj1.y>obj2.y+obj2.h || obj2.x>obj1.x+obj1.w || obj2.y>obj1.y+obj1.h){
        //没有碰撞
        return false;
    }else{
        //如果碰撞了，继续做像素级的碰撞检测
        if(!!boolean){
            //创建离屏canvas
            var _canvas = document.createElement('canvas');
            _canvas.width = obj1.w+obj2.w;
            _canvas.height = obj1.h+obj2.h;
            var _ctx = _canvas.getContext('2d');

            _ctx.drawImage(obj1.img, 0, 0, obj1.w, obj1.h);
            _ctx.globalCompositeOperation = "source-in";
            _ctx.drawImage(obj2.img, obj2.x-obj1.x, obj2.y-obj1.y, obj1.w, obj1.h);

            var imgData = _ctx.getImageData(0,0, _canvas.width, _canvas.height);
            for(var i=3; i<imgData.data.length; i+=4){
                if(imgData.data[i]>0){
                    return true
                    break;
                }
            }
            _canvas = null;
            return false
        }else{
            return true
        }
    }
}

//随机数
function rnd(m, n){
    return Math.floor(Math.random()*(n-m)+m);
}

//检测鼠标是否在某个区域
//在指定的区域则返回true
//否则返回false
function mouseInRect(obj){
    var mX = obj.mx;
    var mY = obj.my;
    var tarX = obj.tarX;
    var tarY = obj.tarY;
    var tarW = obj.tarW;
    var tarH = obj.tarH;

    if(mX<tarX || mY<tarY || mX>tarX+tarW || mY>tarY+tarH){
        return false;
    }else{
        return true;
    }
}


//动画循环
window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame 
|| window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
function(callback) { 
	return window.setTimeout(function() { 
		return callback(Date.now()); 
	}, 1000 / 60);
});

window.cancelAnimationFrame || (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || 
function(timeid) {
	return clearTimeout(timeid); 
});