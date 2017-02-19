/**
 * Created by Administrator on 2017/2/14.
 */
var canvas;

(function(){
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    var initDeg = 0;
    // canvas.style.position = 'fixed';
    // canvas.style.top = '0px';
    // canvas.style.left = '0px';
    // document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    //画圆盘
    function drawCir(){
        ctx.save()
        ctx.beginPath()
        ctx.translate(100, 100)
        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 10;
        ctx.arc(0,0, 95, 0, 360*Math.PI/180,false);
        ctx.stroke();
        ctx.restore()
    }
    function drawPointer(){
        ctx.save();
        ctx.beginPath();
        ctx.translate(100, 100);
        ctx.strokeStyle = '#00f';
        ctx.lineWidth = 3;
        ctx.moveTo(0,0);
        ctx.lineTo(Math.sin(degToRad(initDeg-180))*100,Math.cos(degToRad(initDeg-180))*100)
        ctx.stroke()
        ctx.restore();
    }

    setInterval(function(){
        ctx.clearRect(0,0, 200, 200)
        initDeg++;
        initDeg%=360;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,200, 200);
        drawCir()
        drawPointer()
    }, 1000/60)
})()