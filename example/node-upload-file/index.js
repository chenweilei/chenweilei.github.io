var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadfile', function(req, res, next){
	
	var form = new formidable.IncomingForm();
	form.uploadDir = "./upload";

	form.parse(req, function(err, fields, files) {

		//console.log(files.file.path)
		fs.renameSync(files.file.path, './upload/'+files.file.name)

		res.send({
			code: 0,
			msg: '文件上传成功',
			path: './upload/'+files.file.name
		})
	});
})

module.exports = router;
