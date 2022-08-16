require("dotenv").config();

const express = require("express");
const router = express.Router();
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

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
const logger = require("../../module/winston");

const users = {};
const jwtSecret = process.env.JWT_SECRET;  

router.use("*",(req,res,next)=>{
    next();
})

router.get('/getid',function(req,res,next){
    var sql=`SELECT user_id from user;`;
    connection.query(sql,function(err,rows){
        if(!err) {
            res.status(200).send(rows);
        }
        else{
            console.error("err: " +err);
        }
    });
});
//로그인 
router.post("/login",async(req,res,next)=>{
    let id = req.body.userid;
    let pw = req.body.userpw;
    let hashed = await bcrypt.hash(pw,10);
    let newUserToken = jwt.sign({id},jwtSecret,{
        expiresIn : 15*60
    });

    let query = `
    select * from user where user_id='${id}' and user_pw = '${pw}';`;
    connection.query(query, (err, result) => {
        if(!result){
            res.status(400).send({message:"login failed"});
        }
        else if(result.length!=0){
            res.cookie("2team-Token",newUserToken);
            res.status(200).send({message:"success"});
        } else {
            logger.info("login failed ID or PW not correct");
            res.status(400).send({message:"login failed"});
            return ;
        }

        if (err) console.log(err);
        else logger.info("login success [userID : "+ id+"]");
    });
});


//로그아웃
router.get("/logout",(req,res,next)=>{
    res.cookie("2team-Token",'login=true; Max-age=0');
    res.status(200).send({message:"logout"}); 
});



//회원가입
router.post("/",(req,res,next)=>{

    let id = req.body.userid;
    let pw = req.body.userpw;
    let name = req.body.username;


    console.log("body = {}",id,pw,name);
    let insertquery = `
    insert into user(user_id,user_pw,user_name) values ('${id}','${pw}','${name}');`;
    connection.query(insertquery, (err, rows) => {
        if (err) {
            res.status(400).send({message:"join failed"});
            logger.error(err);
            return;
        }
        else{
            logger.info("createComment [userID : "+id+"]");
            res.status(200).send({message:"join success"});
        }
    });
});

//중복 체크 > 프론트에서


module.exports = router;