var express = require('express');
var router = express.Router();
var users = require('./../model/user')

require('./../util/util')

//登陆
router.post('/login', function (req, res, next) {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
  }
  users.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: 0,
        msg: err
      })
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        // res.session.user = doc;
        res.json({
          status: 1,
          msg: '',
          result: doc
        })
      } else {
        res.json({
          status: 0,
          msg: err
        })
      }
    }
  })


})


//登出
router.post('/logout', function (req, res, netx) {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: 1,
    msg: '',
    result: '退出成功'
  })
})

//验证登陆
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: 1,
      msg: '',
      result: req.cookies.userName
    })
  } else {
    res.json({
      status: 0,
      msg: '未登录',
      result: ''
    })
  }
})

//购物车列表
router.get('/carList', function (req, res, next) {
  let userId = req.cookies.userId;
  users.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: 1,
          msg: '',
          result: doc.carList
        })
      }
    }
  })
})

//购物车删除
router.post('/carList/del', function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  users.update({userId: userId}, {$pull: {'carList': {"productId": productId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: 1,
          msg: '删除成功',
          result: 'success'
        })
      }
    }
  })
})

//编辑购物车数目
router.post('/cartEdit', function (req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;

  users.update({'userId': userId, "carList.productId": productId}, {
    "carList.$.productNum": productNum,
    "carList.$.checked": checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: 1,
          msg: '修改成功',
          result: 'success'
        })
      }
    }
  })
})

router.get('/carCount',function (req, res, next) {
  if(req.cookies && req.cookies.userId){
    let userId = req.cookies.userId;
    users.findOne({userId:userId}, function (err, doc) {
      if(err){
        res.json({
          status: '0',
          msg: err.message,
          result: ''
        })
      }else {
        let carList = doc.carList;
        let carCount = 0;
        carList.map(item=>{
          carCount += parseInt(item.productNum);
        })
        res.json({
          status: '1',
          msg: 'succeed',
          result: carCount
        })
      }
    })
  }
})


//全选
router.post('/carList/checkAll', function (req, res, next) {
  let userId = req.cookies.userId;
  let checkAll = req.body.checkAll ? '1' : '0';

  users.findOne({'userId': userId}, function (err, user) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message,
        result: ''
      })
    } else {
      if (user) {
        user.carList.map(item => {
          item.checked = checkAll;
        })
        user.save(function (err1, doc) {
          if (err1) {
            res.json({
              status: 0,
              msg: err1.message,
              result: ''
            })
          } else {
            if (doc) {
              res.json({
                status: 1,
                msg: '修改成功',
                result: 'success'
              })
            }
          }
        })
      }
    }
  })

})


// //单选购物车的项目
// router.post('/cartEdit/toggleCheck', function (req, res, next) {
//   let userId = req.cookies.userId;
//   let productId = req.body.productId;
//   let checked = req.body.checked;
//
//   users.update({'userId': userId, "carList.productId": productId}, {
//     "carList.$.checked": checked
//   }, function (err, doc) {
//     if (err) {
//       res.json({
//         status: 0,
//         msg: err.message,
//         result: ''
//       })
//     } else {
//       if (doc) {
//         res.json({
//           status: 1,
//           msg: '修改成功',
//           result: 'success'
//         })
//       }
//     }
//   })
// })

//查询用户地址接口
router.get('/addressList', function (req, res, next) {
  let userId = req.cookies.userId;
  users.findOne({userId: userId}, function (err, user) {
    if (err) {
      res.json({
        status: 0,
        msg: err.message,
        result: ''
      })
    } else {
      if (user) {
        // user.addressList[3] = {
        //   "addressId": 10004,
        //   "userName": 'eric3',
        //   "streetName": '宝安区西乡街道4',
        //   "postCode": '000003',
        //   "tel": '87653333',
        //   "isDefault": false
        // }
        // user.save(function (err1,doc) {
        //   console.log(err1)
        //   console.log(doc)
        // })
        res.json({
          status: 1,
          msg: '修改成功',
          result: user.addressList
        })
      }
    }

  })
})
//设置默认地址
router.post("/address/setdeault", function (req, res, next) {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  // users.update({'userId': userId, "addressList.addressId": addressId}, {
  //   "addressList.$.isDefault": true
  // }, function (err, doc) {
  //     console.log(doc)
  // })

  users.findOne({'userId': userId}, function (err, user) {
    if (err) {
      res.json({
        status: '0',
        msg: err.message
      })
    } else {

      user.addressList.map(item => {
        if (item.addressId == addressId) {
          item.isDefault = true;
        } else {
          item.isDefault = false;
        }
      })
      user.save(function (err1, doc) {
        if (err1) {
          res.json({
            status: '0',
            msg: err1.message
          })
        } else {
          res.json({
            status: '1',
            msg: '设置成功',
            result: 'success'
          })
        }
      })
    }
  })
})

//delete address
router.post('/address/del', function (req, res, next) {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  users.update({
    'userId': userId
  }, {
    $pull:
      {
        'addressList':
          {
            'addressId': addressId
          }
      }
  }, function (err, doc) {
    if(err){
      res.json({
        status: '0',
        msg: err.message
      })
    }else {
      res.json({
        status: '1',
        msg: '删除成功',
        result: 'success'
      })
    }
  })
})
//生成订单
router.post('/payment',function (req, res, next) {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  let orderTotal = req.body.orderTotal;
  let address = {};
  let goodList = [];

  users.findOne({userId:userId},function (err, doc) {
    if(err){
      res.json({
        status: '0',
        msg: err.message
      })
    }else {
      doc.addressList.map(item=>{
        if(addressId == item.addressId){
          address = item;
        }
      })
      doc.carList.filter(item=>{
        if(item.checked=='1'){
          goodList.push(item)
        }
      })

      let platform = '622';
      let r1 = Math.floor(Math.random()*10);
      let r2 = Math.floor(Math.random()*10);
      let sysDate = new Date().Format('yyyyMMddhhmmss');
      let orderDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      let orderId = platform +r1 + sysDate +r2;

      let order = {
        orderId:orderId,
        orderTotal:orderTotal,
        goodList:goodList,
        address:address,
        orderstatus:'1',
        createDate:orderDate
      }

      doc.orderList.push(order);
      doc.save(function (err1,doc1) {
        if(err1){
          res.json({
            status:'msg: err1.message'
          })
        }else {
          res.json({
            status: '1',
            msg: 'success',
            result: {
              'orderId':order.orderId,
              'orderTotal':order.orderTotal
            }
          })
        }

      })

    }
  })

})






module.exports = router;
