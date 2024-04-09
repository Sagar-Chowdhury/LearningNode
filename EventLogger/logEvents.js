const date = require('date-and-time')
const {v4:uuid} = require('uuid')

const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const now = new Date();

const logEvents = async(message) => {
     
   const dateTime = date.format(new Date(),'YYYY/MM/DD HH:mm:ss')
   const logItem = `${dateTime}\t${uuid()}\t${message}\n`
   console.log(logItem)
   try{
      //validate if the logs directory is present or not
      if (!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdir(path.join(__dirname, 'logs'), (err) => {
          if (err) {
            console.error('Error creating the logs directory:', err);
          }
        });
      }
      const outputPathFile = path.join(__dirname,'logs','eventLogs.txt')
      await  fsPromises.appendFile(outputPathFile,logItem)
   }
   catch(err){
    console.error(err)
   }

}

module.exports = logEvents
