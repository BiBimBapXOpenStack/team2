require("dotenv").config();

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbconfig = {
    host: "localhost",
    port: "3306",         //db 전용 포트
    user: "root",
    password: "dbswnsvoa353",
    database: "bibimbapstudy"

};
const connection = mysql.createConnection(dbconfig);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const users = {};
const jwtSecret = process.env.JWT_SECRET;  //ignore

router.use("*",(req,res,next)=>{
    next();
})

//로그인 ok~
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
            res.status(400).send("login fail");
        } 
        else if(result.length!=0){
            res.cookie("2team-Token",newUserToken);
            res.status(200).send("login success");
        } else {
            res.status(400).send("login fail");
        }

        if (err) console.log(err);
        else console.log("createComment");
    });
});


//로그아웃
router.get("/logout"(req,res,next){

});


router.post("/",(req,res,next)=>{

    let id = req.body.id;
    let pw = req.body.pw;
    let name = req.body.name;


    console.log("body = {}",req.body);
    let insertquery = `
    insert into user(user_id,user_pw,user_name) values ('${id}','${pw}','${name}');`;
    connection.query(insertquery, (err, rows) => {
        if (err) console.log(err);
        else console.log("createComment");
    });

    res.status(200);
    res.send();

    //todo:: 실패시
});




//todo :: 중복 체크

// router.all("/validate/:id", (req, res, next) => {
//     let id = req.params.userid;

//     let query = `
//     select id from user where id=${id}
//     ;`;
//     connection.query(query, (err, rows) => {
//         if(rows==null)res.status(200).send("1");
//         else res.status(200).send("0");

//         if (err) console.log(err);
//         else console.log("createComment");
//     });
//     res.redirect("/");
// });

module.exports = router;