var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')

//connnect db
mongoose.connect('mongodb://127.0.0.1:27017/admin', { useNewUrlParser: true })

mongoose.connection.on('connected',function () {
  console.log('connected db')
})

mongoose.connection.on('error',function () {
  console.log('connected fail')
})

mongoose.connection.on('dis',function () {
  console.log('connected miss')
})


router.post('/',function (req,res,next) {
  let page = parseInt(req.param('page'));
  let pageSize = 8;
  let sort = req.param('sort');
  let skip = (page-1)*pageSize

  let params = {};
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
  goodsModel.sort({'salePrice':sort})

  goodsModel.exec(function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      res.json({
        status:'0',
        msg:'succeed',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})

module.exports = router
