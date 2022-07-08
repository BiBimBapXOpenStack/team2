var express=require('express');
var router = express.Router();
var mime =require('mime');

const mysql = require("mysql");
var fs=require('fs');
const path=require("path");
const multer = require('multer');

const dbconfig = {
  host: "28f12961-41cb-4559-bff9-eafede92aea7.external.kr1.mysql.rds.nhncloudservice.com",
  port: "10000",         //db 전용 포트
  user: "team2",
  password: "gkkoxojy$$",
  database: "team2db"
  
};

const connection = mysql.createConnection(dbconfig);

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+'/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});

router.post('/', upload.single('file'),(req,res,next) => {
  const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file
  const { name } = req.body;

  console.log("body 데이터 : ", name);
  console.log("폼에 정의된 필드명 : ", fieldname);
  console.log("사용자가 업로드한 파일 명 : ", originalname);
  console.log("파일의 엔코딩 타입 : ", encoding);
  console.log("파일의 Mime 타입 : ", mimetype);
  console.log("파일이 저장된 폴더 : ", destination);
  console.log("destinatin에 저장된 파일 명 : ", filename);
  console.log("업로드된 파일의 전체 경로 ", path);
  console.log("파일의 바이트(byte 사이즈)", size);

  let insertquery = `
  insert into image(image_src) values ('${originalname}');`;
  connection.query(insertquery, (err, rows) => {
      if (err) console.log(err);
      else console.log("good");
  });

  res.status(200).json({message:"success"});
  
})


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