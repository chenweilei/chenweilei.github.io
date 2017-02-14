/**
 * Created by Administrator on 2017/2/14.
 */
var canvas;

(function(){
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    // canvas.style.position = 'fixed';
    // canvas.style.top = '0px';
    // canvas.style.left = '0px';
    // document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,200, 200);

    function drawCir(){
        ctx.save()
        ctx.translate(100, 100)
        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 10;
        ctx.arc(0,0, 95, 0, 360*Math.PI/180,false);
        ctx.stroke();
        ctx.restore()
    }
    drawCir()
})()