var express = require('express');
var router = express.Router();
var user = require('../helper/user-helper')
// var collections = require('../config/collection')
// var db = require('../config/connection')
/* GET users listing. */
// router.get('/', function(req, res, next) {
  
//   if(req.session.loggedIn){
//     res.redirect('/users/home')
//   }
//   else{
//     res.render('user/login.hbs',{user:true});
//   }

router.get('/', function(req, res, next) {
  if(req.session.loggedIn){
      res.redirect('/users/home')
  }
  else{
      res.render('user/login.hbs',{user,loggedIn:false,"loginerr":req.session.loginErr})
      req.session.loginErr=false
  }
  
});
  
router.post('/login', function(req, res, next) {
  // console.log('user>>>>',req.body)
  user.doLogin(req.body).then((response)=>{
    if(response.status){
      // console.log("datas>>>>>",response)
      req.session.loggedIn = true
      req.session.user = response.user
      console.log("session>>>>>",req.session)
      res.redirect('/users/home')
    }
    else{
      req.session.loginErr="invalid username or password"
      res.redirect('/users/')
    }
  })
});


router.get('/home', function(req, res, next) {
  let loggedUser =  req.session.user
  if(loggedUser){
    res.render('user/home.hbs',{user,loggedUser,loggedIn:true})
  }
  else{
    res.redirect('/users/')
  }
  
  
  
});
router.get('/signup', function(req, res, next) {
  // if(req.session.loggedIn){
    res.render('user/signup.hbs',{user})
  // }
  // else{
  //   res.redirect('/users/')
  // }
  
});

router.post('/signup', function(req, res, next) {
  user.doSignup(req.body).then((data)=>{
    console.log('users data>>>',data)
    // res.render('signup',)
    res.redirect('/users/')
  })
});



router.get('/logout',function(req,res){
  
  if(req.session.loggedIn){
    req.session.destroy()
    res.redirect(req.get('referer'));
    // res.redirect('/users/')
    // console.log("session>>>>",req.session)
  }
  
})

router.get('/booking',async function(req, res) {
  var data = await user.doDoctorConn()
  // var docData = await user.doDoctorGet()
  // console.log("data>>>>>",data)
  // if(req.session.loggedIn){
    let loggedUser = req.session.user
    let loggedIn = req.session.loggedIn
    if(loggedUser){
      
      res.render('user/booking.hbs',{loggedIn,user,data:data})
    }
    else{
      res.redirect('/users')
    }
    
//   }
//   else{
//     res.redirect('/users/login')
//   }
  
});

router.post('/booking',function(req, res) {
  
  
  console.log("booking>>>>>",req.body)
  
  user.doBooking(req.body,req.session.user).then((data)=>{
  res.redirect('/users/booking')
  })
  
});

router.get('/messages',function(req,res){
  let loggedIn = req.session.loggedIn
  let session = req.session.user
  console.log("session",req.session.user)
  user.doMessages(session).then((data)=>{
    console.log("hello",data)
    res.render('user/messages.hbs',{loggedIn,user,data})
  })
  
})



router.post('/getdoctor/:id',async function(req,res) {
  console.log("deptid>>>>",req.params.id)
  let dept_id = req.params.id
  let doctor = await user.doDoctorGet(dept_id)
  res.json(doctor)
  console.log('doctors>>>',doctor)
  // res.render('user/booking.hbs',{user:true,doctor:doctor})
})

router.post('/check/:date',function (req,res) {
  console.log("date>>",req.params.date)
})



// router.post('/dept',function(req,res) {
//   console.log('department>>>>',req.body)
//   user.doDept(req.body)
// })

module.exports = router;
