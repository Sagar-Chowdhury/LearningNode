const fs = require('fs')
const path = require('path')
const readFilePath= path.join(__dirname,"files","largeTextFile.txt")
const writeFilePath=path.join(__dirname,"files","copy_largeText.txt")

const readStream = fs.createReadStream(readFilePath,'utf8')
const writeStream = fs.createWriteStream(writeFilePath)

// readStream.on('data',(dataChunk)=>{
//     writeStream.write(dataChunk)
// })

readStream.pipe(writeStream)