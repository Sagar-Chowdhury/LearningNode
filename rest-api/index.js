const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')


const app =express()
const PORT = 8000

app.use(express.urlencoded({ extended: true }))

app.use((req,res,next)=>{
    console.log("Middleware 1");
    next()
})

app.use((req,res,next)=>{
    console.log("Middleware 2");
    next()
})


app.get('/users',(req,res)=>{
    const html = `
    <table>
    <tr>
    <th>User Name</th>
    </tr>
     <tr>
      ${ users.map((user) => `<td>${user.first_name}</td>`) }
     </tr>
    </table>
    `
    res.send(html)
})

app.get('/api/users',(req,res)=>{
     res.json(users)
})

app.route('/api/users/:id')
   .get((req,res)=>{
    const id = req.params.id
    const reqUser = users.map((user)=>{
        if(user.id==id)res.json(user)
    })
    res.status(404).send('No such user found')
})


app.post('/api/users',(req,res)=>{
    const body = req.body
    if(!body || !body.first_name || !body.last_name ||!body.email || !body.gender)
    return res.status(400).json({'response':'invalid request'})
    users.push(body)
    fs.writeFile(`./MOCK_DATA.json`,JSON.stringify(users),(data,err)=>{
        if(err)res.json({response:'Failed to add'})
        else{
        res.json({
            'status':200,
            'response':`New User Added with id ${body.id}`
        })
    }
    })
})   

app.listen(PORT,()=>console.log(`Server Listening on PORT:${PORT}`))
