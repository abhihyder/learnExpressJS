const express = require("express");

const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const routes = require("./src/Http/Routes/routes");

// Database connection with MongoDB by mongoose
mongoose
  .connect("mongodb://localhost/express", {
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

app.use((err, req, res, next) =>{
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send({ error: err });
});

app.listen(3000, () => {
  console.log("Application listening on port 3000");
});
