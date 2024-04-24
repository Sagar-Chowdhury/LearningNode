const express = require("express");
const connectToMongoDb = require("./connection");

const app = express();
const PORT = 8080;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url");


app.listen(PORT,()=>console.log(`Server Listening on PORT:${PORT}`))