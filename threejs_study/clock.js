/**
 * Created by Administrator on 2017/2/14.
 */
var canvas;

(function(){
    canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    var ctx = canvas.getContext('2d');

    function drawCir(){
        ctx.save()
        ctx.translate(100, 100)
        ctx.lineWidth = 10;
        ctx.arc(0,0, 100, 0, 360*Math.PI/180,false);
        ctx.stroke();
        ctx.restore()
    }
    drawCir()
})()