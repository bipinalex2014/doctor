var express = require('express');
var router = express.Router();
var admin = require('../helper/admin-helper')
var user = require('../helper/user-helper')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/home.hbs',{admin:true});
});

router.get('/signup', function(req, res, next) {
  res.render('admin/signup.hbs',{admin:true});
});

router.get('/login', function(req, res, next) {
  res.render('admin/login.hbs',{admin:true});
});

router.get('/user-info', function(req, res, next) {
  res.render('admin/user-info',{admin:true});
});

router.get('/doctors-info', function(req, res, next) {
  admin.doInfo().then((data)=>{
    res.render('admin/doctor-info',{admin:true,data});
  })
  
});

router.get('/add-department',function(req,res){
  res.render('admin/add-department.hbs',{admin})
});

router.post('/add-department',function(req,res){
  admin.doAddDept(req.body).then((data)=>{
    // console.log('dept>>>>>>',req.body)
    res.redirect('/admin/add-department')
  })
});

router.get('/today-patients',async function(req,res) {
  var data = await admin.doInfo()
  res.render('admin/today-patients.hbs',{data})
})

module.exports = router;
