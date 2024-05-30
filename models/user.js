const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notes')

const userSchema=mongoose.Schema({
    username:String,
    fullname:String,
    password:String,
    notes:{
        type:Array,
        default:[]
    }
})

module.exports=mongoose.model('user',userSchema)