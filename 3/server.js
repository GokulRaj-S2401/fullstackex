const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        const data = fs.readFileSync('home.html','utf-8')
        res.writeHead(200,{'content-type':'text/html'})
        res.write(data)
        res.end()
    }
    else if(req.url == '/css'){
        const data = fs.readFileSync('style.css','utf-8')
        res.writeHead(200,{'content-type':'text/css'})
        res.write(data)
        res.end()
    }
    else{
        res.writeHead(200,{'content-type':'text/html'})
        res.write('<h1>page not found</h1>')
        res.end()
    }
})

server.listen(3000,console.log('server start'))