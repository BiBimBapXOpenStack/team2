const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = 80;

app.set("port", port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const jwt = require("jsonwebtoken"); 
const users = require("./routes/user/user.js");
const board = require("./routes/board/board.js");
const images = require("./routes/images/images.js");
const jwtSecret = process.env.JWT_SECRET;  

app.use("/users",users);
app.use("/board",board);
app.use("/images",images);
app.get("/",(req,res,next)=>{
    res.send("hi");
    let newServerToken = jwt.sign({data:"server token"},jwtSecret,{
        expiresIn : '99999d'
    });
}
)

app.all("*", (req, res, next) => {
    res.status(404).send();
});

app.listen(port, () => console.log("Listening on", port));

