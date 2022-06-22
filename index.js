const express = require("express");
const multer = require("multer");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");

// Database connection with MongoDB by mongoose
mongoose
  .connect("mongodb://localhost/express")
  .then(() => console.log("Connection with mongoDB successfull!"))
  .catch((err) => console.log("Connection with mongoDB failed. Message:"+err));

var formData = multer();

app.use(express.json());
app.use(express.static(__dirname + "/public/"));
app.use(router);
app.set("view engine", "ejs");

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", formData.none(), (req, res) => {
  console.log(req.body);
  res.render("index");
});

router.get("/about", (req, res) => {
  res.send("This is about page");
});
app.listen(3000, () => {
  console.log("ExpressJS listening on port 3000");
});
