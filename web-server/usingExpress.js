const express = require('express')

const app = express()

app.get("/",(req,res)=>{
    res.send("Home Page Reached")
})

app.listen(8001,()=>{
    console.log("Server Started on Port 8001");
})