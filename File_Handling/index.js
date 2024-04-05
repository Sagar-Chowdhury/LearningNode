
const fsPromises = require('fs').promises
const path = require('path');

const fileOps = async() =>{
    try{
        const readFileName = path.join(__dirname,'files','starter.txt')
        const writeFileName = path.join(__dirname,'files','NewTextFile.txt')
        const data = await fsPromises.readFile(readFileName, 'utf8')
        console.log(data);
        console.log("--- Read Complete ---");
        await fsPromises.unlink(readFileName) //deletion.
        await fsPromises.writeFile(writeFileName,"First Line Added")
        console.log("--- Write Complete ---");
        await fsPromises.appendFile(writeFileName,"\n\nSecond Line Added")
        console.log("--- Append Complete ---");
         
    }
    catch(err){
        console.error(err);
    }
}

fileOps()



/** Asynchronously working with files ; cant predict order of operations **/

// const fs = require('fs');


// fs.readFile(path.join(__dirname,"files","starter.txt"),{encoding :'utf8'},(error, data) => {
//     if (error) throw error;
//     console.log(data);
//     console.log("Read Complete");
// })

// console.log("---Hello---");

// fs.writeFile(path.join(__dirname,"files","newFile.txt"),"Messi is the Goat",(error)=>{
//     console.log(error);
//     console.log("Write Complete");
// })

// fs.appendFile(path.join(__dirname,"files","newFile.txt")," WC Winner",(error)=>{
//     console.log(error);
//     console.log("Append Complete");
// })

// process.on('uncaughtException',err =>{
//     console.error(err);
//     process.exit(1);
// })