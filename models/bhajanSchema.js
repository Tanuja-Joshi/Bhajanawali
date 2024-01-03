const mongoose=require('mongoose')

const bhajanSchema= new mongoose.Schema({
    name:String,
    Bhajan:String,
    link:String
})
const bhajanModel= mongoose.model("bhajans",bhajanSchema)
module.exports=bhajanModel