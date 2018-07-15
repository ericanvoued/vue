var mongoose = require('mongoose');
var scheme = mongoose.Schema;// biao  model

var productSchema = new scheme({
  'productId': String,
  'productName': String,
  'salePrice': Number,
  'ProductImage': String
})

module.exports = mongoose.model('Good',productSchema)






















