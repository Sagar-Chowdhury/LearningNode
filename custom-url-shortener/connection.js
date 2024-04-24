const mongoose = require("mongoose")

async function connectToMongoDb(url){
    await mongoose
          .connect(url)
          .then(()=>console.log("Connected to Mongo-Db"))
          .catch((err)=>console.error("Failed to connect to Mongo" + err))
}

module.exports=connectToMongoDb