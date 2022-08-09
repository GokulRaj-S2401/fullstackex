const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const fs = require('fs')

app.set('views','./views')
app.set('view engine','hbs')
app.use('handlebars',engine({extname:'hbs'}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('',(req,res)=>{
    res.render('index')
})

app.get('/emailList',(req,res)=>{
    let fdata = fs.readFileSync('data.json','utf-8')
    res.render('emailList',{data:JSON.parse(fdata).items})
})

app.post('/create',(req,res)=>{
    let data =fs.readFileSync('data.json','utf-8')
    let value = JSON.parse(data)
    value.items.push(req.body)
    fs.writeFileSync('data.json',JSON.stringify(value))
    res.redirect('/emailList')
})

app.listen(3000,console.log('server start'))