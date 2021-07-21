const { response } = require('express');
var express = require('express');
const { Db } = require('mongodb');
var router = express.Router();
var doctor = require('../helper/doctor-helper')


/* GET home page. */
router.get('/', function(req, res) {
   
  if(req.session.loggedIn){
    res.redirect('/doctor/home')
  }
  else{
    res.render('doctor/login.hbs',{loggedIn:false});
    
  }
  
});

router.post('/', function(req, res) {
  // console.log("login >>>>>",req.body)
  doctor.doLogin(req.body).then((response)=>{
    // console.log("login status>>>>>",response)
    if (response.status){
      req.session.doctor = response.doctor
      req.session.doctorData= response.doctorData
      req.session.loggedIn = true
      
      res.redirect('/doctor/home')
      // console.log("login response>>>>>",response)
      // console.log("login session>>>>>",req.session)
    }
    else{
      res.redirect('/doctor/')
    }
    
  })
  // res.render('doctor/login.hbs');
});

router.get('/home', function(req, res) {
  let loggedIn=req.session.loggedIn
  var doc = req.session.doctor
  if(doc){
    res.render('doctor/home.hbs',{doc,loggedIn});
  }
  else{
    res.redirect('/doctor')
  }
  
});

router.get('/signup', function(req, res) {
  doctor.doDept().then((data)=>{
    res.render('doctor/signup.hbs',{data,loggedIn:false})
  })
  
});

router.post('/signup',function(req,res){
  doctor.doSignup(req.body).then((data)=>{
    // console.log('doctor data>>>>>',data)
    res.redirect('/doctor/')
  })
});

router.get('/patients', function(req, res) {
  var doc = req.session.doctor
  let loggedIn = req.session.loggedIn
  var docData = req.session.doctorData
  
  // console.log("session>>>",doc)
  // console.log("sessionrrrrr>>>",docData)
  if(loggedIn){
    doctor.doInfo(docData).then((data)=>{
      data.forEach((element,index) => {
        element.ind = index+1;
      });
    console.log("sessionsssssss>>>",data)
      if(doc){
     
        res.render('doctor/patients.hbs',{loggedIn,doc,data:data});
      
      }
      else{
      // res.redirect(req.get('referer'));
        res.redirect('/doctor')
      }
    })
  }
  else{
    res.redirect('/doctor')
  }
});

router.get('/verify/:id',function(req,res){
  let loggedIn = req.session.loggedIn
  var doc = req.session.doctor
  let id =req.params.id
  doctor.doVerify(id).then((data)=>{
    res.render('doctor/verify.hbs',{loggedIn,doc,data})
  })
  
})

router.post('/confirm/',function(req,res){
  let data = req.body
  console.log("ghkdfhg>>>>",data)
  doctor.doConfirm(data).then((data)=>{
   res.redirect('/doctor/patients')
  })
  // res.redirect('/doctor/patients')
  // doctor.doNotify(req.params.id)
})

router.get('/delete/:id',function(req,res) {
  let deleteId =req.params.id
  // console.log("delete>>>>",deleteId)
  doctor.doDelete(deleteId).then((data)=>{
    res.redirect('/doctor/patients')
  })
})

router.get('/logout', function(req, res) {
  // console.log('session>>>>',req.session)
  if (req.session.loggedIn){
    req.session.destroy()
    // console.log('session>>>>',req.session)
    // res.clearCookie('name', { path: '/doctor' });
    res.redirect(req.get('referer'));
    
    // window.location.reload()
    // res.redirect('back')
    // res.redirect('/doctor')
  }
});
router.get('/add-time',(req,res)=>{
  let loggedIn = req.session.loggedIn
  var doc = req.session.doctor
  res.render('doctor/update-time.hbs',{loggedIn,doc})
})

router.post('/add-time',(req,res)=>{
  let values=req.body;
  //console.log(values);
  doctor.addNewTime(values,req.session.doctorData).then(()=>{
    res.redirect('/doctor/home')
  })
})


module.exports = router;