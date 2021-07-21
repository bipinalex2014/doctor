var db = require('../config/connection')
var collections = require('../config/collection')
var Promise = require('promise')
var bcrypt = require('bcrypt')
const { resolve, reject } = require('promise')
var objectId = require('mongodb').ObjectID
module.exports = {
    doSignup : (doctorData)=>{
       
        return new Promise(async (resolve,reject)=>{
            
            doctorData.password = await bcrypt.hash(doctorData.password,10)
            db.get().collection(collections.DOCTOR_COLLECTIONS).insertOne(doctorData).then((data)=>{
                resolve(data)
            })

        })
    },

    doLogin : (loginData)=>{
        return new Promise(async (resolve,reject)=>{
            let response = {}
            database= await db.get().collection(collections.DOCTOR_COLLECTIONS).findOne({email:loginData.email})
            // console.log("database>>>>>",database)
            if(database){
                bcrypt.compare(loginData.password,database.password).then((status)=>{
                    response.doctor=loginData
                    response.doctorData=database
                    response.status=true
                    // console.log("response>>>>",response)
                    resolve(response)
                })
            }
            else{
                resolve({status:false})
            }
            
            
        })
    },
    doInfo : (docData)=>{
        return new Promise(async (resolve,reject)=>{
            var data =await db.get().collection(collections.BOOKING_COLLECTIONS).find({department:docData.department}).toArray()
            resolve(data)
            })
            
        
    },
    doDept :()=>{
        return new Promise(async (resolve,reject)=>{
            var data = await db.get().collection(collections.JSONDEPT_COLLECTIONS).find().toArray()
            resolve(data)
        })
    },
    doDelete : (deleteId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.BOOKING_COLLECTIONS).removeOne({_id:objectId(deleteId)}).then((data)=>{
                resolve(data)
            })
        })
    },
    doVerify : (confirm)=>{
        console.log("conformssss",confirm)
        return new Promise(async (resolve,reject)=>{
            let data = await db.get().collection(collections.BOOKING_COLLECTIONS).findOne({'_id':objectId(confirm)})
            // console.log("objid>>>>",data)
            resolve(data)
        })
    },
    doConfirm : async (data)=>{
        let date = data.bookdate
        console.log("lllll>>>",date.getTime())
        // function time(date) {
        //     return new Date(date.getTime());
        // }
        let confirm = {
            referenceId : data.referenceId,
            patient : data.patient,
            email : data.email,
            number : data.number,
            doctor : data.doctor,
            date : data.bookdate,
            // time : await time(date),
            status : "your appointment is confirmed on " + data.bookdate,

        }
        return new Promise(async (resolve,reject)=>{
            let data = await db.get().collection(collections.CONFIRM_COLLECTIONS).insertOne(confirm)
            console.log('approved>>>>',data.ops[0])
            resolve(data.ops[0])
            
        })
    },
    addNewTime:(values,doctor)=>{
        //console.log('Values>>>',values);
        values.doctor=doctor._id
        db.get().collection(collections.TIMING_COLLECTION).insertOne(values).then((result)=>[
            resolve()
        ])
    }
}