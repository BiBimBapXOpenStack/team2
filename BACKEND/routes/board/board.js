var express=require('express');
var bodyParser=require('body-parser');
var router = express.Router();
const mysql = require("mysql");
const dbconfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,         
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
    multipleStatements: true
  };
const connection = mysql.createConnection(dbconfig);

const jwt = require("jsonwebtoken");       
const { post } = require('../user/user');
const logger = require('../../module/winston');


// //토큰 인증
// router.use("*",(req,res,next)=>{
//     console.log(req.cookies);
//     let clientCookie = req.cookies["2team-Token"];
//     console.log(clientCookie);
//     if(!clientCookie) res.status(401).send("인증되지 않은 사용자입니다.");
//     else if(jwt.verify(clientCookie,process.env.JWT_SECRET)){
//         next();
//     }
//     else{
//         res.status(401).send("인증되지 않은 사용자입니다.");
//     }
// });


// 게시글 리스트
router.get('/list',function(req,res,next){
    var sql=`SELECT * from board`
    connection.query(sql,function(err,rows){
        if(!err) {
            res.status(200).send(rows);
        }
        else{
            console.error("err: " +err);
        }
    });
});


// 게시글 조회 
router.get('/:board_id',function(req,res,next){
    var board_id=req.params.board_id;
    console.log("boardid ====" + board_id)
    var sql=`SELECT user_id,_id,board_title,board_content,image_Src from board where _id ='${board_id}'`;
    connection.query(sql,function(err,rows){
        if(err) {
            console.error("err :"+err);
        }
        // res.render('',{title : '글 상세보기',rows:rows[0]});
        res.status(200).send(rows);         
    });
    
});


// 게시글 작성 
router.post('/',function(req,res,next){
    var userid=req.body.userid;
    var title=req.body.title;
    var content=req.body.content;
    var imageSrc=req.body.imageSrc;

    var sql=`insert into board(board_title, board_content,image_src, user_id) values('${title}','${content}','${imageSrc}','${userid}');`+
     `ALTER TABLE board AUTO_INCREMENT=1;`+
     `SET @COUNT = 0;`+
     `UPDATE board SET _id = @COUNT:=@COUNT+1;`;



    connection.query(sql,function(err,rows){
        if(err) {
            res.status(400).send({message:"fail"})
            console.error("err: "+err);
        }
        else{
            res.status(200).send({message:"success"});
            logger.info("success make board. [userID : "+userid+"]");
        }
    }); 
    //todo:: 실패시
});

//게시글 수정 
router.put('/:board_id',function(req,res,next){
    var userid=req.body.user_id;
    var boardid=req.params.board_id;
    var title=req.body.board_title;
    var content=req.body.content;
    var imageSrc=req.body.image_Src;

    console.log("body = {}",req.body);
    var sql=`update board set board_title='${title}', board_content='${content}' , image_Src='${imageSrc}' where user_id='${userid}' and _id='${boardid}'`;
    connection.query(sql,function(err,result){
        if(err) console.error(err);

        if(result.affectedRows==0){ 
            res.status(400).send("invalid boardid"); // boardid 잘못된 경우
        }
    });
    res.status(200).send({message:"success"}); 

});

// 게시글 삭제
router.delete('/:board_id',function(req,res,next){
    var board_id=req.params.board_id;
    var sql=`delete from board where _id='${board_id}';`+
    `ALTER TABLE board AUTO_INCREMENT=1;`+
    `SET @COUNT = 0;`+
    `UPDATE board SET _id = @COUNT:=@COUNT+1;`;
    
    connection.query(sql, function(err, rows){
        if(err) console.error("err: "+err);

        if (rows.affectedRows == 0) {
            res.status(400).send({message : "Delete failed"}); // boardid 잘못된 경우
        } 
    }); 
    res.status(200).send({message:"success"}); 
});

module.exports=router;