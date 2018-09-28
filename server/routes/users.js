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
      }else {
        res.json({
          status: 0,
          msg: err
        })
      }
    }
  })


})


//登出
router.post('/logout',function (req, res, netx) {
  res.cookie('userId','',{
    path:'/',
    maxAge:-1
  })
  res.json({
    status:1,
    msg:'',
    result:'退出成功'
  })
})

//验证登陆
router.get('/checkLogin',function (req, res, next) {
  if(req.cookies.userId){
    res.json({
      status:1,
      msg:'',
      result:req.cookies.userName
    })
  }else {
    res.json({
      status:0,
      msg:'未登录',
      result:''
    })
  }
})



module.exports = router;
