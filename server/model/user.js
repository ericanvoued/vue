var mongoose = require('mongoose')

var schema = mongoose.Schema;

var userSchema = new schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "carList":[
    {
      "productId":String,
      "productName":String,
      "price":String,
      "imgUrl":String,
      "checked":String,
      "productNum":Number
    }
  ],
  "addressList":[
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ]
})

module.exports = mongoose.model('user',userSchema,'user')






