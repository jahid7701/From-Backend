const mongoose=require("mongoose");
const studentschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    registration:{
        type:Number,
        required:true
    }
})
module.exports=studentschema;