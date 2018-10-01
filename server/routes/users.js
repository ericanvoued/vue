var express = require('express');


var router = express.Router();
var users = require('./../model/user')

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


module.exports = router;
