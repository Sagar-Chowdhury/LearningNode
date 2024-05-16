function handleError(){
    return function(err,req,res,next) {
       console.log(" -Failed Err Msg- " + err);
       res.status(500).send('Something broke!') 
    }
}

module.exports = handleError