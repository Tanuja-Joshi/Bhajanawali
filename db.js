const mongoose=require('mongoose')
const DB_URI='mongodb+srv://TanujaJoshi:Welcome%402601@cluster0.gzkjokk.mongodb.net/?appName=Cluster0'

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