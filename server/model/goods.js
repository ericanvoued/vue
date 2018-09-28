var mongoose = require('mongoose');

var schema = mongoose.Schema;

var goodsShema = new schema({
  "productId":{type:String},
  "productName":String,
  "price":Number,
  "imgUrl":String,
  "productNum":Number,
  "checked":String,
})

module.exports = mongoose.model('goods',goodsShema,'goods');




