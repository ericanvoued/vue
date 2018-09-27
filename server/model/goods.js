var mongoose = require('mongoose');

var schema = mongoose.Schema;

var productShema = new schema({
  "productId":{type:String},
  "productName":String,
  "price":Number,
  "imgUrl":String,
  "productNum":Number,
  "checked":String,
})

module.exports = mongoose.model('goods',productShema,'goods');




