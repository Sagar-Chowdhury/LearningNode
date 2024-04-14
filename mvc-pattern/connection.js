const mongoose = require("mongoose");

async function connectToMongoDb(url) {
  await mongoose
    .connect(url)
    .then(() => console.log("Connected To Mongo-Db"))
    .catch((err) => console.error("Error Connecting to Mongo-Db", err));
}

module.exports=connectToMongoDb