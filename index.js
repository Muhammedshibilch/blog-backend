require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routs/router')
require('./config/connection')

const blServer = express()

blServer.use(cors())
blServer.use(express.json())
blServer.use(router)
blServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT
blServer.listen(PORT,()=>{
    console.log(`Blog Server Started At ${PORT} and Aaiting For clint request`);
    
})

blServer.get('/',(req,res)=>{
    res.status(200).send(` <h1 style ="color:red">Blog Server started and waiting for client request </h1>`)
})
