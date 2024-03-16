const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(express.static(__dirname + "/uploads/"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,AuthToken",
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

routes.forEach((route) => app[route.method](route.path, route.handler));

app.listen(8080);
console.log("Connected to 8080!");
