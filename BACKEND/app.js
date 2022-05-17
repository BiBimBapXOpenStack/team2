const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const template = require("./modules/template.js");

app.set("port", port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = require("./routes/login.js");
const register = require("./routes/register.js");

app.use("/users",users);
app.use("/board",board);
app.use("/images",images);

// app.get("/",(req,res,next) =>{
//     res.status(200).send(template.HTML(data));
// });

app.all("*", (req, res, next) => {
    res.status(404).send(template.HTML("<h1> 404 ERROR </h1>"));
});

app.listen(port, () => console.log("Listening on", port));

