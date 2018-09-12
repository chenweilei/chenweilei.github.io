var express = require('express');
var socket_io = require('socket.io');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();

var socketio = {};
socketio.getSocketio = function(server){

  var io = socket_io.listen(server);
	

  io.sockets.on('connection', function (socket) {
    //console.log('连接成功');
    socketio.socket = socket;
    socket.on('upload', function(msg){
    	console.log(msg)
    })
  })
}

router.post('/uploadfile', function(req, res, next){
	
	var form = new formidable.IncomingForm();
	form.uploadDir = "./public/upload";



	form.parse(req, function(err, fields, files) {

		let name = 'file'//'editormd-image-file';


		//console.log(files)
		let path = files[name].path+'.'+(files[name].name.split('.')[1]);
		fs.renameSync(files[name].path, path)


		res.send({
			success: 0,
			message: '文件上传成功',
			path: path.substring(7)
		})


	});

	form.on('progress', function(bytesReceived, bytesExpected) {
		let rate = (bytesReceived*100/bytesExpected).toFixed(2)+'%';
		//res.end(rate)
		socketio.socket.emit('progress', rate)
		//console.log((bytesReceived*100/bytesExpected).toFixed(2)+'%')
	});

	form.on('end', function() {
		//console.log('文件上传结束')
	});
})

module.exports = [router, socketio];

