var express=require('express');
var router = express.Router();
var mime =require('mime');

const mysql = require("mysql");
var fs=require('fs');
const path=require("path");
const multer = require('multer');
const ObjectStorage = require('../../module/ObjectStorage');

const OS_ENDPOINT = process.env.OS_ENDPOINT;


const dbconfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,         
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_DATABASE
};

const connection = mysql.createConnection(dbconfig);

const upload = multer({
  storage: ObjectStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});

router.post('/', upload.single('file'),(req,res,next) => {
  const {filename} = req.file;
  const imagesrc = OS_ENDPOINT + "/team2/uploads/"+filename

  let insertquery = `
  insert into image(image_src) values ('${imagesrc}');`;
  connection.query(insertquery, (err, rows) => {
      if (err) {
        res.status(400).send({message:"fail"});
        console.log("err: " +err);
      }
      else {
        res.status(200).send({message:"success", 
                              image_src: OS_ENDPOINT + "/team2/uploads/"+ filename});
      }
  });
  
});


//이미지 다운로드
router.get('/download/:file_name', function(req, res, next) {
    var upload_folder =  __dirname+'/uploads/';
    var file = upload_folder + req.params.file_name; // ex) /upload/files/sample.txt
    console.log(req.params.file_name);
    
    try {
      if (fs.existsSync(file)) { // 파일이 존재하는지 체크
        var filename = path.basename(file); // 파일 경로에서 파일명(확장자포함)만 추출
        var mimetype = mime.getType(file); // 파일의 타입(형식)을 가져옴
      
        res.setHeader('Content-disposition', 'attachment; filename=' + filename); // 다운받아질 파일명 설정
        res.setHeader('Content-type', mimetype); // 파일 형식 지정
      
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
      } else {
        res.status(400).send('해당 파일이 없습니다.');  
        return;
      }
    } catch (e) { // 에러 발생시
      console.log(e);
      res.status(401).send('파일을 다운로드하는 중에 에러가 발생하였습니다.');
      return;
    }
  });
  
  module.exports = router;