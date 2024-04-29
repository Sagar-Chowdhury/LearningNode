const express = require("express");
const connectToMongoDb = require("./connection");
const router = require("./router/url")
const staticRouter = require("./router/staticRoutes")
const path = require("path")
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8080;

connectToMongoDb(process.env.DATABASE_URL);

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