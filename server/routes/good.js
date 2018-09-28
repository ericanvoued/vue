var express = require('express');

var router = express.Router();
var mongoose = require("mongoose");
var goods = require("../model/goods");
var user = require("../model/user");


mongoose.connect("mongodb://127.0.0.1:27017/mall");

mongoose.connection.on("connected", function () {
  console.log("connnected")
})

mongoose.connection.on("error", function () {
  console.log("error")
})

mongoose.connection.on("disconnected", function () {
  console.log("disconnected")
})

router.get("/good", function (req, res, next) {
  var sort = req.param('sort');
  var page = req.param('page');
  var priceLevel = req.param('priceLevel');

  let pageSize = 8;
  let skip = (page - 1) * pageSize;
  let params = {};
  let priceGt = '', priceLte = '';
  if (priceLevel != 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = '0';
        priceLte = '1000';
        break;
      case '1':
        priceGt = '1000';
        priceLte = '2000';
        break;
      case '2':
        priceGt = '2000';
        priceLte = '3000';
        break;
      case '3':
        priceGt = '3000';
        priceLte = '4000';
        break;
      case '4':
        priceGt = '4000';
        priceLte = '5000';
        break;
    }
    params = {
      price: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  let googModel = goods.find(params).skip(skip).limit(pageSize);
  googModel.sort({"price": sort}); //1 means up,-1 means down
  googModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: 0,
        msg: "err.massage"
      })
    } else {
      res.json({
        status: 1,
        msg: "",
        result: {count: doc.length, list: doc}
      })
    }
  })
})


router.post("/addCart", function (req, res, next) {

  var userId = '100077';
  var productId = req.body.productId;


  user.findOne({'userId': userId}, function (err, userDoc) {
    if (err) {
      res.json({
        status: 0,
        msg: err.massage
      })
    } else {
      if (userDoc) {
        let goodsItem = '';
        if (userDoc.carList) {
          userDoc.carList.forEach(function (item) {
            if (item.productId == productId) {
              goodsItem = item;
              item.productNum++
            }
          })
        }
        if (goodsItem) {
          userDoc.save(function (err2, doc2) {
            if (err) {
              res.json({
                status: 0,
                msg: err2.massage
              })
            } else {
              res.json({
                status: 1,
                msg: '',
                result: "添加成功"
              })
            }
          })
        } else {
          goods.find({}, function (err, doc) {
            var currentProduct = {};
            for (let i = 0, len = doc.length; i < len; i++) {
              if (doc[i].productId == productId) {
                currentProduct = doc[i];
                break;
              }
            }

            if (err) {
              res.json({
                status: 0,
                msg: err.massage
              })
            } else {
              userDoc.carList.push({
                "productId": currentProduct.productId,
                "productName": currentProduct.productName,
                "price": currentProduct.price,
                "imgUrl": currentProduct.imgUrl,
                "productNum": 1,
                "checked": 1
              });
              userDoc.save(function (err2, doc2) {
                if (err) {
                  res.json({
                    status: 0,
                    msg: err2.massage
                  })
                } else {
                  res.json({
                    status: 1,
                    msg: '',
                    result: doc2
                  })
                }
              })
            }
          })
        }
      } else {
        res.json({
          user: "没有i用户"
        })
      }
    }
  })
})


module.exports = router


