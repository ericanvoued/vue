var express = require('express');
var goodsData = require('../data/goods.json')

var server = express()
var router = express.Router()

server.get('/nodeServer/goodlist',(req,res,next)=>{
  res.json(goodsData)
})

// pri-server.use(router)

server.listen(8081)


