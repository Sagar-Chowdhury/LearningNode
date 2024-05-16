const express  = require('express')
const logReqRes = require(`./middleware/requestLogger`)
const handleError = require(`./middleware/error-handler`)
const connectToMongoDb = require("./connection")
require('dotenv').config()

const app = express()
const PORT = 8000 || process.env.PORT

connectToMongoDb(process.env.DATABASE_URL)

app.use(logReqRes("logs.txt"))
// app.use(handleError)

app.get("/" , (req,res) =>{
    res.status(200).send("Home Page")
})

app.get("/sample",(req,res)=>{
    res.status(200).send("Sample Page")
})


app.listen(PORT,()=>console.log(`Server Listening on ${PORT}`))