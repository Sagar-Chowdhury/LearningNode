const express = require("express");
const connectToMongoDb = require("./connection");
const router = require("./router/url")
const staticRouter = require("./router/staticRoutes")
const path = require("path")

const app = express();
const PORT = 8080;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

/** Parsing Middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/url",router)
app.use("/",staticRouter)

/**Error catch at processLevel */
process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.listen(PORT,()=>console.log(`Server Listening on PORT:${PORT}`))