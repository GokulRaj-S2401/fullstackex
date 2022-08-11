const express =  require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))

app.use(cors())

app.get('/data',(req,res)=>{
    const data = fs.readFileSync('./data.json','utf-8')
    res.json(JSON.parse(data))
})

app.post('/add',(req,res)=>{
    let data = fs.readFileSync('./data.json','utf-8')
    let values = JSON.parse(data)
    console.log(req.body)
    values.items.push(req.body)
    fs.writeFileSync('./data.json',JSON.stringify(values))
    res.json({status:200})
})



app.listen(9000,console.log('server start'))