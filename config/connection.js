var MongoClient = require('mongodb').MongoClient
const state = {
    db:null
}
module.exports.connect=function(done){
    // const url = "mongodb://localhost:27017"
    const url='mongodb+srv://user01:sPeAuc0ECtqfDMHz@kyfdatabase.t2h2n.mongodb.net/kyfdatabase?retryWrites=true&w=majority'
    const dbname="Hospital2"

    MongoClient.connect(url,(err,data)=>{
        if(err){
            return done(err)
        }
        state.db=data.db(dbname)
        done()
    })

}
module.exports.get=function(){
    return state.db
}