const mongoose=require('mongoose')


const userschema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    chat:[]
})

const users=mongoose.model("users",userschema)
module.exports=users