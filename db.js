const mongoose=require('mongoose')
const DB_URI='mongodb://0.0.0.0:27017/Bhajanawali'

const connectToMongo=async()=>{
    try{
        await mongoose.connect(DB_URI).then(()=>{
            console.log('connected')
        })
    }
    catch(err){
        console.log(err)
    }
}
module.exports=connectToMongo