const http = require('http')
const fsPromises = require('fs').promises
const path = require('path')

const server = http.createServer(async (req,res)=>{
    console.log("Request Sent from the server");
    const currLog = `${Date.now()}\t: ${req.url} New Request Received\n`
    await fsPromises.appendFile(path.join(__dirname,"logFile.txt"),currLog)
    res.end("Hello Message sent from  the Server ")
})

server.listen(8000,()=> console.log("Server Started"))

