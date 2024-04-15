const connectToMongoDb = require("./connection");
const express = require("express");
const logReqRes = require("./middleware/index");
const router = require("./router/user");

const app = express();
const PORT = 8000;

/** Connecting to Mongo  */

connectToMongoDb("mongodb://127.0.0.1:27017/mvc-db");

/** Middle ware plugin */
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"));

/** Routing Part */
app.use("/api/users", router);

/**Error catch at processLevel */
process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.listen(PORT, () => console.log(`Server Listening on PORT:${PORT}`));
