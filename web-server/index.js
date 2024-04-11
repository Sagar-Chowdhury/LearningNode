const http = require('http')
const fsPromises = require('fs').promises
const path = require('path')
const url =  require('url')
const express = require("express")

const app = express()

async function myHandler(req,res) {
    console.log("Request Sent from the server");
    const reqURL = url.parse(req.url,true)
    const currLog = `${Date.now()}\t: ${reqURL.path} ${req.method} New Request Received\n`
    await fsPromises.appendFile(path.join(__dirname,"logFile.txt"),currLog)
    res.end("Hello Message sent from  the Server ")
}

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.get("/about",(req,res)=>{
    res.send("About page")
})


const server = http.createServer(app)

server.listen(8000,()=> console.log("Server Started"))

