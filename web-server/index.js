const http = require('http')
const fsPromises = require('fs').promises
const path = require('path')
const url =  require('url')

async function myHandler(req,res) {
    console.log("Request Sent from the server");
    const reqURL = url.parse(req.url,true)
    const currLog = `${Date.now()}\t: ${reqURL.path} ${req.method} New Request Received\n`
    await fsPromises.appendFile(path.join(__dirname,"logFile.txt"),currLog)
    

    res.end("Hello Message sent from  the Server ")
}

const server = http.createServer(myHandler)

server.listen(8000,()=> console.log("Server Started"))

