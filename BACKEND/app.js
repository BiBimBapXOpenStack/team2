const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.set("port", port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const users = require("./routes/user/user.js");
const board = require("./routes/board/board.js");
const images = require("./routes/images/images.js");

app.use("/users",users);
app.use("/board",board);
app.use("/images",images);

app.all("*", (req, res, next) => {
    res.status(404).send();
});

app.listen(port, () => console.log("Listening on", port));

