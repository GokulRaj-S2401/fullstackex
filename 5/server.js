const { response } = require('express')
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')

const mongo = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/"

app.use(express.urlencoded({extended:true}))
app.use(express.json({extended:true}))

app.set('views','./views')
app.set('view engine','hbs')
app.use('handlebars',engine({express:'hbs'}))

app.get('/add',(req,res)=>{
    res.render('add')
})

app.get('/edit/:rollno',(req,res)=>{
    console.log(req.params.rollno);
    mongo.connect(url,(err,db)=>{
        let dbo = db.db('mydb')
        dbo.collection('student').findOne({"rollno":req.params.rollno},(err,result)=>{
            console.log(result);
            db.close()
            res.render('edit',{data:[result]})
        })
    })
})

app.post('/update/:rollno',(req,res)=>{
    mongo.connect(url,(err,db)=>{
        let dbo = db.db('mydb')
        dbo.collection('student').updateOne({"rollno":req.params.rollno},{
            $set:{'rollno':req.params.rollno,
                'name':req.body.name,
                'dob':req.body.dob,
                'email':req.body.email
        }
        },(err,result)=>{
            db.close()
            res.redirect('/')
        })
    })
})

app.post('/create',(req,res)=>{
    mongo.connect(url,(err,db)=>{
        let dbo = db.db('mydb')
        dbo.collection('student').insertOne(req.body,(err,result)=>{
            db.close()
            res.redirect('/')
        })
    })
})

app.get('/',(req,res)=>{
    mongo.connect(url,(err,db)=>{
        let dbo = db.db('mydb')
        dbo.collection('student').find({}).toArray((err,result)=>{
            db.close()
            res.render('index',{data:result})

        })
    })
})

app.get('/delete/:rollno',(req,res)=>{
    mongo.connect(url,(err,db)=>{
        let dbo = db.db('mydb')
        dbo.collection('student').remove({"rollno":req.params.rollno},(req,result)=>{
            db.close()
            res.redirect('/')
            
        })
    })
})

app.listen(3000,console.log('server start'))