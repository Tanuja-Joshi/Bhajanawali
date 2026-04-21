const mongoose=require('mongoose')

const bhajanSchema= new mongoose.Schema({
    name:String,
    Bhajan:String,
    link:String,
    originalName:String,
    originalBhajan:String,
    originalScript:{
        type:String,
        enum:['hindi','hinglish'],
        default:'hindi'
    },
    alternateName:String,
    alternateBhajan:String,
    alternateScript:{
        type:String,
        enum:['hindi','hinglish'],
        default:'hinglish'
    },
    alternateStatus:{
        type:String,
        enum:['missing','generated','matched','reviewed','needs_search','queued','searching','failed'],
        default:'missing'
    },
    alternateSource:String,
    matchConfidence:Number
})
const bhajanModel= mongoose.model("bhajans",bhajanSchema)
module.exports=bhajanModel
