const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')


const app =express()
const PORT = 8000

app.use(express.urlencoded({ extended: true }))

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
    res.send('Not Found')
})


app.post('/api/users',(req,res)=>{
    const body = req.body
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
