var db = require('../config/connection')
var collections = require('../config/collection')
var Promise = require('promise')
const { resolve, reject } = require('promise')

module.exports = {
    doInfo : ()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.DOCTOR_COLLECTIONS).find().toArray().then((data)=>{
                resolve(data)
            })
        })
    },
    doAddDept : (dept)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.DEPARTMENT_COLLECTIONS).insertOne(dept).then((data)=>{
                resolve(data)
            })
        })
    },
    doInfo : ()=>{
        return new Promise(async (resolve,reject)=>{
            var data =await db.get().collection(collections.BOOKING_COLLECTIONS).find().toArray()
            resolve(data)
            })
        
    }

}