var express=require('express');
var bodyParser=require('body-parser');
var router = express.Router();
const mysql = require("mysql");
const dbconfig = {
    host: "61efabca-bbc3-4c4a-94a3-05414ca1adc6.public.rds.cloud.toast.com",
    port: "11111",         
    user: "team2",
    password: "team2!",
    database: "bibimbapstudy"
};
const connection = mysql.createConnection(dbconfig);

const jwt = require("jsonwebtoken");       
const { post } = require('../user/user');


//토큰 인증
router.use("*",(req,res,next)=>{
    console.log(req.cookies);
    let clientCookie = req.cookies["2team-Token"];
    console.log(clientCookie);
    if(!clientCookie) res.status(401).send("인증되지 않은 사용자입니다.");
    else if(jwt.verify(clientCookie,process.env.JWT_SECRET)){
        console.log("good~~~!!!");
        next();
    }
    else{
        res.status(401).send("인증되지 않은 사용자입니다.");
    }
});



router.get('/list',function(req,res,next){
    res.redirect('/board/list/1');
});


// // 게시글 리스트
// router.get('/list/:page',function(req,res,next){
//     var page=req.params.page; // :page 로 매핑할 req 값 가져오기
//     var sql=`SELECT * from board`
//     connection.query(sql,function(err,rows){
//         if(err) {console.error("err: " +err);
//     }
//     console.log(rows);
//        // res.render('',{boardlist:result}); // '' 에 html ? 앱이면 ?
//     });
//     res.status(200).send(); //성공시 ,다른조건 반환 ?
// });


// 게시글 리스트(페이징 기능 제외하고 일단)
router.get('/list',function(req,res,next){
    var sql=`SELECT * from board`
    connection.query(sql,function(err,rows){
        if(!err) {
            res.send(rows);
        }
        else{
            console.error("err: " +err);
        }
       // res.render('',{boardlist:result}); // '' 에 html ? 앱이면 ?
    });
    
    //성공시 ,다른조건 반환 ?
    res.status(200)
    console.log(res.body)
    
});




// 게시글 조회 ok
router.get('/:board_id',function(req,res,next){
    console.log(req);
    var boardid=req.params.board_id;
    var sql=`SELECT user_id,_id,board_title,board_content,image_Src from board where _id ='${boardid}'`;
    connection.query(sql,function(err,rows){
        if(err) console.error("err :"+err);
        // res.render('',{title : '글 상세보기',rows:rows[0]});
        console.log({title : '글 상세보기',rows:rows[0]});          

    });
    res.status(200).send();
});

// 게시글 작성 ok~
router.post('/',function(req,res,next){
    var userid=req.body.userid;
    var title=req.body.title;
    var content=req.body.content;
    var imageSrc=req.body.imageSrc;
    console.log("나 여기 들어와따~")


    console.log(title, content)
    // var sql=`insert into board(board_title,board_content, image_src, user_id) values('${title}','${content}','ffffff','${userid}')`;

    var sql=`insert into board(title, content, userid) values('${title}','${content}','${userid}')`;


    connection.query(sql,function(err,rows){
        if(err) console.error("err: "+err);
        else console.log("ok~");
    });
    
    console.log("리스트 잘 됨");
    res.status(200).send({message : "Making post success"}); 
    //todo:: 실패시
});

//게시글 수정 ok
router.put('/:board_id',function(req,res,next){
    var userid=req.body.user_id;
    var boardid=req.params.board_id;
    var title=req.body.board_title;
    var content=req.body.board_content;
    var imageSrc=req.body.image_Src;

    console.log("body = {}",req.body);
    var sql=`update board set board_title='${title}', board_content='${content}' , image_Src='${imageSrc}' where user_id='${userid}' and _id='${boardid}'`;
    connection.query(sql,function(err,result){
        if(err) console.error(err);

        if(result.affectedRows==0){ 
            res.status(400).send("invalid boardid"); // boardid 잘못된 경우
        }
    });
    res.status(200).send(); 

});

// 게시글 삭제
router.delete('/:postid',function(req,res,next){
    var postid=req.params.postid;
    var sql=`delete from board where postid='${postid}'`;
    
    connection.query(sql, function(err, rows){
        if(err) console.error("err: "+err);
        if (rows.affectedRows == 0) {
            res.status(400).send({message : "Delete failed"}); // boardid 잘못된 경우
        } 
    }); 
    res.status(200).send({message : "Delete success"}); // 성공시 , 다른조건 반환 ?
});
console.log("temp")
// 페이징 기능
router.get('/page/:page',function(req,res,next)
{
    var page = req.params.page;
    var sql = "SELECT userid,postid,title,content,imageFile from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('~~.ejs', {title: ' 게시판 리스트', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
        console.log(rows.length-1);
    });
});



module.exports=router;