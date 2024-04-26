const express = require("express");
const connectToMongoDb = require("./connection");
const router = require("./router/url")
const path = require("path")

const app = express();
const PORT = 8080;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json())

app.use("/url",router)

app.listen(PORT,()=>console.log(`Server Listening on PORT:${PORT}`))