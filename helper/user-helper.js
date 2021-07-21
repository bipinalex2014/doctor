var db = require('../config/connection')
var collections = require('../config/collection')
var Promise = require('promise')
var bcrypt = require('bcrypt')
const object = require('mongodb').Object
const { resolve, reject } = require('promise')

module.exports = {
    doSignup : (signupData)=>{
        async function generateRandomInteger() {
            let randomNumber = Math.floor(100000 + Math.random() * 900000)
            let dataBaseId = await db.get().collection(collections.USER_COLLECTIONS).find({id:randomNumber})
            if (randomNumber!==dataBaseId){
               
                return randomNumber
            }
            else{
                let randomNumber = Math.floor(100000 + Math.random() * 900000)
                return randomNumber
            }
            // Math.floor(Math.random()*899999+100000);
            // return Math.floor(Math.random() * max) + 1;
        }
        
        return new Promise(async (resolve,reject)=>{
            
            let password = await bcrypt.hash(signupData.password,10)
            
            let signup = {
                
                id : await generateRandomInteger(),
                fname : signupData.fname,
                lname: signupData.lname,
                gender: signupData.gender,
                dob: signupData.dob,
                age: signupData.age,
                number: signupData.number,
                email: signupData.email,
                password: password,
                
              }
            db.get().collection(collections.USER_COLLECTIONS).insertOne(signup).then((data)=>{
                
                resolve(data)
            })
        })
    },
    doLogin : (loginData)=>{
        // console.log("loginemali>>",loginData.email)
        return new Promise(async (resolve,reject)=>{
            let response = {}
            let dataBaseUser = await db.get().collection(collections.USER_COLLECTIONS).findOne({email:loginData.email})
            if(dataBaseUser){
                console.log("data from database : ",dataBaseUser.email)
                // console.log("logindata password>>>",loginData.password)
                // console.log("dataBaseUser.password>>>",dataBaseUser.password)
                bcrypt.compare(loginData.password,dataBaseUser.password).then((status)=>{
                    console.log("status>>>",status)
                    if(status){
                        response.user= dataBaseUser
                        response.status= true
                        resolve(response)
                        // console.log('user response>>>>',response)
                    }
                    else{
                        resolve({status:false})
                    }
                })
                
            }
            else{
                reject({status:false})
                // console.log("login failed")
            }
            
        })
    },
    doDept : (dept)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.DOCTOR_COLLECTIONS).find({department:dept}).then((data)=>{
                // console.log("doctor>>>>>>>",data)
                resolve(data)
            })
        })
    },
    doBooking : async (booking,sessionUser)=>{
        // function increment() {
        //     for(let i=0;i<100;i++){
        //         i=i+1
        //         return i
        //     }
            
        // }
        // function generateRandomInteger() {
        //     return Math.floor(100000 + Math.random() * 900000)
            // Math.floor(Math.random()*899999+100000);
            // return Math.floor(Math.random() * max) + 1;
        // }
        let bookings = {
            
            referenceId : sessionUser.id,
            fname : sessionUser.fname,
            lname: sessionUser.lname,
            gender: sessionUser.gender,
            age: sessionUser.age,
            email: sessionUser.email,
            number: sessionUser.number,
            department: booking.department,
            doctor: booking.doctor,
            bookdate: booking.date,
            time: booking.time,
            comments: booking.comments,
          }
          console.log("look>>>>>",bookings)
        // async function increment(sequenceName){
        //     var sequenceDocument = await db.get().collection(collections.BOOKING_COLLECTIONS).findAndModify({
        //        query:{_id: sequenceName },
        //        update: {$inc:{sequence_value:1}},
        //        new:true
        //     });
        //     return sequenceDocument.sequence_value;
        //  }
        return new Promise((resolve,reject)=>{
            
                db.get().collection(collections.BOOKING_COLLECTIONS).insertOne(bookings).then((data)=>{
                    resolve(data)
                })
                
        })    
    },
    // doDoctorConn : ()=>{
    //     return new Promise((resolve,reject)=>{
    //         db.get().collection(collections.DEPARTMENT_COLLECTIONS).aggregate([
    //             { $lookup :
    //                 {
    //                     from : collections.DOCTOR_COLLECTIONS,
    //                     localField : 'department',
    //                     foreignField : 'department',
    //                     as : 'mergedDetails'
    //                 },

                    

    //             },
    //             {
    //                 $project: {
    //                   title:  "$department", typeCategory: "$mergedDetails.fname" 
    //                 }
    //             },
    //             // {$unwind: '$typeCategory'}
                
               
    //         ]).toArray().then((data)=>{
    //             // console.log('merged>>>>',data)
    //             resolve(data)
    //         })
    //     })
    // }
    doDoctorConn : ()=>{
        return new Promise(async (resolve,reject)=>{
            var data = await db.get().collection(collections.JSONDEPT_COLLECTIONS).find().toArray()
                resolve(data)
                console.log('data>>>>',data)
            })
        },
    
    doDoctorGet : (dept_id)=>{
        return new Promise(async (resolve,reject)=>{
            var data = await db.get().collection(collections.DOCTOR_COLLECTIONS).find({department:dept_id}).toArray()
            resolve(data)
            console.log("datassss>>>>",data)
        })
    },

    doMessages : (session)=>{
        let sessionid = session.id.toString()
        // if(session.id){
            console.log("user id",sessionid)
            return new Promise(async (resolve,reject)=>{
            
                db.get().collection(collections.CONFIRM_COLLECTIONS).findOne({referenceId:sessionid}).then((result)=>{
                    console.log("ddddd>>>",result)
                   resolve(result)
                })
                
            })
        // }
    }
    // doGetDoctor : (dept_id)=>{
    //     return new Promise(async (resolve,reject)=>{
    //         let data = await db.get().collection(collections.JSONDOCTOR_COLLECTIONS).find({doc_id:dept_id}).toArray()
            
    //         resolve(data)
    //     })
    // }
}




