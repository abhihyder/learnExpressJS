const express = require("express");

const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const routes = require("./src/Http/Routes/routes");
const dotenv = require("dotenv");
dotenv.config();
// Database connection with MongoDB by mongoose
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connection with mongoDB successfull!"))
  .catch((err) =>
    console.log("Connection with mongoDB failed. Message:" + err)
  );

app.use(express.json());
app.use(express.static(__dirname + "/public/"));
app.use(router);
app.set("view engine", "ejs");

// Application routes
app.use("/", routes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (res.statusCode == 200) {
    res.status(500).json({ massage: err });
  }
  res.status(res.statusCode).json({ massage: err });
});

app.listen(3000, () => {
  console.log("Application listening on port 3000");
});
