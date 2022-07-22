require("dotenv").config();

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbconfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,        
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE
  };
const connection = mysql.createConnection(dbconfig);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const users = {};
const jwtSecret = process.env.JWT_SECRET;  

router.use("*",(req,res,next)=>{
    next();
})

//로그인 ok~
router.post("/login",async(req,res,next)=>{
    console.log("why");
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
            res.status(400).send("login fail");
        } 
        else if(result.length!=0){
            res.cookie("2team-Token",newUserToken);
            res.status(200).send({message:"success"});
        } else {
            res.status(400).send("login fail");
        }

        if (err) console.log(err);
        else console.log("createComment");
    });
});


//로그아웃
router.get("/logout",(req,res,next)=>{
    res.cookie("2team-Token",'login=true; Max-age=0');
    console.log("토큰 삭제");
    res.redirect('/login');
    console.log("로그 아웃"); 
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
        if (err) console.log(err);
        else console.log("createComment");
    });

    res.status(200).send({message:"join success"});
    res.send();

    //todo:: 실패시
});

//중복 체크 > 프론트에서


module.exports = router;